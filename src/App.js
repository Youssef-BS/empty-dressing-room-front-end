import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarSet from "./components/navbar/Navbar";
import Home from "./pages/home/Home"
import Femmes from "./pages/femmes/Femmes"
import Hommes from './pages/hommes/Hommes';
import { Children } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <div className="app">
      <NavbarSet />
      <Outlet />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/Femmes",
        element: <Femmes />,
      },
      {
        path: "/Hommes",
        element: <Hommes />,
      },
    ],
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}




export default App;
