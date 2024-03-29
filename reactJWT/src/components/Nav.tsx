import React from 'react';
import { Link } from 'react-router-dom';

// when we logout we have to emit that we have logged out
const Nav = (props: { name: string; setName: (name: string) => void }) => {
  //LOGOUT
  const logout = async () => {
    await fetch('http://localhost:8000/api/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    });

    //making name empty
    props.setName('');
  };

  let menu;
  if (props.name === '') {
    menu = (
      <ul className="navbar-nav ml-auto mr-auto">
        <li className="nav-item active">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
        <li className="nav-item active">
          <Link to="/register" className="nav-link">
            Register
          </Link>
        </li>
      </ul>
    );
  } else {
    menu = (
      <ul className="navbar-nav ml-auto mr-auto">
        <li className="nav-item active">
          <Link to="/login" className="nav-link" onClick={logout}>
            Logout
          </Link>
        </li>
      </ul>
    );
  }

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          Home
        </Link>
        <div>{menu}</div>
      </div>
    </nav>
  );
};

export default Nav;
