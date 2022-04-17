import React from 'react';
import { Link } from 'react-router-dom';

const NavBarComponent = () => {
  const style = { display: 'block', margin: 10 };
  return (
    <header>
      <h1>TestBed</h1>
      <nav
        style={{
          borderBottom: 'solid 1px',
          paddingBottom: '1rem',
          display: 'flex',
          alignContent: 'space-evenly',
        }}
      >
        <Link to="/" style={style}>
          Home
        </Link>
        <Link to="/login" style={style}>
          Login
        </Link>
        <Link to="/test-auth" style={style}>
          Trigger Login Modal
        </Link>
        <Link to="/logout" style={style}>
          Logout
        </Link>
        <Link to="/my" style={style}>
          Dashboard
        </Link>
        <Link to="/coaches" style={style}>
          Coaches
        </Link>
      </nav>
    </header>
  );
};

export default React.memo(NavBarComponent);
