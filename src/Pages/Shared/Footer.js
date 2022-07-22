import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className="py-5" style={{ backgroundColor: "#0f0f0f" }}>
      <div className="d-flex flex-column justify-content-center align-items-center text-center p-md-2">
        <h1 style={{ color: "#666666" }}>Vike</h1>
        <div>
          <ul className="list-unstyled d-sm-flex">
            <li className="mx-3 mt-5">
              <NavLink
                className="text-decoration-none "
                style={{ color: "#555555" }}
                to="/comingSoon"
              >
                TERMS OF USE
              </NavLink>
            </li>
            <li className="mx-3 mt-5">
              <NavLink
                className="text-decoration-none "
                style={{ color: "#555555" }}
                to="/comingSoon"
              >
                PRIVACY INFORMATION
              </NavLink>
            </li>
            <li className="mx-3 mt-5">
              <NavLink
                className="text-decoration-none "
                style={{ color: "#555555" }}
                to="/comingSoon"
              >
                COOKIES INFORMATION
              </NavLink>
            </li>
          </ul>
        </div>
        <p className="m-5" style={{ color: "#444444" }}>
          Copyright © 2021 Vike Motor Holding S.p.A. – A Sole Shareholder
          Company - A Company subject to the Management and Coordination
          activities of AUDI AG. All rights reserved. VAT 05113870967 Vike.
        </p>
      </div>
    </div>
  );
};

export default Footer;
