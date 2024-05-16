import MakeReservationPage from "./Pages/Reservation/MakeReservationPage";
import ReservationsPage from "./Pages/Reservation/ReservationsPage";
import SchedulePage from "./Pages/Schedule/SchedulePage";
import EquipmentPage from "./Pages/Equipment/EquipmentPage";
import UsersPage from "./Pages/Users/UsersPage";
import MyPage from "./Pages/MyPage/MyPage";
import LandingPage from "./Pages/LandingPage";
import Login from "../Security/Login";
import CreateAccountPage from "./Pages/SignIn/CreateAccountPage";

const AppRoutes = [
  {
    path: "/my-page",
    Element: MyPage,
  },
  {
    path: "/reservations",
    Element: ReservationsPage,
  },
  {
    path: "/schedule",
    Element: SchedulePage,
  },
  {
    path: "/equipment",
    Element: EquipmentPage,
  },
  {
    path: "/users",
    Element: UsersPage,
  },
  // ROUTES NOT IN SIDEBAR
  {
    path: "/",
    Element: LandingPage,
  },
  {
    path: "/login",
    Element: Login,
  },
  {
    path: "/new-account",
    Element: CreateAccountPage,
  },
];

export { AppRoutes };
