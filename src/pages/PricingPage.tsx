import React, { useEffect, useState } from "react";
import { getSubscriptionPlans } from "../services/subscriptionService";
import { SubscriptionPlan } from "../hooks/subscriptionplan";
import tickBullet from "../assets/bullet-round-tick.png"

const PricingPage: React.FC = () => {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchPlans = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("SESSION TOKEN:", token);

      if (!token) throw new Error("Session token not found");

      const data = await getSubscriptionPlans(token);
      console.log("Plans response:", data); // 👈 Add this to see actual shape
      setPlans(data);
    } catch (error) {
      console.error("Error fetching plans:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchPlans();
}, []);

  if (loading) return <p style={{ color: "#fff" }}>Loading...</p>;

  return (
    <div>
        <h1 style={{padding: "70px",
             background: "#191919",
              color : "white", marginTop: "-140px",
               marginBottom: "-0px",
               }}></h1>
        <div className="pricing-container">
          <h1>Choose Your Pricing Plan</h1>
          <div className="plans-grid">
            {plans.map((plan) => (
              <div key={plan.id} className="plan-card">
                <h2>{plan.title}</h2>
                <h3>{plan.name}</h3>
                <h2 className="price">₹{plan.price}</h2>
                <p>{plan.duration}</p>
               <ul>
                <li><img src={tickBullet}   className="bullet-icon" /> Video Quality: {plan.video_quality_text}</li>
                <li><img src={tickBullet}  className="bullet-icon" /> Video Resolution: {plan.video_resolution_text}</li>
                <li><img src={tickBullet}  className="bullet-icon" /> Supported Devices: {plan.video_device_text}</li>
                <li><img src={tickBullet}   className="bullet-icon" /> Devices to watch limit: {plan.device_limit}</li>
                <li><img src={tickBullet}  className="bullet-icon" /> Ads free movies and shows</li>
              </ul>

                <button className="buy-button">Buy This Plan</button>
              </div>
            ))}
          </div>
        </div>
    </div>
  );
};

export default PricingPage;
