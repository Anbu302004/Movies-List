import React from 'react';
import { Link } from 'react-router-dom';
import refer from '../assets/refer.jpg';

const sidebarLinks = [
  { name: 'Overview', path: '/my-account' },
  { name: 'Membership', path: '/account/membership' },
  { name: 'Security', path: '/account/profile' },
  { name: 'Devices', path: '/account/devices' },
  { name: 'Refer a Friend', path: '/account/referfriend' },
];

const ReferFriend: React.FC = () => {
  return (
    <div>
      {/* Header */}
      <h1
        style={{
          padding: '70px',
          background: '#191919',
          color: 'white',
          marginTop: '-140px',
          marginBottom: '0px',
        }}
      />

      {/* Page Layout */}
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
          marginTop: '20px',
          marginLeft: '100px',
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
              {sidebarLinks.map(({ name, path }, index) => (
                <li key={name} style={{
                  padding: '10px 16px', 
                   backgroundColor: '#f7f7f7',
                }}>
                  <Link to={path} style={{
                    textDecoration: 'none',
                    color: path === '/account/referfriend' ? '#cc1e24' : '#000',
                    fontWeight: path === '/account/referfriend' ? 'bold' : 'normal'
                  }}>
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Main Content */}
        <main style={{
          flex: 1,
          padding: '40px 60px',
          marginBottom: '80px'
        }}>
          <h1 style={{ fontSize: '28px', marginBottom: '20px' }}>Refer a Friend</h1>
          <p style={{ fontSize: '16px', marginBottom: '10px' }}>
            Share Referral URL with your friends and earn credits
          </p>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#000',
            borderRadius: '6px',
            overflow: 'hidden',
            marginBottom: '20px',
            maxWidth: '700px',
          }}>
            <input
              type="text"
              value="https://movies.harikaran.com/refer/BCBE8336E6AC"
              readOnly
              style={{
                flex: 1,
                backgroundColor: '#000',
                color: '#fff',
                border: 'none',
                padding: '12px 16px',
              }}
            />
            <button style={{
              backgroundColor: '#cc1e24',
              border: 'none',
              padding: '12px 20px',
              cursor: 'pointer',
              color: '#fff',
              fontWeight: 'bold'
            }}>
              Copy Url
            </button>
          </div>

          <img
            src={refer}
            alt="Refer"
            style={{
              width: '700px',
              borderRadius: '8px',
              marginBottom: '20px'
            }}
          />

          <p style={{
            fontSize: '14px',
            maxWidth: '700px',
            lineHeight: '1.6'
          }}>
            Every time a referred friend registers, we send you a gift worth 100 credits as a token of our appreciation.
            Once your referred friend makes their registration & once made the subscription, you will get a credit points.
          </p>

          <div style={{
            backgroundColor: '#fff',
            color: '#000',
            padding: '20px',
            marginTop: '20px',
            maxWidth: '700px',
            borderRadius: '6px',
          }}>
            <p><strong>Available Credits:</strong> 0</p>
            <p><strong>Credits Used:</strong> 0</p>
          </div>

          <h2 style={{ marginTop: '40px' }}>How does it work?</h2>
          <ul style={{
            maxWidth: '700px',
            lineHeight: '1.6',
            paddingLeft: '20px'
          }}>
            <li>
              Every time a referred friend registers, we send you a gift worth 100 credits as a token of our appreciation.
            </li>
            <li>
              Once your referred friend makes their registration & once made the subscription, you will get a credit points.
            </li>
          </ul>
        </main>
      </div>
    </div>
  );
};

export default ReferFriend;
