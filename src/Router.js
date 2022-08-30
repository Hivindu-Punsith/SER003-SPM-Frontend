import { useContext , useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


import AuthContext from "./components/context/Auth.context";

//import Pages
import Footer from "./components/layouts/Footer";
import LandingPage from "./components/layouts/LandingPage";
import NavBar from "./components/layouts/NavBar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/layouts/Dashboard";

//store management
import ViewProducts from "./components/Products/ViewProducts";
import ClientViewProducts from "./components/Products/ClientViewProducts";


const SiteRouter = () => {

  const { Token, userRole , userLogged } = useContext(AuthContext);

  console.log(useContext(AuthContext));

  return (
    <div>
        <Router>
            <NavBar/>	
            <Routes>
              {userLogged ? 
              (
              <>
                <Route path="/" element={<Dashboard/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>

                <Route path="/admin-products" element={<ViewProducts/>}/>
                <Route path="/client-products" element={<ClientViewProducts/>}/>
              
              </>
              )
              :
              (
              <>
                <Route exact path="*" element={<LandingPage/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
              </>
              )
              }
           
               
            </Routes>
            <Footer/>
		</Router>
    </div>
  );
}

export default SiteRouter;
