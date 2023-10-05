import React from "react";

const Footer = () => {
  return (
    <footer
      className="text-center py-2"
      style={{ backgroundColor: "#c4c4c4", borderTop: "1px solid #000000" }}
    >
      <div className="container">
        <p></p>
        <p>&copy; {new Date().getFullYear()} Return to Excellence</p>
      </div>
    </footer>
  );
};

export default Footer;
