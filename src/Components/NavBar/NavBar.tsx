import { useAuth } from "../../Security/AuthProvider";
import { NavLink, useLocation } from "react-router-dom";
import "./NavBar.css";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";

export default function NavBar() {
  const location = useLocation();
  const auth = useAuth();
  const handleSignout = () => {
    auth.signOut();
  };
  return (
    <nav className="nav-header">
      <ul className="nav-header-ul">
        <li id="nav-header-menu-logo">
          <DensityMediumIcon />
        </li>
        <li id="sidebar-logo" className="row-icon">
          <NavLink to="/">
            <img src="../../../public/Logo.png" alt="" />
          </NavLink>
        </li>
        {auth.isLoggedIn() && (
          <>
            <li id="nav-signout">
              <NavLink to="/" onClick={handleSignout}>
                <ExitToAppIcon />
              </NavLink>
            </li>
          </>
        )}
        {!auth.isLoggedIn() && (
          <li
            id="nav-signin"
            className={
              location.pathname == "/login" ||
              location.pathname == "/new-account"
                ? "active-header"
                : ""
            }
          >
            <NavLink to="/login">
              <p>Log ind</p>
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}
