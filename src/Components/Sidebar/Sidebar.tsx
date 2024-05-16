import { useState } from "react";
import "./Sidebar.css";
import { SidebarData } from "./SidebarData";
import { Link, useLocation } from "react-router-dom";
import { AppRoutes } from "../Routes";

function Sidebar() {
  const location = useLocation();
  //Close sidebar on load
  const [isOpen, setIsOpen] = useState(() => {
    return false;
  });
  //Swap open state based on previous value.
  const toggle = () => {
    setIsOpen((prevIsOpen: unknown) => !prevIsOpen);
  };
  // Sidebar routes from sidebar data
  const sidebarDataAndRoutes = SidebarData.map((item, key) => {
    console.log(item + " " + key);
    const correspondingRoute = AppRoutes[key].path;
    return {
      ...item,
      route: correspondingRoute,
    };
  });

  // Sidebar list and HTML.
  const sidebarList = sidebarDataAndRoutes.map((item, key) => {
    return (
      <>
        <li
          key={key}
          className={
            location.pathname.includes(item.route) ? "row active" : "row"
          }
        >
          <Link to={item.route}>
            <div className="row-icon"> {item.icon} </div>
            <div
              className="row-title"
              style={{ display: isOpen ? "block" : "none" }}
            >
              <p>{item.title}</p>
            </div>
          </Link>
        </li>
      </>
    );
  });

  // Render HTML.
  return (
    <div
      className="Sidebar"
      style={{ width: isOpen ? "250px" : "75px" }}
      onMouseEnter={setIsOpen}
      onMouseLeave={toggle}
    >
      <ul className="SidebarList">{sidebarList}</ul>
    </div>
  );
}

export default Sidebar;
