import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import InventoryIcon from "@mui/icons-material/Inventory";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ListAlt from "@mui/icons-material/ListAlt";

// NOTE: Sidebar data is loaded in sequence together with Routes.tsx ("../Routes.tsx").
// This means that the order of the routes and the order of the sidebar items HAS to be the same - otherwise the items will route to other routes when clicked on...
// If you want to change the order, you will have to do it both in the Routes.tsx and in the SidebarData.

export const SidebarData = [
  {
    title: "Log in",
    role: ["GUEST"],
    icon: <AccountCircleIcon />,
    route: "/login",
  },
  {
    title: "My Page",
    role: ["ADMIN", "EquipmentOperator", "STAFF"],
    icon: <AccountCircleIcon />,
    route: "/my-page",
  },
  {
    title: "All Reservations",
    role: ["ADMIN"],
    icon: <ListAlt />,
    route: "/reservations",
  },
  {
    title: "Work Schedule",
    role: ["ADMIN", "EquipmentOperator", "STAFF"],
    icon: <CalendarMonthIcon />,
    route: "/schedule",
  },
  {
    title: "Equipment",
    role: ["ADMIN", "EquipmentOperator", "STAFF"],
    icon: <InventoryIcon />,
    route: "/equipment",
  },
  {
    title: "Users",
    role: ["ADMIN"],
    icon: <PeopleAltIcon />,
    route: "/users",
  },
  {
    title: "Sell Beverages",
    role: ["ADMIN", "STAFF"],
    icon: <InventoryIcon />,
    route: "/beverages",
  },
];
