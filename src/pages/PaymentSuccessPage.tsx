import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function PaymentSuccessPage() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("oid");
  const navigate = useNavigate();

  useEffect(() => {
    // Auto redirect to home after 5 seconds
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{ textAlign: "center", color: "white", marginTop: "80px" }}>
      <h1>Thank you!</h1>
      <p>Your payment is encrypted and you can change your payment method at anytime.</p>
      <p>Secure for peace of mind. Cancel easily online.</p>
      <p style={{ color: "lightgreen", fontWeight: "bold" }}>
        The page will automatically redirect to the homepage in 5 seconds.
      </p>
      <h2 style={{ color: "#00cc66" }}>Payment Success.</h2>
      <p>Order ID: <strong>{orderId}</strong></p>
      <button
        onClick={() => navigate("/")}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#fff",
          color: "#000",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Go to Home
      </button>
    </div>
  );
}

export default PaymentSuccessPage;
