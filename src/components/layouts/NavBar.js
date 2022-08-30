import { useContext } from "react";
import { useNavigate , Link} from "react-router-dom";
import { Label , Button } from "reactstrap";
import Logo from "../../assests/images/logo.jpg";
import AuthContext from "../context/Auth.context";

const NavBar = ()=> {

  const navigate = useNavigate();

  const { Token, userRole } = useContext(AuthContext);

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
                  <img src={Logo} alt="" width="100" height="100" style={{borderRadius:"10px"}}/>
                  <Label style={{marginLeft:"30px", fontSize:"60px" , color:"white"}}>Fitness Hub</Label>
                </a>
                <table style={{float:"right"}}>
                  <row>
                    <td>
                      <Link to="/register">
                        <Button className="btn btn-warning" type="submit" style={{  display:Token == undefined ? "flex" : "none", textDecoration:"none"}}>
                         {"Register"}
                        </Button>
                      </Link>
                    </td>
                    <td>
                      <Link to="/login">
                        <Button className="btn btn-secondary" type="submit" style={{  display:Token == undefined ? "flex" : "none", marginLeft:"20px" , textDecoration:"none"}}>
                         {"Login"}
                        </Button>
                      </Link>
                    </td>
                    <td>
                      <Button onClick={handleSubmit} className="btn btn-secondary" type="submit" style={{  display:Token == undefined ? "none" : "flex" , textDecoration:"none"}}>
                        {"Logout"}
                      </Button>
                    </td>
                    <td>
                      <Button  className="btn btn-secondary" type="submit" href="/profile" style={{ display: Token == undefined ? "none" : "flex" , marginLeft:"20px" , textDecoration:"none"}}>
                        Profile
                      </Button>
                    </td>
                  </row>
                </table>
                
            </div>
          </nav>
        </div>
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
       
          <div className="container-fluid">
            <a className="navbar-brand" href="/" style={{color:"red"}}>Home</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">

                {/* User pages */}
                <a style={{ display: userRole == "user" ? "flex" : "none" , textDecoration:"none" , color:"red"}} className="navbar-brand" aria-current="page" href="/admin-products">Store</a>
                <a style={{ display: userRole == "user" ? "flex" : "none" , textDecoration:"none" , color:"red"}} className="navbar-brand" aria-current="page" href="/equipment">Equipment</a>
                <a style={{ display: userRole == "user" ? "flex" : "none" , textDecoration:"none" , color:"red"}} className="navbar-brand" aria-current="page" href="/memberships">Memberships</a>
                <a style={{ display: userRole == "user" ? "flex" : "none" , textDecoration:"none" , color:"red"}} className="navbar-brand" aria-current="page" href="/workout-plans">Workout Plans</a>
                <a style={{ display: userRole == "user" ? "flex" : "none" , textDecoration:"none" , color:"red"}} className="navbar-brand" aria-current="page" href="/req-instructor">Request Instructor</a>

                {/* Instructor pages */}
                <a style={{ display: userRole == "instructor" ? "flex" : "none" , textDecoration:"none" , color:"red"}} className="navbar-brand" aria-current="page" href="/members">Members</a>
                <a style={{ display: userRole == "instructor" ? "flex" : "none" , textDecoration:"none" , color:"red"}} className="navbar-brand" aria-current="page" href="/instructor-requests">Instructor Requests</a>
                <a style={{ display: userRole == "instructor" ? "flex" : "none" , textDecoration:"none" , color:"red"}} className="navbar-brand" aria-current="page" href="/equipment">Equipment</a>
                <a style={{ display: userRole == "instructor" ? "flex" : "none" , textDecoration:"none" , color:"red"}} className="navbar-brand" aria-current="page" href="/admin-products">Store</a>


                {/* admin pages */}                
                <a style={{ display: userRole == "admin" ? "flex" : "none" , textDecoration:"none" , color:"red"}} className="navbar-brand" aria-current="page" href="/users">Users</a>
                <a style={{ display: userRole == "admin" ? "flex" : "none" , textDecoration:"none" , color:"red"}} className="navbar-brand" aria-current="page" href="/admin-products">Store</a>
                <a style={{ display: userRole == "admin" ? "flex" : "none" , textDecoration:"none" , color:"red"}} className="navbar-brand" aria-current="page" href="/memberships">Memberships</a>
                <a style={{ display: userRole == "admin" ? "flex" : "none" , textDecoration:"none" , color:"red"}} className="navbar-brand" aria-current="page" href="/equipment">Equipment</a>



              </div>
            </div>
          </div>  
        </nav>
			</div>
    </div>
  )
}

export default NavBar