import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import tickBullet from "../assets/bullet-round-tick.png";

const sidebarLinks = [
  { name: 'Overview', path: '/my-account' },
  { name: 'Membership', path: '/account/membership' },
  { name: 'Security', path: '/account/profile' },
  { name: 'Devices', path: '/account/devices' },
  { name: 'Refer a Friend', path: '/account/referfriend' },
];

const Membership: React.FC = () => {
  const [plan, setPlan] = useState<any>(null);

  useEffect(() => {
    const planData = localStorage.getItem("active_plan");
    if (planData) {
      try {
        const parsed = JSON.parse(planData);
        setPlan(parsed);
      } catch (err) {
        console.error("Error parsing plan from storage:", err);
      }
    }
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div>
      <h1 style={{
        padding: "70px",
        background: "#191919",
        color: "white",
        marginTop: "-140px",
        marginBottom: "0px",
      }} />

      <div style={{
        backgroundColor: '#161616',
        color: '#fff',
        minHeight: '100vh',
        display: 'flex',
      }}>
        {/* Sidebar */}
        <aside style={{
          width: '260px',
          padding: '30px 20px',
          backgroundColor: '#161616',
          marginTop: "20px",
          marginLeft: "100px"
        }}>
          <Link to="/home" style={{
            color: '#fff',
            textDecoration: 'none',
            fontSize: '14px',
            paddingLeft: "30px"
          }}>
            ← Back to BESTCAST
          </Link>

          <div style={{
            backgroundColor: '#fff',
            color: '#000',
            borderRadius: '6px',
            marginTop: '30px',
            overflow: 'hidden',
          }}>
            <div style={{
              backgroundColor: '#cc1e24',
              padding: '12px 16px',
              fontWeight: 'bold',
              color: '#fff'
            }}>
              My Account
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {sidebarLinks.map(({ name, path }) => (
                <li key={name} style={{
                  padding: '10px 16px', 
                  backgroundColor: '#f7f7f7',
                }}>
                  <Link to={path} style={{
                    textDecoration: 'none',
                    color: name === 'Membership' ? '#cc1e24' : '#000',
                    fontWeight: name === 'Membership' ? 'bold' : 'normal'
                  }}>
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Main Content */}
        <main style={{ flex: 1, padding: '20px', marginBottom: "80px" }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '30px' }}>Membership</h1>

          <h4>Plan Details</h4>
          <div style={{
            backgroundColor: '#fff',
            color: '#000',
            padding: '40px',
            borderRadius: '5px',
            width: "750px",
            marginBottom: '20px'
          }}>
{plan ? (
  <>
  <h2 style={{ marginTop: '20px', marginBottom: '5px' }}>{plan.title}</h2>
  <p style={{ marginTop: "15px", fontWeight: "bold" }}>
     Current Membership end at : {formatDate(plan.end_date)}
    </p>
    <ul style={{ paddingLeft: "20px", lineHeight: "2", listStyleType: "none" }}>
      <li>
        <img src={tickBullet} className="bullet-icon" alt="✔" /> Video Quality:{" "}
        {plan.video_quality_text}
      </li>
      <li>
        <img src={tickBullet} className="bullet-icon" alt="✔" /> Video Resolution:{" "}
        {plan.video_resolution_text}
      </li>
      <li>
        <img src={tickBullet} className="bullet-icon" alt="✔" /> Supported Devices:{" "}
        {plan.video_device_text}
      </li>
      <li>
        <img src={tickBullet} className="bullet-icon" alt="✔" /> Devices to watch limit:{" "}
        {plan.device_limit}
      </li>
      <li>
        <img src={tickBullet} className="bullet-icon" alt="✔" /> Ads free movies and shows
      </li>
    </ul>
  </>
) : (
  <>
    <h3 style={{ marginTop: '20px', marginBottom: '5px' }}>No Plan</h3>
    <p style={{ margin: 0 }}>Current Membership expired.</p>
    <Link to="/pricing" style={{ textDecoration: 'none' }}>
      <button style={{
        backgroundColor: '#cc1e24',
        color: '#fff',
        padding: '10px 20px',
        border: 'none',
        marginTop: '15px',
        cursor: 'pointer',
        fontWeight: 'bold'
      }}>
        Choose Plan
      </button>
    </Link>
  </>
)}

          </div>

          <h4>Payment Info</h4>
          <div style={{
            backgroundColor: '#fff',
            color: '#000',
            padding: '35px',
            borderRadius: '5px',
            width: "750px"
          }}>
            <p style={{ fontWeight: "bold" }}>
              {plan ? "Your payment was successful via Razorpay." : "No payment method active right now."}
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Membership;
