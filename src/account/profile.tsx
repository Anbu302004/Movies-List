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
    const name = localStorage.getItem("user_name") || "";
    const phone = localStorage.getItem("user_phone") || "";
    setUserName(name);
    setUserPhone(phone);
  }, []);

  return (
    <div>
      <h1 style={{
        padding: "70px",
        background: "#191919",
        color: "white",
        marginTop: "-140px",
        marginBottom: "0px",
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
                <li key={name} style={{ padding: '10px 16px', borderBottom: '1px solid #eee' }}>
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
        <main style={{ flex: 1, padding: '20px', maxWidth: "800px" }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '30px' }}>Profile</h1>
          <h4>Account Information</h4>

          {/* Profile Form */}
          <div style={{ backgroundColor: '#fff', color: '#000', padding: '30px', borderRadius: '5px' }}>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            <select  style={{ flex: 1 }}>
              <option value="">Select Title</option>
              <option value="mr">Mr</option>
              <option value="mrs">Mrs</option>
              <option value="miss">Miss</option>
              <option value="dr">Dr</option>
              <option value="mx">Mx</option>
            </select>
              <input placeholder="First Name *" value={userName} style={{ flex: 2 }} />
              <input placeholder="Last Name" style={{ flex: 2 }} />
            </div>

            <p style={{ fontWeight: 'bold' }}>Mobile <span style={{ color: 'green', fontSize: '12px' }}>✔ VERIFIED</span></p>
            <p style={{ marginBottom: '20px' }}>{userPhone}</p>

            <input placeholder="Date of Birth *" style={{ width: '100%', marginBottom: '10px' }} />
            <select style={{ width: '100%', marginBottom: '20px' }}>
              <option>Select</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>

            <button style={{
              backgroundColor: '#cc1e24',
              color: '#fff',
              padding: '10px',
              width: '100%',
              border: 'none',
              fontWeight: 'bold',
              marginTop: '10px',
              cursor:"pointer"
            }}>Update</button>
          </div>

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
              padding: '10px 20px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}>Delete Account</button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
