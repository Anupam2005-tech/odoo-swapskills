import React from "react";
const Footer = () => {
    const currentYear = new Date().getFullYear();
  
    return (
      <footer className="text-center py-4 text-sm text-white bg-black border-t border-gray-600">
        © {currentYear}. Startup.  All rights reserved.
      </footer>
    );
  };
  
  export default Footer;