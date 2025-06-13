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

        // Step 1: Create subscription before opening payment popup
        const subscriptionRes = await moviesApiClient.post(`/createsubscription/${selectedPlan.id}`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const orderId = subscriptionRes.data?.results?.razorpay_order_id;
        console.log("📦 Created orderId:", orderId);

        
        setTimeout(() => {
          const options = {
            key: razorpay.key,
            amount: selectedPlan.price * 100, // ₹ to paise
            currency: "INR",
            name: razorpay.name,
            description: razorpay.title,
            image: razorpay.logo,
            order_id: orderId,
handler: async function (response: any) {
  console.log("🧾 Payment Success");
  console.log("plan_id:", selectedPlan.id);
  console.log("order_id:", orderId);
  console.log("razorpay_payment_id:", response.razorpay_payment_id);
  console.log("razorpay_signature:", response.razorpay_signature); // ✅ Add this log

  try {
    const updateRes = await moviesApiClient.post("/updatetransaction", {
      plan_id: selectedPlan.id,
      order_id: orderId,
      razorpay_payment_id: response.razorpay_payment_id,
      razorpay_signature: response.razorpay_signature, // ✅ Make sure this is included
    }, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("✅ Update Response:", updateRes.data);

    const verifyRes = await moviesApiClient.post(`/verifypaymentstatus?oid=${orderId}`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("🔍 Verification Response:", verifyRes.data);

    window.location.href = "/pricing";
  } catch (err) {
    console.error("❌ Verify Payment Error", err); 
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
    <div className="payment-container" style={{ textAlign: "center", padding: "40px", background: "#111", color: "#fff" }}>
      <h2 style={{ marginBottom: "20px", fontSize: "50px" }}>{gateway.title}</h2>
      <div
        className="payment-content"
        dangerouslySetInnerHTML={{ __html: gateway.content }}
      />
      <button
        onClick={() => window.location.href = "/pricing"}
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
