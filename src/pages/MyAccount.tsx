import React from 'react';
import { Link } from 'react-router-dom';

const sidebarLinks = [
  { name: 'Overview', path: '/my-account' },
  { name: 'Membership', path: '/account/membership' },
  { name: 'Security', path: '/account/profile' },
  { name: 'Devices', path: '/account/devices' },
  { name: 'Refer a Friend', path: '/account/referfriend' },
];

const MyAccount: React.FC = () => {
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
        
        {/* Left Sidebar */}
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
              {sidebarLinks.map(({ name, path }, index) => (
                <li key={name} style={{          
                  padding: '10px 16px', 
                  backgroundColor: '#f7f7f7',
                }}>
                  <Link to={path} style={{
                    textDecoration: 'none',
                    color: index === 0 ? '#cc1e24' : '#000',
                    fontWeight: index === 0 ? 'bold' : 'normal'
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
          <h1 style={{ fontSize: '2rem', marginBottom: '30px' }}>Account</h1>

          {/* Membership Section */}
          <section style={{ marginBottom: '40px' }}>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '10px' }}>Membership details</h4>
            <div style={{
              backgroundColor: '#fff',
              color: '#000',
              padding: '40px',
              borderRadius: '5px',
              width: "750px"
            }}>
              <span style={{
                background: 'linear-gradient(to left, rgb(0, 181, 49), rgb(12, 18, 227), rgb(189, 8, 199), rgb(219, 24, 96))',
                color: '#fff',
                display: 'inline-flex',
                padding: '10px 30px',
                borderTopRightRadius: '100px',
                marginLeft: '-40px',
                fontSize: '20px'
              }}>
                Member since Apr 2025
              </span>
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
              <p style={{ marginTop: '15px', cursor: "pointer" }} className='acc'>Manage Membership</p>
            </div>
          </section>

          {/* Profile Section */}
          <section>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '10px' }}>Profile information</h4>
            <div style={{
              backgroundColor: '#fff',
              color: '#000',
              padding: '40px',
              borderRadius: '5px',
              width: "770px"
            }}>
              <p style={{ fontWeight: 'bold' }}>User</p>
              <p style={{ cursor: "pointer" }} className='acc'>Manage Account</p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default MyAccount;
