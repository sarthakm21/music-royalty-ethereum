import React from "react";
import { Outlet, Link } from "react-router-dom";

import "./styles/navbar.css";

const Navbar = () => {
  return (
    <>
      <nav>
        <Link to="/register">Register Music</Link>
        <Link to="/buy">Buy Music</Link>
        <Link to="/claim">Claim Royalties</Link>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
