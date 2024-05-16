import { useLocation } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import Sidebar from "./Components/Sidebar/Sidebar";
import "./Layout.css";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  // Check if the current path is '/login'
  const isBlankBackPage =
    location.pathname === "/login" || location.pathname === "/new-account";

  return (
    <div className="app-layout">
      <header>
        <NavBar />
      </header>
      <Sidebar />
      <main
        className={`page-content ${isBlankBackPage ? "hidden-background" : ""}`}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;
