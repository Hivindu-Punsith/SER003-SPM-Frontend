import React from "react";
import { useContext } from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import AuthContext from "../context/Auth.context";
import img1 from "../../assests/images/1.jpg"
import img4 from "../../assests/images/1.1.jpg"
import img5 from "../../assests/images/1.2.jpg"
import img6 from "../../assests/images/1.3.jpg"
import Logo from "../../assests/images/logo.jpg";


const LandingPage = () => {

  const { Token, userRole } = useContext(AuthContext);

  return (
    <div>

    <center>
      <div class="row  m-0" style={{padding:"50px", display:Token == undefined ? "flex" : "none"}}>
      <div class="col">
        <Link to="/register" >
                <button className="btn btn-dark" style={{ width:"500px", height:"70px", fontSize:"20px"}}>JOIN WITH US</button>
        </Link>
        </div>
        <div class="col">
        <Link to="/login">
                  <button className="btn btn-dark" style={{ width:"500px", height:"70px", fontSize:"20px"}}>LOGIN</button>
        </Link>
      </div>
    </div>
    </center>

      <div style={{height:"500px", padding:"80px"}}>
      <div className="row m-0">
        <div className="col">
        <div>
          <p style={{ fontSize: "25px", color: "black" }}>
            WE ARE THE BEST
          </p>

          <p style={{ fontSize: "50px", color: "black", fontWeight: "bold" }}>
            WELCOME TO FITNESSHUB
          </p>

          <p>
            IN OUR GLORIOUS, MADDENING COUNTRY, YOUR WORKOUT CAN BE THE
            DIFFERENCE BETWEEN A GOOD DAY AND A BAD ONE
          </p>

          <p>
            WE BELIEVE THAT THE ENVIRONMENT YOU TRAIN IN IS AS IMPORTANT AS THE
            TRAINING ITSELF. FITNESSHUB CHALLENGES THE MONOTONY OF STANDARD
            GYMS WITH UNIQUE FEATURES AND MATERIALS TO MAKE OUR MEMBERS FEEL
            COMFORTABLE AND INSPIRED.
          </p>
          <p>LET US HELP YOU BECOME BETTER.</p>

          <button className="btn btn-danger" style={{height:"45px",width:"150px", borderRadius:"50px", fontWeight:"bold"}}>ABOUT US</button>
        </div>
        </div>
        <div className="col">
        <img src={Logo} alt="" style={{borderRadius:"1000px",float:"right",padding:"20px", width:"60%"}}/>
        </div>
      </div>
      </div>



    <div style={{ width: "100%", marginTop:"50px" }}>
    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
          <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img class="d-block w-100" src={img4} alt="First slide"/>
          </div>
          <div class="carousel-item">
            <img class="d-block w-100" src={img5}  alt="Second slide"/>
          </div>
          <div class="carousel-item">
            <img class="d-block w-100" src={img6}  alt="Third slide"/>
          </div>
        </div>
        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    </div>

    <div style={{height:"400px", backgroundColor:"black"}}>
        <center>

          <div>
            <p style={{ fontSize: "50px", color: "white", fontWeight: "bold", paddingTop:"70px"}}>70% DISCOUNT</p>
          

          <p style={{color: "white", width:"800px"}}>
            WE BELIEVE THAT THE ENVIRONMENT YOU TRAIN IN IS AS IMPORTANT AS THE
            TRAINING ITSELF. FITNESSHUB CHALLENGES THE MONOTONY OF STANDARD
            GYMS WITH UNIQUE FEATURES AND MATERIALS TO MAKE OUR MEMBERS FEEL
            COMFORTABLE AND INSPIRED.
          </p>

          <Button className="btn btn-danger" style={{height:"45px",width:"150px", borderRadius:"50px", fontWeight:"bold"}} href={Token == undefined ? '/login' : userRole == "admin" ? '/admin-products' :'/client-products'}>SHOP NOW</Button>

          </div>
        </center>


      </div>
    
      <div style={{height:"600px",backgroundImage:`url(${img1})`, opacity:"80%"}}>
        
      </div>

     

    </div>
  );
};

export default LandingPage;
