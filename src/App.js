import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Topnav from "./components/Topnav";
import Footer from "./components/Footer";
import Vehicles from "./pages/Vehicles";
import VehicleAdd from "./pages/VehicleAdd";
import VehicleView from "./pages/VehicleView";
import CompletedTripList from "./pages/CompletedTripList";
import OngoingTripList from "./pages/OngoingTripList";
import CompletedTripView from "./pages/CompletedTripView";
import OngoingTripView from "./pages/OngoingTripView";
import Login from "./pages/Login";

const Layout = () => {
  return (
    <>
      <Topnav />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/vehicles",
        element: <Vehicles />,
      },
      {
        path: "/vehicles/add-vehicle",
        element: <VehicleAdd />,
      },
      {
        path: "/vehicles/vehicle-view",
        element: <VehicleView />,
      },
      {
        path: "/completed-trips/",
        element: <CompletedTripList />,
      },
      {
        path: "/ongoing-trips",
        element: <OngoingTripList />,
      },
      {
        path: "/completed-trips/:id",
        element: <CompletedTripView />,
      },
      {
        path: "/ongoing-trips/:id",
        element: <OngoingTripView />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
