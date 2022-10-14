import { useContext } from "react";
import { useNavigate , Link} from "react-router-dom";
import { Label , Button } from "reactstrap";
import Logo from "../../assests/images/logo.jpg";
import AuthContext from "../context/Auth.context";

const NavBar = ()=> {

  const navigate = useNavigate();

  const { Token, userRole } = useContext(AuthContext);

  const instructor_id = localStorage.getItem("_id");

  console.log("insss",instructor_id);
  const handleSubmit = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("user");
    localStorage.removeItem("userID");
    window.location.reload();
    navigate("/");
  }

  return (
    <div>
        <div>
        <div>
          <nav class="navbar navbar-dark bg-dark">
            <div class="container-fluid">
                <a  href="/">
                  <img src={Logo} alt="" width="80" height="80" style={{borderRadius:"20px",float:"left"}}/>
                  <Label style={{marginLeft:"30px", fontSize:"50px" , color:"white", fontWeight: "bold"}}>FitnessHub</Label>
                </a>
                <table style={{float:"right"}}>
                  <row>
                    <td>
                      <Link to="/register">
                        {/* <Button className="btn btn-warning" type="submit" style={{  display:Token == undefined ? "flex" : "none", textDecoration:"none"}}>
                         {"Register"}
                        </Button> */}
                      </Link>
                    </td>
                    <td>
                      <Link to="/login">
                        {/* <Button className="btn btn-secondary" type="submit" style={{  display:Token == undefined ? "flex" : "none", marginLeft:"20px" , textDecoration:"none"}}>
                         {"Login"}
                        </Button> */}
                      </Link>
                    </td>
                    <td>
                      <Button onClick={handleSubmit} className="btn btn-dark" type="submit" style={{  display:Token == undefined ? "none" : "flex" , textDecoration:"none",backgroundColor:'black'}}>
                       <b> {"Logout"}</b>
                      </Button>
                    </td>
                    <td>
                      <Button  className="btn btn-dark" type="submit" href="/profile" style={{ display: Token == undefined ? "none" : "flex" , marginLeft:"20px" , textDecoration:"none",backgroundColor:'black'}}>
                        <b>Profile</b>
                      </Button>
                    </td>
                  </row>
                </table>
                
            </div>
          </nav>
        </div>
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark"  style={{ height:"50px", display: Token == undefined ? "none" : "flex" , textDecoration:"none"}}>
       
          <div className="container-fluid">
            {/* <a className="navbar-brand" href="/" style={{color:"red", marginLeft:"50px", fontFamily: "Monospace"}}>Home</a> */}
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">

                {/* User pages */}
                <a style={{ display: userRole == "user" ? "flex" : "none" , textDecoration:"none" , color:"red", marginLeft:"50px", fontFamily: "Monospace"}} className="navbar-brand" aria-current="page" href="/client-products">Store</a>
                {/* <a style={{ display: userRole == "user" ? "flex" : "none" , textDecoration:"none" , color:"red"}} className="navbar-brand" aria-current="page" href="/equipments">Equipment</a> */}
                <a style={{ display: userRole == "user" ? "flex" : "none" , textDecoration:"none" , color:"red", marginLeft:"50px", fontFamily: "Monospace"}} className="navbar-brand" aria-current="page" href="/client-memberships">Memberships</a>
                {/* <a style={{ display: userRole == "user" ? "flex" : "none" , textDecoration:"none" , color:"red", marginLeft:"50px", fontFamily: "Monospace"}} className="navbar-brand" aria-current="page" href="/workout-plans">Workout Plans</a> */}
                <a style={{ display: userRole == "user" ? "flex" : "none" , textDecoration:"none" , color:"red", marginLeft:"50px", fontFamily: "Monospace"}} className="navbar-brand" aria-current="page" href="/req-instructor">Request Instructor</a>
                

                {/* Instructor pages */}
                {/* <a style={{ display: userRole == "instructor" ? "flex" : "none" , textDecoration:"none" , color:"red", marginLeft:"50px", fontFamily: "Monospace"}} className="navbar-brand" aria-current="page" href="/clients">Members</a> */}
                <a style={{ display: userRole == "instructor" ? "flex" : "none" , textDecoration:"none" , color:"red", marginLeft:"50px", fontFamily: "Monospace"}} className="navbar-brand" aria-current="page" href={`/instructor-requests/${instructor_id}`}>My Members</a>
                <a style={{ display: userRole == "instructor" ? "flex" : "none" , textDecoration:"none" , color:"red", marginLeft:"50px", fontFamily: "Monospace"}} className="navbar-brand" aria-current="page" href="/client-products">Store</a>


                {/* admin pages */}                
                <a style={{ display: userRole == "admin" ? "flex" : "none" , textDecoration:"none" , color:"red", marginLeft:"50px", fontFamily: "Monospace"}} className="navbar-brand" aria-current="page" href="/users">Users</a>
                <a style={{ display: userRole == "admin" ? "flex" : "none" , textDecoration:"none" , color:"red", marginLeft:"50px", fontFamily: "Monospace"}} className="navbar-brand" aria-current="page" href="/admin-products">Store</a>
                <a style={{ display: userRole == "admin" ? "flex" : "none" , textDecoration:"none" , color:"red", marginLeft:"50px", fontFamily: "Monospace"}} className="navbar-brand" aria-current="page" href="/memberships">Memberships</a>
                <a style={{ display: userRole == "admin" ? "flex" : "none" , textDecoration:"none" , color:"red", marginLeft:"50px", fontFamily: "Monospace"}} className="navbar-brand" aria-current="page" href="/equipments">Equipments</a>
                <a style={{ display: userRole == "admin" ? "flex" : "none" , textDecoration:"none" , color:"red", marginLeft:"50px", fontFamily: "Monospace"}} className="navbar-brand" aria-current="page" href="/instructors">Instructors</a>
                <a style={{ display: userRole == "admin" ? "flex" : "none" , textDecoration:"none" , color:"red", marginLeft:"50px", fontFamily: "Monospace"}} className="navbar-brand" aria-current="page" href="/orders">Order Details</a>


              </div>
            </div>
          </div>  
        </nav>
			</div>
    </div>
  )
}

export default NavBar