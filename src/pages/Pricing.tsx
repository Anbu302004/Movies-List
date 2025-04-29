import React from 'react';

const Pricing: React.FC = () => {
  const plans = [
    {
      name: 'SILVER',
      price: '₹45',
      duration: '/Month',
      features: [
        'Video Quality: Best',
        'Video Resolution: 1080p (HD)',
        'Supported devices: All',
        'Ads free movies and shows',
      ],
      label: null,
    },
    {
      name: 'GOLD',
      price: '₹399',
      duration: '/6 Months',
      originalPrice: '₹499',
      features: [
        'Video Quality: Best',
        'Video Resolution: 1080p (HD)',
        'Supported devices: All',
        'Ads free movies and shows',
      ],
      label: 'MOST POPULAR',
    },
    {
      name: 'DIAMOND',
      price: '₹899',
      duration: '/Year',
      originalPrice: '₹999',
      features: [
        'Video Quality: Best',
        'Video Resolution: 1080p (HD)',
        'Supported devices: All',
        'Ads free movies and shows',
      ],
      label: 'MOST ECONOMICAL',
    },
  ];

  return (
    <div>
      <h1 style={{
        padding: "70px",
        background: "#191919",
        color: "white",
        marginTop: "-140px",
        marginBottom: "0"
      }} />
      <div style={{ backgroundColor: '#191919', color: '#fff', minHeight: '100vh', padding: '50px 20px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '100px', fontSize:"45px", }}>Choose Your Pricing Plan</h1>
        <p style={{ color: '#cc1e24', fontWeight: 'bold', marginLeft:"150px",lineHeight:"0.1px" }}>PRICING PLAN</p>
        <p style={{ color: '#ccc',marginLeft:"150px"  }}>
          Explore our range of plans to find the perfect fit for you.
        </p>
        <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', marginLeft:"150px" }}>
          {plans.map((plan, i) => (
            <div key={i} style={{
              backgroundColor: '#fff',
              color: '#000',
              borderRadius: '8px',
              padding: '20px',
              position: 'relative', 
              boxShadow: '0 0 15px rgba(0,0,0,0.2)',
              overflow: 'hidden'
            }}>
              {plan.label && (
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  left: '-35px', 
                  backgroundColor: '#ffc107',
                  color: '#000',
                  fontWeight: 'bold',
                  padding: '5px 50px',
                  fontSize: '12px',
                  boxShadow: '0 0 3px rgba(0,0,0,0.3)'
                }}>
                  {plan.label}
                </div>
              )}
              <h3 style={{ marginTop: '20px', textAlign: 'center' }}>{plan.name}</h3>
              <h2 style={{ textAlign: 'center', color: '#cc1e24' }}>
                {plan.price} <span style={{ fontSize: '16px', fontWeight: 'normal' }}>{plan.duration}</span>
              </h2>
              {plan.originalPrice && (
                <p style={{ textAlign: 'center', textDecoration: 'line-through', color: '#888' }}>{plan.originalPrice}</p>
              )}
              <ul style={{ listStyle: 'none', padding: 0, marginTop: '20px', fontSize: '14px' }}>
                {plan.features.map((feature, index) => (
                  <li key={index} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                    <span style={{
                      display: 'inline-block',
                      width: '20px',
                      height: '20px',
                      backgroundColor: '#cc1e24',
                      color: '#fff',
                      borderRadius: '50%',
                      textAlign: 'center',
                      lineHeight: '20px',
                      fontSize: '12px',
                      marginRight: '10px'
                    }}>
                      ✓
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button style={{
                backgroundColor: '#cc1e24',
                color: '#fff',
                border: 'none',
                padding: '10px',
                width: '100%',
                marginTop: '15px',
                fontWeight: 'bold',
                cursor: 'pointer',
                borderRadius: '4px'
              }}>
                Buy This Plan
              </button>
            </div>
          ))}
        </div>
        <p style={{marginTop: '60px', fontSize: '14px', color: 'white',marginLeft:"150px"}}>
        HD (720p), Full HD (1080p), Ultra HD (4K) and HDR availability subject to your internet service and device capabilities. Not all content is available in all resolutions. See our Terms of Use for more details. 
        Only people who live with you may use your account. Watch on 4 different devices at the same time with Premium, 2 with Standard, and 1 with Basic and Mobile.
        </p>
      </div>
    </div>
  );
};

export default Pricing;
