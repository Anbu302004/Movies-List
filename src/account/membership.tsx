import React from 'react';
import { Link } from 'react-router-dom';

const sidebarLinks = [
  { name: 'Overview', path: '/my-account' },
  { name: 'Membership', path: '/account/membership' },
  { name: 'Security', path: '/account/profile' },
  { name: 'Devices', path: '/account/devices' },
  { name: 'Refer a Friend', path: '/account/referfriend' },
];

const Membership: React.FC = () => {
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
                  borderBottom: '1px solid #eee'
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
          {/* Plan Details Box */}
          <div style={{
            backgroundColor: '#fff',
            color: '#000',
            padding: '40px',
            borderRadius: '5px',
            width: "750px",
            marginBottom: '20px'
          }}>
            <h3 style={{ marginTop: '20px', marginBottom: '5px' }}>No Plan</h3>
            <p style={{ margin: 0, paddingTop: "15px", paddingBottom: "10px" }}>Current Membership expired.</p>
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
          </div>
          <h4>Payment Info</h4>
          {/* Payment Info Box */}
          <div style={{
            backgroundColor: '#fff',
            color: '#000',
            padding: '35px',
            borderRadius: '5px',
            width: "750px"
          }}>
            <p style={{ fontWeight:"bold" }}>No payment method active right now.</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Membership;
