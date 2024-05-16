// ESSENTIAL
import Layout from "./Layout";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { AppRoutes } from "./Components/Routes";

const allRoutes = [...AppRoutes];

function App() {
  return (
    <Layout>
      <Routes>
        {allRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={<route.Element />} />
        ))}
      </Routes>
    </Layout>
  );
}

export default App;
