import React from "react";

const Footer = () => {
  return (
    <footer className="text-center py-2" style={{ backgroundColor: "#e6e6e6" }}>
      <div className="container">
        <p></p>
        <p>&copy; {new Date().getFullYear()} Return to Excellence</p>
      </div>
    </footer>
  );
};

export default Footer;
