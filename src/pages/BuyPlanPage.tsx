import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moviesApiClient from "../services/authApiClient";

const BuyPlanPage: React.FC = () => {
  const { id } = useParams(); // plan ID from URL
  const [gateway, setGateway] = useState<any>(null);

  useEffect(() => {
    const fetchPaymentInfo = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/login";
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
          const amount = getPlanAmount(Number(id));
          const options = {
            key: razorpay.key,
            amount: amount * 100, // in paise
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
                window.location.href = "/pricing"; // 🔁 Full refresh redirect
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
  }, [id]);

  const getPlanAmount = (planId: number): number => {
    switch (planId) {
      case 1: return 45;
      case 2: return 399;
      case 3: return 899;
      default: return 100;
    }
  };

  if (!gateway) return <p>Loading payment details...</p>;

  return (
    <div className="payment-container" style={{ textAlign: "center", padding: "40px" }}>
      <img src={gateway.logo} alt="Logo" style={{ height: 50, marginBottom: 20 }} />
      <h2>{gateway.title}</h2>
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
