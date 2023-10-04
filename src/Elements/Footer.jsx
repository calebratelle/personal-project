import React from "react";

const Footer = () => {
  return (
    <footer className="bg-light text-center py-2 fixed-bottom">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Return to Excellence</p>
      </div>
    </footer>
  );
};

export default Footer;
