import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import ListAltIcon from "@mui/icons-material/ListAlt";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import InventoryIcon from "@mui/icons-material/Inventory";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// NOTE: Sidebar data is loaded in sequence together with Routes.tsx ("../Routes.tsx").
// This means that the order of the routes and the order of the sidebar items HAS to be the same - otherwise the items will route to other routes when clicked on...
// If you want to change the order, you will have to do it both in the Routes.tsx and in the SidebarData.

export const SidebarData = [
  {
    title: "My Page",
    role: "Any",
    icon: <AccountCircleIcon />,
  },
  {
    title: "Make Reservation",
    role: "any",
    icon: <BookmarkAddIcon />,
  },
  {
    title: "All Reservations",
    role: "ReservationStaff Admin",
    icon: <ListAltIcon />,
  },
  {
    title: "Work Schedule",
    role: "ReservationStaff Staff Admin EquipmentOperator",
    icon: <CalendarMonthIcon />,
  },
  {
    title: "Equipment",
    role: "EquipmentOperator",
    icon: <InventoryIcon />,
  },
  {
    title: "Users",
    role: "Admin",
    icon: <PeopleAltIcon />,
  },
];
