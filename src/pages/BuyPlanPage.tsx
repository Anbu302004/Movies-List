import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import moviesApiClient from "../services/authApiClient";

const BuyPlanPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const selectedPlan = location.state?.selectedPlan;
  const [gateway, setGateway] = useState<any>(null);

  useEffect(() => {
    const fetchPaymentInfo = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      if (!selectedPlan) {
        alert("Invalid plan data. Please select again.");
        navigate("/pricing");
        return;
      }

      try {
        const res = await moviesApiClient.get("/paymentgatewayinfo", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const razorpay = res.data?.results?.razorpay;
        if (!razorpay || !razorpay.enabled) {
          alert("Payment is currently unavailable.");
          return;
        }

        setGateway(razorpay);

        const subscriptionRes = await moviesApiClient.post(
          `/createsubscription/${selectedPlan.id}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const orderId = subscriptionRes.data?.results?.razorpay_order_id;
        console.log("Created orderId:", orderId);

        setTimeout(() => {
          // 🧹 Clear any previous active plan
          localStorage.removeItem("active_plan");

          const options = {
            key: razorpay.key,
            amount: selectedPlan.price * 100,
            currency: "INR",
            name: razorpay.name,
            description: selectedPlan.title,
            image: razorpay.logo,
            order_id: orderId,
            handler: async function (response: any) {
              console.log("🧾 Payment Success");

              try {
                await moviesApiClient.post(
                  "/updatetransaction",
                  {
                    razorpay_order_id: orderId,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                  },
                  {
                    headers: { Authorization: `Bearer ${token}` },
                  }
                );

                const verifyRes = await moviesApiClient.post(
                  `/verifypaymentstatus?oid=${orderId}`,
                  {},
                  {
                    headers: { Authorization: `Bearer ${token}` },
                  }
                );

                // ✅ Only proceed if verified success
                if (verifyRes.data?.status === "success") {
                  const durationInDays = selectedPlan.duration_in_days || 30;
                  const start = new Date().toISOString();
                  const end = new Date(Date.now() + durationInDays * 24 * 60 * 60 * 1000).toISOString();

                  localStorage.setItem(
                    "active_plan",
                    JSON.stringify({
                      title: selectedPlan.title,
                      name: selectedPlan.name,
                      start_date: start,
                      end_date: end,
                      video_quality_text: selectedPlan.video_quality_text,
                      video_resolution_text: selectedPlan.video_resolution_text,
                      video_device_text: selectedPlan.video_device_text,
                      device_limit: selectedPlan.device_limit
                    })
                  );

                  window.location.href = `/payment-status?oid=${orderId}`;
                } else {
                  alert("❌ Payment failed or not verified.");
                }
              } catch (err) {
                console.error("❌ Payment verification error", err);
                alert("❌ Payment verification failed.");
              }
            },
            theme: { color: razorpay.color },
            modal: {
              ondismiss: () => {
                window.location.href = "/pricing";
              },
            },
          };

          const rzp = new (window as any).Razorpay(options);
          rzp.open();
        }, 1000);
      } catch (err) {
        console.error("Failed to load payment info or create subscription", err);
      }
    };

    fetchPaymentInfo();
  }, [id, selectedPlan, navigate]);

  if (!gateway) return <p>Loading payment details...</p>;

  return (
    <div
      className="payment-container"
      style={{
        textAlign: "center",
        padding: "40px",
        background: "#111",
        color: "#fff",
      }}
    >
      <h2 style={{ marginBottom: "20px", fontSize: "50px" }}>
        {gateway.title}
      </h2>
      <div
        className="payment-content"
        dangerouslySetInnerHTML={{ __html: gateway.content }}
      />
      <button
        onClick={() => (window.location.href = "/pricing")}
        style={{
          marginTop: 20,
          background: "#555",
          color: "#fff",
          padding: "10px 24px",
          border: "none",
          borderRadius: "4px",
        }}
      >
        Cancel
      </button>
    </div>
  );
};

export default BuyPlanPage;
