import React from "react";
import "../App.css";

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-text">{currentYear} | Açık Artırma</p>
      </div>
    </footer>
  );
}

export default Footer;
