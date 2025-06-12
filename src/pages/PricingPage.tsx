import React, { useEffect, useState } from "react";
import { getSubscriptionPlans } from "../services/subscriptionService";
import { SubscriptionPlan } from "../hooks/subscriptionplan";
import tickBullet from "../assets/bullet-round-tick.png";

const PricingPage: React.FC = () => {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      const token = localStorage.getItem("token");
      console.log("SESSION TOKEN:", token);

      const data = await getSubscriptionPlans(token || undefined);
      console.log("Plans response:", data);
      setPlans(data);
      setLoading(false);
    };

    fetchPlans();
  }, []);

  if (loading) return <p style={{ color: "#fff" }}>Loading...</p>;

  return (
    <div>
      <h1
        style={{
          padding: "70px",
          background: "#191919",
          color: "white",
          marginTop: "-140px",
          marginBottom: "-0px",
        }}
      ></h1>

      <div className="pricing-container">
        <h1>Choose Your Pricing Plan</h1>

        <div className="align-section">
          <div className="section-title">
            <span className="pre-title">Pricing Plan</span>
            <p>Explore our range of plans to find the perfect fit for you.</p>
          </div>
        </div>

        <div className="plans-grid">
          {Array.isArray(plans) && plans.length > 0 ? (
            plans.map((plan) => (
              <div key={plan.id} className="plan-card">
                {plan.tagtext && <div className="ribbon">{plan.tagtext}</div>}
                <h2>{plan.title}</h2>
                <h3>{plan.name}</h3>
                <div className="yearly-price">
                  <h2 className="amount-strike">₹{plan.before_price}</h2>
                  <h2 className="price">₹{plan.price}/</h2>
                  <h3 className="duration">{plan.duration_text}</h3>
                </div>

                <ul>
                  <li>
                    <img src={tickBullet} className="bullet-icon" /> Video Quality:{" "}
                    {plan.video_quality_text}
                  </li>
                  <li>
                    <img src={tickBullet} className="bullet-icon" /> Video Resolution:{" "}
                    {plan.video_resolution_text}
                  </li>
                  <li>
                    <img src={tickBullet} className="bullet-icon" /> Supported Devices:{" "}
                    {plan.video_device_text}
                  </li>
                  <li>
                    <img src={tickBullet} className="bullet-icon" /> Devices to watch limit:{" "}
                    {plan.device_limit}
                  </li>
                  <li>
                    <img src={tickBullet} className="bullet-icon" /> Ads free movies and shows
                  </li>
                </ul>

                <button
                  className="buy-button">
                  Buy This Plan
                </button>
              </div>
            ))
          ) : (
            <p style={{ color: "#fff" }}>No plans available right now.</p>
          )}
        </div>

        <div className="note">
          <div className="notetext">
            <p>
              HD (720p), Full HD (1080p), Ultra HD (4K) and HDR availability subject to your
              internet service and device capabilities. Not all content is available in all
              resolutions. See our{" "}
              <a href="../../../terms" target="_blank" rel="noopener noreferrer">
                Terms of Use
              </a>{" "}
              for more details. Only people who live with you may use your account. Watch on 4
              different devices at the same time with Premium, 2 with Standard, and 1 with Basic and
              Mobile.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
