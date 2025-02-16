"use client";

import React from "react";
import "../styles/Footer.css";
import Image from "next/image";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-main">
                <div className="footer-container">
                    <div className="footer-content">
                        <div className="footer-section">
                            <h3>COMPANY INFO</h3>
                            <ul>
                                <li><a href="/about-us">About Us</a></li>
                                <li><a className="disabled-link" href="#" title="This link is for demonstration purposes only.">Leadership</a></li>
                                <li><a className="disabled-link" href="#" title="This link is for demonstration purposes only.">Careers</a></li>
                                <li><a className="disabled-link" href="#" title="This link is for demonstration purposes only.">News</a></li>
                                <li><a className="disabled-link" href="#" title="This link is for demonstration purposes only.">History</a></li>
                                <li><a className="disabled-link" href="#" title="This link is for demonstration purposes only.">Privacy Policy</a></li>
                                <li><a className="disabled-link" href="#" title="This link is for demonstration purposes only.">Terms of Use</a></li>
                            </ul>
                        </div>

                        <div className="footer-section">
                            <h3>RESOURCES</h3>
                            <ul>
                                <li><a href="/locations">Locations</a></li>
                                <li><a className="disabled-link" href="#" title="This link is for demonstration purposes only.">Promotions</a></li>
                                <li><a className="disabled-link" href="#" title="This link is for demonstration purposes only.">Events & Training</a></li>
                                <li><a className="disabled-link" href="#" title="This link is for demonstration purposes only.">Rebates</a></li>
                                <li><a className="disabled-link" href="#" title="This link is for demonstration purposes only.">Partner Program</a></li>
                                <li><a className="disabled-link" href="#" title="This link is for demonstration purposes only.">Rewards</a></li>
                                <li><a className="disabled-link" href="#" title="This link is for demonstration purposes only.">FAQs</a></li>
                            </ul>
                        </div>

                        <div className="footer-section">
                            <h3>CUSTOMER SERVICE</h3>
                            <ul>
                                <li><a className="disabled-link" href="#" title="This link is for demonstration purposes only.">Shipping & Returns</a></li>
                                <li><a className="disabled-link" href="#" title="This link is for demonstration purposes only.">Track Order</a></li>
                                <li><a className="disabled-link" href="#" title="This link is for demonstration purposes only.">Registration</a></li>
                                <li><a className="disabled-link" href="#" title="This link is for demonstration purposes only.">Warranty</a></li>
                                <li><a className="disabled-link" href="#" title="This link is for demonstration purposes only.">Feedback</a></li>
                                <li><a className="disabled-link" href="#" title="This link is for demonstration purposes only.">Contact Us</a></li>
                                <li><a className="disabled-link" href="#" title="This link is for demonstration purposes only.">Support</a></li>
                            </ul>
                        </div>

                        <div className="footer-section">
                            <h3>WAYS TO SHOP</h3>
                            <ul>
                                <li><a href="/brands">Brands</a></li>
                                <li><a className="disabled-link" href="#" title="This link is for demonstration purposes only.">Distribution</a></li>
                                <li><a className="disabled-link" href="#" title="This link is for demonstration purposes only.">Promotions</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="footer-info">
                        <div className="logo-container">
                            <Image 
                                src="/jonnovative-logo.jpg" 
                                alt="Company Logo" 
                                width={80} 
                                height={80}
                                className="footer-logo"
                            />
                        </div>
                        <div className="company-info">
                            <p>Product Catalog</p>
                            <p>123 Main Street</p>
                            <p>City, State 12345</p>
                        </div>
                        <div className="social-links">
                            <a href="https://www.linkedin.com/in/jonamichahammo/" target="_blank" aria-label="LinkedIn">
                                <Image src="/linkedin-icon.svg" alt="LinkedIn" width={24} height={24} />
                            </a>
                            <a href="https://github.com/Pythonidaer" target="_blank" aria-label="GitHub">
                                <Image src="/github-icon.svg" alt="GitHub" width={24} height={24} />
                            </a>
                            <a href="https://jonathan-hammond.vercel.app/" target="_blank" aria-label="Portfolio">
                                <Image src="/portfolio-icon.svg" alt="Portfolio" width={24} height={24} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="copyright">
                <div className="copyright-container">
                    <p>&copy; {currentYear} Product Catalog. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}