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

        setTimeout(() => {
          const options = {
            key: razorpay.key,
            amount: selectedPlan.price * 100, // ₹ to paise
            currency: "INR",
            name: razorpay.name,
            description: razorpay.title,
            image: razorpay.logo,
            handler: function (response: any) {
              alert("Payment successful: " + response.razorpay_payment_id);
            },
            theme: { color: razorpay.color },
            modal: {
              ondismiss: () => {
                navigate("/pricing");
              },
            },
          };

          const rzp = new (window as any).Razorpay(options);
          rzp.open();
        }, 1000);
      } catch (err) {
        console.error("Failed to load payment info", err);
      }
    };

    fetchPaymentInfo();
  }, [id, selectedPlan, navigate]);

  if (!gateway) return <p>Loading payment details...</p>;

  return (
    <div className="payment-container" style={{ textAlign: "center", padding: "40px", background: "#111", color: "#fff" }}>
      <img src={gateway.logo} alt="Logo" style={{ height: 50, marginBottom: 20 }} />
      <h2>{gateway.title}</h2>
      <div
        className="payment-content"
        dangerouslySetInnerHTML={{ __html: gateway.content }}
      />
      <button
        onClick={() => navigate("/pricing")}
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
