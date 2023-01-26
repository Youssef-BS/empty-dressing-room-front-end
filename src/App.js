import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarSet from "./components/navbar/Navbar";
import Home from "./pages/home/Home"
import Femmes from "./pages/femmes/Femmes"
import Hommes from './pages/hommes/Hommes';
import Enfants from './pages/enfants/Enfants';
import Animaux from './pages/animaux/Animaux';
import Electroniques from './pages/electroniques/Electroniques';
import Maison from './pages/maison/Maison';
import Getprofile from './pages/monProfile/monProfile';
import Footer from './components/footer/footer';
import { createBrowserRouter, RouterProvider, Outlet , Navigate  } from "react-router-dom";
import AddProduits from './pages/addProuits/addProduits';
import React,{useContext} from 'react';
import { AuthContext } from './context/authContext';
function App() {
  const { currentUser } = useContext(AuthContext);
const Layout = () => {
  return (
    <div className="app">
      <NavbarSet />
      <Outlet />
      <Footer />
    </div>
  );
};

const ProtectedRoute = ({ children }) => {
  if (!currentUser) {
    return <Navigate to="/" />;
  }

  return children;
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
      {
        path: "/Enfants",
        element: <Enfants />,
      },
      {
        path: "/Animaux",
        element: <Animaux />,
      },
      {
        path: "/Electroniques",
        element: <Electroniques />,
      },
      {
        path: "/Maison",
        element: <Maison />,
      },
      {
        path:"/AddProduits",
        element :(<ProtectedRoute> 
        <AddProduits />
        </ProtectedRoute>)
        ,
      },
      {
        path:"/monprofile",
        element :(<ProtectedRoute> 
        <Getprofile />
        </ProtectedRoute>)
        ,
      },
    ],
  },
]);


  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}




export default App;
