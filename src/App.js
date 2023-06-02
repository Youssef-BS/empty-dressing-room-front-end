import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarSet from "./components/navbar/Navbar";
import Home from "./pages/home/Home"
import Getprofile from './pages/monProfile/monProfile';
import { createBrowserRouter, RouterProvider, Outlet , Navigate  } from "react-router-dom";
import AddProduits from './pages/ajouterProduit/ajouterProduit';
import React,{useContext , useState} from 'react';
import { AuthContext } from './context/authContext';
import TousProduits from './pages/tousProduits/TousProduits';
import ProduitRegarde from "./pages/produitRegarde/ProduitRegarde";
import Conversation from './components/conversation/Conversation';
import TousTypeProduit from './pages/toustypeproduit/TousTypeProduit';
import ProfileUser from './pages/profileUser/ProfileUser';
import "./app.css";

function App() {
const { currentUser } = useContext(AuthContext)
const [name , setName] = useState("?")
const Layout = () => {
  return (
    <div className="app">
      <NavbarSet />
      <Outlet/>
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
        path: "/profileuser/:id",
        element: <ProfileUser />,
      },
      {
        path: "/getconv/:id",
        element :(
          <ProtectedRoute>
            <Conversation />
          </ProtectedRoute>
        ) ,
      },
      {
        path: "/productWatch/:id",
        element: <ProduitRegarde />,
      },
      {
        path: `/tousproduits/:${name}`,
        element: <TousProduits />,
      },
      {
        path: `/toustypeproduit/:?`,
        element: <TousTypeProduit />,
      },
      {
        path:"/AddProduits",
        element :(<ProtectedRoute> 
        <AddProduits />
        </ProtectedRoute>)
        ,
      },
      {
        path:"/monprofile/:iduser",
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
