import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <a className="navbar-brand">
            CRUD Application
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Header;
