import React from "react";

const Footer = () => {
  return (
    <footer
      className="text-center py-3"
      style={{ backgroundColor: "#c4c4c4", borderTop: "1px solid #ddd", boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.1)" }}
    >
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Return to Excellence</p>
      </div>
    </footer>
  );
};

export default Footer;
