import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, [navigate]);

  const handleLogout = () =>{
    localStorage.removeItem("token");
    navigate('/');
  }

  return (
    <header className="header">
      <div className="logo">
        <img src="/taskIcon.png" alt="TodoLogo" />
      </div>
      <nav>
        <ul className="nav-links">
          {!isAuthenticated ? (
            <>
              <li><Link to="/register">Signup</Link></li>
              <li><Link to="/">Login</Link></li>
            </>
          ) : (
            <li><Link to="/" onClick={handleLogout}>Logout</Link></li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
