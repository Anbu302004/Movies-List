import React, { useEffect, useState } from "react";
import { getPaymentGatewayInfo } from "../hooks/paymentService";

const BuyPlanPage: React.FC = () => {
  const [gateway, setGateway] = useState<any>(null);

  useEffect(() => {
    const fetchPaymentInfo = async () => {
      const token = localStorage.getItem("token");
      if (!token) return; // redirect to login if needed

      try {
        const data = await getPaymentGatewayInfo(token);
        setGateway(data);
      } catch (err) {
        console.error("Failed to load payment info", err);
      }
    };

    fetchPaymentInfo();
  }, []);

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
        style={{
          backgroundColor: gateway.color,
          color: "#fff",
          padding: "10px 24px",
          border: "none",
          borderRadius: "4px",
          marginTop: "20px",
          fontWeight: "bold"
        }}
      >
        Pay with Razorpay
      </button>
    </div>
  );
};

export default BuyPlanPage;
