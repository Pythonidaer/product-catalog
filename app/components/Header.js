"use client";

import React, { useState } from "react";
import "../styles/Header.css"

export default function Header() {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  return (
    <header>
      {/* Top Header with Links */}
      <div className="header-top">
        <div className="container flex-container top-links-container">
          <div className="top-links">
            <a href="/locations/">📍 LOCATIONS</a>
            <a href="/help/">SUPPORT</a>
            <a href="/webbrewards/">REWARDS</a>
            <a href="/careers/">CAREERS</a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="header-main">
        <div className="container flex-container">
          {/* Logo */}
          <div className="logo">
            <a href="/">
              <img src="/jonnovative-logo.jpg" alt="Jonnovative Logo" />
            </a>
          </div>

          {/* Search Bar */}
          <div className="search-bar">
            <input type="text" placeholder="Search by keyword, part #, etc." />
            <button className="search-btn">🔍</button>
          </div>

          {/* User Actions */}
          <div className="user-actions">
            <a href="/register">SIGN IN | REGISTER</a>
            <a href="/cart" className="cart">🛒 <span className="cart-count">0</span></a>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="nav-bar">
        <div className="container flex-container">
          <ul>
            <li
              className="dropdown"
              onMouseEnter={() => setDropdownVisible(true)}
              onMouseLeave={() => setDropdownVisible(false)}
            >
              <a href="#">Shop All Depts</a>
              {dropdownVisible && (
                <div className="dropdown-menu">
                  <div className="dropdown-column">
                    <a href="/landing/main-plumbing">Plumbing</a>
                    <a href="/landing/main-heating">Heating</a>
                    <a href="/landing/main-hvacr">HVAC/R</a>
                    <a href="/landing/main-propane">Propane</a>
                  </div>
                  <div className="dropdown-column">
                    <a href="/landing/main-pipe">Pipe & Tube</a>
                    <a href="/landing/main-electrical">Electrical</a>
                    <a href="/landing/fire-protection">Fire Protection</a>
                    <a href="/landing/main-fittings">Fittings</a>
                  </div>
                  <div className="dropdown-column">
                    <a href="/landing/main-hangers">Hangers</a>
                    <a href="/landing/main-hardware">Hardware</a>
                    <a href="/landing/main-industrial">Industrial</a>
                    <a href="/landing/main-safety">Safety</a>
                  </div>
                  <div className="dropdown-column">
                    <a href="/landing/specialties">Specialties</a>
                    <a href="/landing/main-tools">Tools</a>
                    <a href="/landing/main-valves">Valves</a>
                    <a href="/landing/well-systems">Well Systems</a>
                  </div>
                </div>
              )}
            </li>
            <li><a href="/landing/main-plumbing">Plumbing</a></li>
            <li><a href="/landing/main-heating">Heating</a></li>
            <li><a href="/landing/main-hvacr">HVAC/R</a></li>
            <li><a href="/landing/main-propane">Propane</a></li>
            <li><a href="/brands.php">Top Brands</a></li>
            <li><a href="/about-us.php">About Us</a></li>
            <li><a href="/events/">Events & Training</a></li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
