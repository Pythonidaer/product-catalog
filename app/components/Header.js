"use client";

import React, { useState } from "react";
import "../styles/Header.css";

export default function Header() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const toggleOffcanvas = () => {
    setIsOffcanvasOpen(!isOffcanvasOpen);
    console.log("Offcanvas Open:", !isOffcanvasOpen);
    setActiveSubmenu(null); // reset submenu when toggling offcanvas
  };

  return (
    <header>
      {/* Top Header with Utility Links */}
      <div className="header-top">
        <div className="container flex-container top-links-container">
          <div className="top-links">
            <a href="/locations/">📍 LOCATIONS</a>
            <a href="/help/">SUPPORT</a>
            <a className="d-sm-none" href="/webbrewards/">
              REWARDS
            </a>
            <a href="/careers/">CAREERS</a>
          </div>
        </div>
      </div>

      {/* Desktop Header (visible on medium screens and up) */}
      <div className="header-main desktop-header d-none d-md-flex">
        <div className="container flex-container">
          <div className="logo">
            <a href="/">
              <img src="/jonnovative-logo.jpg" alt="Jonnovative Logo" />
            </a>
          </div>
          <div className="search-bar">
            <input type="text" placeholder="Search by keyword, part #, etc." />
            <button className="search-btn">🔍</button>
          </div>
          <div className="user-actions">
            <a href="/register">SIGN IN | REGISTER</a>
            <a href="/cart" className="cart">
              🛒 <span className="cart-count">0</span>
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Header (visible only on small screens) */}
      <div className="header-main mobile-header d-md-none">
        <div className="container flex-container mobile-top-row">
          <div className="mobile-left">
            <a href="/">
              <img
                src="/jonnovative-logo.jpg"
                alt="Mobile Logo"
                className="mobile-logo"
              />
            </a>
            <button
              type="button"
              className="hamburger-button"
              aria-label="Menu"
              onClick={toggleOffcanvas}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect y="2" width="32" height="4" fill="currentColor" />
                <rect y="14" width="32" height="4" fill="currentColor" />
                <rect y="26" width="32" height="4" fill="currentColor" />
              </svg>
            </button>
          </div>
          <div className="mobile-center">
            <a href="/register" className="mobile-signin">
              SIGN IN
            </a>
          </div>
          <div className="mobile-right">
            <a href="/cart" className="mobile-cart">
              🛒 <span className="cart-count">0</span>
            </a>
          </div>
        </div>
        <div className="container mobile-search-row">
          <div className="search-bar">
            <input type="text" placeholder="Search by keyword, part #, etc." />
            <button className="search-btn">🔍</button>
          </div>
        </div>
      </div>

      {/* Offcanvas Mobile Menu (visible on mobile when toggled) */}
      {isOffcanvasOpen && (
        <div id="mobile-offcanvas" className="offcanvas">
          <button
            type="button"
            className="offcanvas-close"
            aria-label="Close Menu"
            onClick={toggleOffcanvas}
          >
            &times;
          </button>
          {activeSubmenu === null ? (
            // Main offcanvas menu
            <ul className="offcanvas-menu main-menu">
              <li
                className="menu-item"
                onClick={() => setActiveSubmenu("shopAllDepts")}
              >
                Shop All Depts{" "}
                <span className="sub-menu-arrow">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ verticalAlign: "middle", marginLeft: "4px" }}
                  >
                    <polyline
                      points="6,2 12,8 6,14"
                      fill="none"
                      stroke="#333"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </li>
              <li className="menu-item">
                <a href="/landing/main-plumbing">Plumbing</a>
              </li>
              <li className="menu-item">
                <a href="/landing/main-heating">Heating</a>
              </li>
              <li className="menu-item">
                <a href="/landing/main-hvacr">HVAC/R</a>
              </li>
              <li className="menu-item">
                <a href="/landing/main-propane">Propane</a>
              </li>
              <li className="menu-item">
                <a href="/brands.php">Top Brands</a>
              </li>
              <li className="menu-item">
                <a href="/about-us.php">About Us</a>
              </li>
              <li className="menu-item">
                <a href="/events/">Events &amp; Training</a>
              </li>
            </ul>
          ) : activeSubmenu === "shopAllDepts" ? (
            // Submenu for "Shop All Depts"
            <div className="submenu">
              <button
                type="button"
                className="offcanvas-back-button"
                onClick={() => setActiveSubmenu(null)}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ verticalAlign: "middle", marginRight: "4px" }}
                >
                  <polyline
                    points="10,2 4,8 10,14"
                    fill="none"
                    stroke="red"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>{" "}
                Back
              </button>
              <ul className="offcanvas-menu submenu-menu">
                <li className="menu-item">
                  <a href="/landing/main-plumbing">Plumbing</a>
                </li>
                <li className="menu-item">
                  <a href="/landing/main-heating">Heating</a>
                </li>
                <li className="menu-item">
                  <a href="/landing/main-hvacr">HVAC/R</a>
                </li>
                <li className="menu-item">
                  <a href="/landing/main-propane">Propane</a>
                </li>
                <li className="menu-item">
                  <a href="/landing/main-pipe">Pipe &amp; Tube</a>
                </li>
                <li className="menu-item">
                  <a href="/landing/main-electrical">Electrical</a>
                </li>
                <li className="menu-item">
                  <a href="/landing/fire-protection">Fire Protection</a>
                </li>
                <li className="menu-item">
                  <a href="/landing/main-fittings">Fittings</a>
                </li>
                <li className="menu-item">
                  <a href="/landing/main-hangers">Hangers</a>
                </li>
                <li className="menu-item">
                  <a href="/landing/main-hardware">Hardware</a>
                </li>
                <li className="menu-item">
                  <a href="/landing/main-industrial">Industrial</a>
                </li>
                <li className="menu-item">
                  <a href="/landing/main-safety">Safety</a>
                </li>
                <li className="menu-item">
                  <a href="/landing/specialties">Specialties</a>
                </li>
                <li className="menu-item">
                  <a href="/landing/main-tools">Tools</a>
                </li>
                <li className="menu-item">
                  <a href="/landing/main-valves">Valves</a>
                </li>
                <li className="menu-item">
                  <a href="/landing/well-systems">Well Systems</a>
                </li>
              </ul>
            </div>
          ) : null}
        </div>
      )}

      {/* Navigation Bar (Desktop only) */}
      <nav className="nav-bar d-none d-md-block">
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
                    <a href="/landing/main-pipe">Pipe &amp; Tube</a>
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
            <li>
              <a href="/landing/main-plumbing">Plumbing</a>
            </li>
            <li>
              <a href="/landing/main-heating">Heating</a>
            </li>
            <li>
              <a href="/landing/main-hvacr">HVAC/R</a>
            </li>
            <li>
              <a href="/landing/main-propane">Propane</a>
            </li>
            <li>
              <a href="/brands.php">Top Brands</a>
            </li>
            <li>
              <a href="/about-us.php">About Us</a>
            </li>
            <li>
              <a href="/events/">Events &amp; Training</a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
