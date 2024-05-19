import ReservationsPage from "./Pages/Reservation/ReservationsPage";
import SchedulePage from "./Pages/Schedule/SchedulePage";
import EquipmentPage from "./Pages/Equipment/EquipmentPage";
import UsersPage from "./Pages/Users/UsersPage";
import MyPage from "./Pages/MyPage/MyPage";
import LandingPage from "./Pages/LandingPage";
import Login from "../Security/Login";
import CreateAccountPage from "./Pages/SignIn/CreateAccountPage";
import RequireAuth from "../Security/RequireAuth";
import BeveragesPage from "./Pages/Beverages/BeveragesPage";

const AppRoutes = [
  {
    path: "/my-page",
    Element: () => (
      <RequireAuth roles={["ADMIN", "EquipmentOperator", "STAFF", "USER"]}>
        <MyPage />
      </RequireAuth>
    ),
  },
  {
    path: "/reservations",
    Element: () => (
      <RequireAuth roles={["ADMIN", "STAFF"]}>
        <ReservationsPage />
      </RequireAuth>
    ),
  },
  {
    path: "/beverages",
    Element: () => (
      <RequireAuth roles={["ADMIN", "STAFF"]}>
        <BeveragesPage />
      </RequireAuth>
    ),
  },
  {
    path: "/schedule",
    Element: () => (
      <RequireAuth roles={["ADMIN", "STAFF"]}>
        <SchedulePage />
      </RequireAuth>
    ),
  },
  {
    path: "/equipment",
    Element: () => (
      <RequireAuth roles={["ADMIN", "EquipmentOperator"]}>
        <EquipmentPage />
      </RequireAuth>
    ),
  },
  {
    path: "/users",
    Element: () => (
      <RequireAuth roles={["ADMIN"]}>
        <UsersPage />
      </RequireAuth>
    ),
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
