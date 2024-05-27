import ReservationsPage from "./Pages/Reservation/ReservationsPage";
import ReservationsDetailPage from "./Pages/Reservation/ReservationDetailPage";
import SchedulePage from "./Pages/Schedule/SchedulePage";
import EquipmentPage from "./Pages/Equipment/EquipmentPage";
import UsersPage from "./Pages/Users/UsersPage";
import MyPage from "./Pages/MyPage/MyPage";
import LandingPage from "./Pages/LandingPage/LandingPage";
import Login from "../Security/Login";
import CreateAccountPage from "./Pages/SignIn/CreateAccountPage";
import RequireAuth from "../Security/RequireAuth";
import PurchasePage from "./Pages/Beverages/PurchasePage";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";
import UsersPageAdd from "./Pages/Users/UsersPageAdd";
import MyPageCalendar from "./Pages/MyPage/MyPageCalendar/MyPageCalendar";
import EquipmentPageAdd from "./Pages/Equipment/AddEquipment/EquipmentPageAdd";

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
    path: "/reservations/:id",
    Element: () => (
      <RequireAuth roles={["ADMIN", "STAFF"]}>
        <ReservationsDetailPage />
      </RequireAuth>
    ),
  },
  {
    path: "/sell",
    Element: () => (
      <RequireAuth roles={["ADMIN", "STAFF"]}>
        <PurchasePage />
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
    path: "/equipment/add",
    Element: () => (
      <RequireAuth roles={["ADMIN", "EquipmentOperator"]}>
        <EquipmentPageAdd />
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
  {
    path: "/users/add",
    Element: () => (
      <RequireAuth roles={["ADMIN"]}>
        <UsersPageAdd />
      </RequireAuth>
    ),
  },
  {
    path: "/my-page/calendar",
    Element: () => (
      <RequireAuth roles={["ADMIN", "EquipmentOperator", "STAFF", "USER"]}>
        <MyPageCalendar />
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
  {
    path: "/page-not-found",
    Element: PageNotFound,
  },
  {
    path: "*",
    Element: PageNotFound,
  },
];

export { AppRoutes };
