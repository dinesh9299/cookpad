import React from "react";

const Footer = () => {
  return (
    <div className=" bg-info p-3  d-lg-flex justify-content-between">
      <div className=" mt-3 mb-1">
        ©2024 Dinesh Veeravalli· All rights reserved.Privacy policy
      </div>
      <div className=" me-4 pe-4">
        <span className=" me-3 fs-4 bi bi-facebook"></span>
        <span className="me-3 fs-4 bi bi-twitter"></span>
        <span className="me-3 fs-4 bi bi-instagram"></span>
        <span className="me-3 fs-4 bi bi-pinterest"></span>
      </div>
    </div>
  );
};

export default Footer;
