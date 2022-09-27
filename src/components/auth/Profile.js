import React ,{ useContext , useState , useEffect } from "react";
import { useNavigate} from "react-router-dom";
import { Auth, RegisterUsers } from "../../services/AuthServices";
import AuthContext from "../context/Auth.context";
import {
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Form,
    Input,
    Button,
} from "reactstrap";
import UserImage from "../../assests/images/user.png";
import Swal from 'sweetalert2';
import { ValidateSignUp } from "./Validation";
import "./responsive.css";
import moment from "moment";
import { updateInstructor } from "../../services/InstructorServices";
import { updateUser } from "../../services/UserServices";
import { updateAdmin } from "../../services/AuthServices";

const Profile = () => {

  const navigate = useNavigate();

  const { Token, userRole } = useContext(AuthContext);

  const [user , setUser] = useState({});



  const getUser = async () => {
    const data = await Auth(Token);
    console.log(data?.data?.data?.user);
    setUser(data?.data?.data?.user);
    setFormData({
        fullName: data?.data?.data?.user?.fullName,
        email: data?.data?.data?.user?.email,
        password: data?.data?.data?.user?.password,
        weight:data?.data?.data?.user?.weight,
        dateOfBirth:moment(data?.data?.data?.user?.dateOfBirth).format("YYYY-MM-DD"),
        height:data?.data?.data?.user?.height,
        mobileno:data?.data?.data?.user?.mobileno
    });
  }

  useEffect(() => {
    if(userRole == "user")
    {
        setshowUser(true);
    }
    if(userRole == "admin")
    {
        setshowAdminUser(true);
    }
    if(userRole == "instructor")
    {
        setshowInstructorUser(true);
    }
    getUser();
  },[]);

  //show different modals
  const [showAdminUser, setshowAdminUser] = useState(false);
  const [showInstructorUser, setshowInstructorUser] = useState(false);
  const [showUser, setshowUser] = useState(false);


  const [updateChange, setUpdaetChange] = useState(false);
  const ChangetoUpdate = (e) => {
    e.preventDefault();
    setUpdaetChange(true);
  };

  const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        weight:"",
        dateOfBirth:"",
        height:"",
        mobileno:"+94"
    });

    const { fullName, email, weight , dateOfBirth ,height , mobileno  } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const UpdateData = async (e) => {

		e.preventDefault();

		let validate = ValidateSignUp(formData);
		let msg = validate?.message;
		if(validate.status == false)
		{
			Swal.fire({
                toast: true,
                icon: 'warning',
                html: `<span>${msg}</span>`,
                animation: true,
                position: 'top-right',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: false,
            });
		}

		else{
                var data;

                if(userRole == "user")
                {
                    data = await updateUser(user._id,formData);
                }
                if(userRole == "admin")
                {
                    data = await updateAdmin(user._id,formData);
                }
                if(userRole == "instructor")
                {
                    data = await updateInstructor(user._id,formData);
                }
                console.log("data",data)
                if(data?.data?.status == 1)
                {
                Swal.fire({
                    icon: 'success',
                    title: 'Congrats!',
                    text: 'Update successfull...!',
                    })
                navigate("/profile");
                window.location.reload();
                }
                else
                {
                    Swal.fire({
                        icon: 'error',
                        title: 'Update Failed..!',
                        text: `${data?.data?.message}`,
                    })
                }
			}
	};


  return (
    <div style={{ marginTop: "70px", marginBottom: "70px" }}>
        <center>
            <h1 style={{fontSize:"40px" , marginBottom: "30px" , color:"red"}}><b>{user?.fullName}'s Profile</b></h1>

                <div>
                    <Card id="responsiveCard">
                    <CardBody>
                    <img src={UserImage} style={{ width: 200, padding:'10px'}}></img>
                        <div style={{ width: "600px" }}>
                        <Form className="form">
				        <div className="form-group">
                            <input
                                id='responsiveProfile'
                                className="form-control"
                                type="text"
                                placeholder="Name"
                                name="fullName"
                                value={fullName}
                                onChange={(e) => onChange(e)}
                                readOnly={!updateChange ? true : false}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                id='responsiveProfile'
                                className="form-control"
                                type="email"
                                placeholder="Email Address"
                                name="email"
                                value={email}
                                onChange={(e) => onChange(e)}
                                readOnly={!updateChange ? true : false}
                            />
                        </div>
                        {/* <div className="form-group">
                            <input
                                id='responsiveProfile'
                                className="form-control"
                                type="password"
                                placeholder="Password"
                                name="password"
                                minLength="6"
                                value={password}
                                onChange={(e) => onChange(e)}
                                readOnly={!updateChange ? true : false}
                            />
                        </div> */}
                        <div className="form-group">
                            <input
                                id='responsiveProfile'
                                className="form-control"
                                type="text"
                                placeholder="Mobile no"
                                name="mobileno"
                                value={mobileno}
                                onChange={(e) => onChange(e)}
                                readOnly={!updateChange ? true : false}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                style={{display: userRole == "admin" ? "none" : "inline"}}
                                id='responsiveProfile'
                                className="form-control"
                                type="text"
                                placeholder="Weight"
                                name="weight"
                                value={weight}
                                onChange={(e) => onChange(e)}
                                readOnly={!updateChange ? true : false}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                style={{display: userRole == "admin" ? "none" : "inline"}}
                                id='responsiveProfile'
                                className="form-control"
                                type="text"
                                placeholder="Height example: "
                                name="height"
                                value={height}
                                onChange={(e) => onChange(e)}
                                readOnly={!updateChange ? true : false}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                id='responsiveProfile'
                                className="form-control"
                                type="date"
                                placeholder="Date of Birth"
                                name="dateOfBirth"
                                value={dateOfBirth}
                                onChange={(e) => onChange(e)}
                                readOnly={!updateChange ? true : false}
                            />
                        </div>
                            <br />
                            <Button
                            color="primary"
                            onClick={(e) => ChangetoUpdate(e)}
                            style={{ display: updateChange ? "none" : "flex" }}
                            >
                            Click To Update
                            </Button>
                            <Button
                            className="btn btn-success"
                            onClick={(e) => UpdateData(e)}
                            style={{ display: updateChange ? "flex" : "none" }}
                            >
                            Update
                            </Button>
                        </Form>
                        </div>
                    </CardBody>
                    </Card>  

                </div>
        </center>

            <div style={{display : showAdminUser ? "flex" : "none"}}>
            <h1>Admin</h1>
            </div>

            <div style={{display : showInstructorUser ? "flex" : "none"}}>
            <h1>Instructor</h1>
            </div>

            <div style={{display : showUser ? "flex" : "none" , width:"100%"}} >
            <h1>User</h1>
            </div>
    </div>
  );
}

export default Profile;