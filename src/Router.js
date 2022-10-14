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
import HandleUsers from "./components/admin/HandleUsers";
import ReqInstructor from "./components/user/ReqInstructor";
import Profile from "./components/auth/Profile";

//store management
import ViewProducts from "./components/Products/ViewProducts";
import ClientViewProducts from "./components/Products/ClientViewProducts";
import AddNewProduct from "./components/Products/AddNewProduct";
import Payment from "./components/Products/Payment";
import ThankPage from "./components/Products/ThankPage";
import Test from "./components/Products/Test";
import Cart from "./components/cart/Cart";
import ViewOrders from "./components/Products/ViewOrders";

//equipments
import ViewAllEquipments from "./components/equipments/ViewAllEquipments";

//memberships
import ViewAllMemberships from "./components/memberships/ViewAllMemberships";
import ViewAllClients from "./components/instructors/ViewAllClients";
import HandleInstructors from "./components/admin/HandleInstructors";
import ClientMemberships from "./components/memberships/ClientMemberships";
import EditProduct from "./components/Products/EditProduct";
import HandlePlans from "./components/instructors/HandlePlans";
import ViewRequests from "./components/instructors/ViewRequests";



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
                <Route path="/" element={<LandingPage/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/admin-products" element={<ViewProducts/>}/>
                <Route path="/client-products" element={<ClientViewProducts/>}/>
                <Route path="/add-new-product" element={<AddNewProduct/>}/>         
                <Route path="/edit-product/:id" element={<EditProduct/>}/>      
                <Route path="/users" element={<HandleUsers/>}/>
                <Route path="/req-instructor" element={<ReqInstructor/>}/>
                <Route path="/equipments" element={<ViewAllEquipments/>}/>
                <Route path="/memberships" element={<ViewAllMemberships/>}/>
                <Route path="/client-memberships" element={<ClientMemberships/>}/>
                <Route path="/clients" element={<ViewAllClients/>}/>
                <Route path="/instructor-requests/:id" element={<ViewRequests/>}/>
                <Route path="/clients/:id" element={<HandlePlans/>}/>
                <Route path="/instructors" element={<HandleInstructors/>}/>
               

                <Route path="/profile" element={<Profile/>}/>

                <Route path="/payment" element={<Payment/>}/>
                <Route path="/thankyou" element={<ThankPage/>}/>
                <Route path="/report-test" element={<Test/>}/>
                <Route path="/cart-table" element={<Cart/>}/>
                <Route path="/orders" element={<ViewOrders/>}/>

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
