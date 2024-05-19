import { useState } from "react";
import "./Sidebar.css";
import { SidebarData } from "./SidebarData";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../Security/AuthProvider";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

function Sidebar() {
  const auth = useAuth(); // Call useAuth at the top level
  const location = useLocation();
  //Close sidebar on load
  const [isOpen, setIsOpen] = useState(() => {
    return false;
  });
  //Swap open state based on previous value.
  const toggle = () => {
    setIsOpen((prevIsOpen: unknown) => !prevIsOpen);
  };

  const loginBar = (
    <li>
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
      <>
        {
          // Check item.role and if user is logged in, the item should be shown if the user has the role.
          item.role && !auth.isLoggedInAs(item.role) ? null : (
            <li
              key={key}
              className={
                location.pathname.includes(String(item.route))
                  ? "row active"
                  : "row"
              }
            >
              <Link to={String(item.route)}>
                <div className="row-icon"> {item.icon} </div>
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
      </>
    );
  });

  // Render HTML.
  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  return (
    <div
      className="Sidebar"
      style={{ width: isOpen ? "250px" : "75px" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={toggle}
    >
      <ul className="SidebarList">{!auth.username ? loginBar : sidebarList}</ul>
    </div>
  );
}

export default Sidebar;
