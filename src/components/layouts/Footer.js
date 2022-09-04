import React, { Fragment } from "react";
import { useNavigate , Link} from "react-router-dom";
import Logo from "../../assests/images/logo.jpg";
import { Label , Table ,Row  } from "reactstrap";

const Footer = () => {

	const navigate = useNavigate();



	return (
		<div>
			<div>

                    <footer class="text-center text-lg-start " style={{color:"white" , backgroundColor:"black"}}>

                    <section class="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">

                        <div class="me-5 d-none d-lg-block">
                        <span>Get connected with us on social networks:</span>
                        </div>

                        <div>
                        <a href="" class="me-4 link-grayish">
                            <i class="fab fa-facebook-f"></i>
                        </a>
                        <a href="" class="me-4 link-grayish">
                            <i class="fab fa-twitter"></i>
                        </a>
                        <a href="" class="me-4 link-grayish">
                            <i class="fab fa-google"></i>
                        </a>
                        <a href="" class="me-4 link-grayish">
                            <i class="fab fa-instagram"></i>
                        </a>
                        <a href="" class="me-4 link-grayish">
                            <i class="fab fa-linkedin"></i>
                        </a>
                        <a href="" class="me-4 link-grayish">
                            <i class="fab fa-github"></i>
                        </a>
                        </div>

                    </section>

                    <section class="">
                        <div class="container text-center text-md-start mt-3">

                        <div class="row mt-6">

                        <div class="col-md-6 col-lg-4 col-xl-4 mx-auto mb-md-0 mb-4" style={{float:"left"}}>

                        <h6 class="text-uppercase fw-bold mb-4">Contact Us</h6>
                        <p><i class="fas fa-home me-3 text-grayish"></i> No 32, Bauddhaloka Mw, Colombo 07</p>
                        <p>
                            <i class="fas fa-envelope me-3 text-grayish"></i>
                            fitnesshub@gmail.com
                        </p>
                        <p><i class="fas fa-phone me-3 text-grayish"></i> + 01 234 567 88</p>
                        <p><i class="fas fa-print me-3 text-grayish"></i> + 01 234 567 89</p>
                        </div>


                        <div class="col-md-6 col-lg-4 col-xl-4 mx-auto mb-8" style={{ marginTop:"60px"}}>
                        FitnessHub© 2021 Copyright:
                                <a class="text-reset fw-bold" href="/">&nbsp;FitnessHub</a>
                        </div>

                            

                        <div class="col-md-8 col-lg-4 col-xl-4 mx-auto mb-4">
                        
                        <table style={{float:"right"}}>
                            <tr>
                                <td style={{float:"right"}}>
                                    <a  href="/">
                                      <img src={Logo} alt="" width="100" height="100" style={{borderRadius:"10px" }}/>
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Label style={{marginLeft:"30px", fontSize:"30px" , color:"white" }}>FitnessHub</Label>
                                </td>
                            </tr>
                        </table>
                        </div>
                    

                          

                        </div>

                        </div>
                    </section>



                 

                    </footer>

                   
                    {/* <div className="container p-4 pb-0" >
                       
                        <section className="mb-4">
                     
                        <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button"
                            ><i className="fab fa-facebook-f"></i
                        ></a>

                      
                        <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button"
                            ><i className="fab fa-twitter"></i
                        ></a>

                      
                        <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button"
                            ><i className="fab fa-google"></i
                        ></a>

                       
                        <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button"
                            ><i className="fab fa-instagram"></i
                        ></a>


                        <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button"
                            ><i className="fab fa-linkedin-in"></i
                        ></a>

            
                        <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button"
                            ><i className="fab fa-github"></i
                        ></a>
                        </section>
                       
                    </div>
                    */}

             
                    {/* <div className="text-center p-3" style={{backgroundcolor:"rgba(0, 0, 0, 0.2)"}}>
                        © 2020 Copyright:
                        <a className="text-white" href="">GYM System</a>
                    </div>
      */}

{/* 
                    <div>
                        <Table >
                            <Row>
                                <td>

                                </td>
                                <td>

                                </td>
                                <td >
                                    <a  href="/">
                                        <img src={Logo} alt="" width="100" height="100" style={{borderRadius:"10px"}}/>
                                        <Label style={{marginLeft:"30px", fontSize:"60px" , color:"white"}}>FitnessHub</Label>
                                    </a>
                                </td>
                            </Row>
                        </Table>
                    </div> */}
			</div>
		</div>
		
	);
};



export default Footer;
