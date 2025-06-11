import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <header className="top-navbar">
      <div className="logo">
        <img src="/star.png" alt="STAR" />
        <span>STAR</span>
      </div>
      <nav>
        <Link to="/" className={pathname === '/' ? 'active' : ''}>Home</Link>
        <Link to="/lesson" className={pathname === '/lesson' ? 'active' : ''}>Lesson Plan</Link>
        <Link to="/tasks" className={pathname === '/tasks' ? 'active' : ''}>Calendar</Link>
        <Link to="/opportunities" className={pathname === '/opportunities' ? 'active' : ''}>Opportunities</Link>
      </nav>
    </header>
  );
}