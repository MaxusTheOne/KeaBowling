import { useState } from "react";
import "./Sidebar.css";
import { SidebarData } from "./SidebarData";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../Security/AuthProvider";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Login from "@mui/icons-material/Login";
import React from "react";

function Sidebar() {
  const auth = useAuth();
  const location = useLocation();
  //Close sidebar on load
  const [isOpen, setIsOpen] = useState(() => {
    return false;
  });
  //Swap open state based on previous value.
  const toggle = () => {
    setIsOpen((prevIsOpen: unknown) => !prevIsOpen);
  };
  const handleSignout = () => {
    auth.signOut();
  };

  const signInAndOutButton = auth.isLoggedIn() ? (
    <li id="sidebar-signout" className="row">
      <Link to="/" onClick={handleSignout}>
        <div className="row-icon">
          <ExitToAppIcon />
        </div>
        <div
          className="row-title"
          style={{ display: isOpen ? "block" : "none" }}
        >
          <p>Sign Out</p>
        </div>
      </Link>
    </li>
  ) : (
    <li
      id="sidebar-login"
      className={location.pathname === "/login" ? "row active" : "row"}
    >
      <Link to="/login">
        <div className="row-icon">
          <Login />
        </div>
        <div
          className="row-title"
          style={{ display: isOpen ? "block" : "none" }}
        >
          <p>Sign In</p>
        </div>
      </Link>
    </li>
  );

  const loginBar = (
    <li className={location.pathname === "/new-account" ? "row active" : "row"}>
      <Link to="/new-account">
        <div className="row-icon">
          <PersonAddIcon />
        </div>
        <div
          className="row-title"
          style={{ display: isOpen ? "block" : "none" }}
        >
          <p>Create Account</p>
        </div>
      </Link>
    </li>
  );

  // Sidebar list and HTML.
  const sidebarList = SidebarData.map((item, key) => {
    return (
      <React.Fragment key={key}>
        {
          // Check item.role and if user is logged in, the item should be shown if the user has the role.
          item.role && !auth.isLoggedInAs(item.role) ? null : (
            <li
              key={key}
              id={item.title}
              className={
                location.pathname.includes(String(item.route))
                  ? "row active"
                  : "row"
              }
            >
              <Link to={String(item.route)}>
                <div className="row-icon" key={key}>
                  {" "}
                  {item.icon}{" "}
                </div>
                <div
                  className="row-title"
                  style={{ display: isOpen ? "block" : "none" }}
                >
                  <p>{item.title}</p>
                </div>
              </Link>
            </li>
          )
        }
      </React.Fragment>
    );
  });

  // Render HTML.
  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  return (
    <div>
      <div
        className="Sidebar"
        style={{ width: isOpen ? "250px" : "75px" }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={toggle}
      >
        <ul className="SidebarList">
          <li
            id="sidebar-logo"
            className={location.pathname === "/" ? "row active" : "row"}
          >
            <NavLink to="/">
              <img src="../../../public/Logo.png" alt="" className="row-icon" />
              <div
                className="row-title"
                style={{ display: isOpen ? "block" : "none" }}
              >
                <p>Kea Bowling</p>
              </div>
            </NavLink>
          </li>
          <hr />

          {!auth.username ? loginBar : sidebarList}
          {signInAndOutButton}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
