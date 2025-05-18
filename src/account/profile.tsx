import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const sidebarLinks = [
  { name: 'Overview', path: '/my-account' },
  { name: 'Membership', path: '/account/membership' },
  { name: 'Security', path: '/account/profile' },
  { name: 'Devices', path: '/account/devices' },
  { name: 'Refer a Friend', path: '/account/referfriend' },
];

const Profile: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');

  useEffect(() => {
    setUserName(localStorage.getItem("user_name") || "");
    setUserPhone(localStorage.getItem("user_phone") || "");
  }, []);

  return (
    <div>
      <div style={{
        padding: "70px",
        background: "#191919",
        color: "white",
        marginTop: "-140px"
      }} />

      <div style={{ backgroundColor: '#161616', color: '#fff', minHeight: '100vh', display: 'flex' }}>
        {/* Sidebar */}
        <aside style={{ width: '260px', padding: '30px 20px', marginLeft: '100px' }}>
          <Link to="/home" style={{ color: '#fff', textDecoration: 'none', fontSize: '14px', paddingLeft: "30px" }}>
            ← Back to BESTCAST
          </Link>

          <div style={{ backgroundColor: '#fff', color: '#000', borderRadius: '6px', marginTop: '30px' }}>
            <div style={{ backgroundColor: '#cc1e24', padding: '12px 16px', fontWeight: 'bold', color: '#fff' }}>
              My Account
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {sidebarLinks.map(({ name, path }) => (
                <li key={name} style={{  padding: '10px 16px', 
                  backgroundColor: '#f7f7f7', }}>
                  <Link to={path} style={{
                    textDecoration: 'none',
                    color: name === 'Security' ? '#cc1e24' : '#000',
                    fontWeight: name === 'Security' ? 'bold' : 'normal'
                  }}>
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Main Content */}
        <main style={{ flex: 1, padding: '20px 40px', maxWidth: "800px" }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '30px' }}>Profile</h1>
          <h4>Account Information</h4>

          {/* Profile Form */}
          <div style={{ backgroundColor: '#fff', color: '#000', padding: '30px', borderRadius: '5px' }}>
            <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
              <select style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: '#cfcece' }}>
                <option value="">Select Title</option>
                <option value="mr">Mr</option>
                <option value="mrs">Mrs</option>
                <option value="miss">Miss</option>
                <option value="dr">Dr</option>
                <option value="mx">Mx</option>
              </select>
              <input
                placeholder="First Name *"
                value={userName}
                style={{ flex: 2, padding: '10px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: '#cfcece' }}
              />
              <input
                placeholder="Last Name"
                style={{ flex: 2, padding: '10px', borderRadius: '5px', border: '1px solid #ccc' , backgroundColor: '#cfcece' }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                Mobile <span style={{ color: 'green', fontSize: '12px' }}>✔ VERIFIED</span>
              </p>
              <p style={{ margin: 0 }}>{userPhone}</p>
            </div>

            <input
              placeholder="Date of Birth (dd/mm/yyyy)"
              style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: '#cfcece', }}
            />
            <select
              style={{ width: '100%', padding: '10px', marginBottom: '20px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: '#cfcece' }}
            >
               <option value="">Select </option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select> 
          </div>
           <button style={{
              backgroundColor: '#cc1e24',
              color: '#fff',
              padding: '14px',
              borderRadius: '5px',
              marginTop: '50px',
              width: '100%',
              border: 'none',
              fontWeight: 'bold',
              cursor: "pointer",
              fontSize: "16px"
            }}>Update</button>

          {/* Delete Account */}
          <h4 style={{ marginTop: '40px' }}>Permanent Account Removal</h4>
          <div style={{ backgroundColor: '#fff', color: '#000', padding: '20px', borderRadius: '5px' }}>
            <p style={{ marginBottom: '15px' }}>
              Once you delete your account, the action is permanent and cannot be reversed. All your data,
              subscription, settings, and personal information, will be permanently erased. Recovery will not be possible after deletion.
            </p>
            <button style={{
              backgroundColor: '#cc1e24',
              color: '#fff',
              padding: '12px 20px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold',
              borderRadius: '5px'
            }}>Delete Account</button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
