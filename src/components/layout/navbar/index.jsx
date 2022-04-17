import React from 'react';
import { Link } from 'react-router-dom';

const NavBarComponent = () => {
  return (
    <div>
      <h1>TestBed</h1>
      <nav
        style={{
          borderBottom: 'solid 1px',
          paddingBottom: '1rem',
        }}
      >
        <Link to="/" style={{ display: 'block' }}>
          Home
        </Link>
        <Link to="/login" style={{ display: 'block' }}>
          Login
        </Link>
        <Link to="/test-auth" style={{ display: 'block' }}>
          Test Auth
        </Link>
        <Link to="/logout" style={{ display: 'block' }}>
          Logout
        </Link>
        <Link to="/my" style={{ display: 'block' }}>
          Dashboard
        </Link>
        <Link to="/coaches" style={{ display: 'block' }}>
          Coaches
        </Link>
      </nav>
    </div>
  );
};

export default React.memo(NavBarComponent);
