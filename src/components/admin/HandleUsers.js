import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import {
    Badge,
    Card,
    CardHeader,
    CardTitle,
    CardBody,
    Label,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Input,
    Form
} from "reactstrap";
import moment from 'moment';
import Swal from 'sweetalert2';
import { ValidateAddNewUser } from "./Validation";
import { GetAllUserDetails , AddNewUsers } from "../../services/UserServices";

const HandleUsers = () => {
    const navigate = useNavigate();

    const [UserDetails, setUserDetails] = useState({});
    const [loading, setLoading] = useState(false);
    const [openModal, setopenModal] = useState(false);
    const [fullName, setfullName] = useState("");
    const [email, setemail] = useState("");
    const [mobileno, setmobileno] = useState("+94");
    const [dateOfBirth, setdateOfBirth] = useState("");
    const [weight, setweight] = useState("");
    const [height, setheight] = useState("");


    const handlefullName = (e) => {
        e.preventDefault();
        setfullName(e.target.value)
    }

    const handleemail = (e) => {
        e.preventDefault();
        setemail(e.target.value)
    }

    const handlemobileno = (e) => {
        e.preventDefault();
        setmobileno(e.target.value)
    }
    const handledateOfBirth = (e) => {
        e.preventDefault();
        setdateOfBirth(e.target.value)
    }
    const handleweight = (e) => {
        e.preventDefault();
        setweight(e.target.value)
    }
    const handleheight = (e) => {
        e.preventDefault();
        setheight(e.target.value)
    }


    const addUser = async (e) => {

        e.preventDefault();

        const regdata = {

            fullName: fullName,
            email: email,
            mobileno: mobileno,
            dateOfBirth: dateOfBirth,
            weight: weight,
            height: height

        }
        let validate = ValidateAddNewUser(regdata);

        if (validate.status == false) {
            alert(validate.message);
        }
        else {
            console.log("sending data", regdata);
            let data = await AddNewUsers(regdata);
            console.log(" user data ", data);
            if (data?.data?.status === 1) {
                Swal.fire({
                    icon: 'success',
                    title: 'Successful!',
                    text: 'New user added success!',
                })
                setopenModal(false);
                GetUsers();
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Failed!',
                })
            }
        }

    }

    const GetUsers = async () => {
        try {
            setLoading(true);

            let data = await GetAllUserDetails();

            console.log("all Products", data);
            let newData = data?.data?.data?.users?.map((item) => {
                return {
                    gym_id:item?.gym_id,
                    fullName: item?.fullName,
                    email: item?.email,
                    mobileno: item?.mobileno,
                    dateOfBirth: item?.dateOfBirth,
                    weight: item?.weight,
                    height:item?.height,
                    memberShip:item?.memberShip,
                    createdAt:item?.createdAt,
                    updatedAt:item?.updatedAt,
                    status:item?.status,
                    _id: item?._id,
                }
            })

            setUserDetails(newData);
            setLoading(false);

        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        GetUsers();
    }, [])

    
    const columns = [
        {
            name: (<Badge color="dark" style={{ fontSize: "18px" }} >Gym ID</Badge>),
            selector: "gym_id",
            cell: (data) => (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Label style={{ fontSize: "18px" }}><b>{data?.gym_id}</b><br /></Label>
                </div>
            ),
        },
        {
            name: (<Badge color="dark" style={{ fontSize: "18px" }} >Full Name</Badge>),
            selector: "fullName",
            cell: (data) => (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Label style={{ fontSize: "18px" }}><b>{data?.fullName}</b><br /></Label>
                </div>
            ),
        },
        {
            name: (<Badge color="dark" style={{ fontSize: "18px" }} >Email</Badge>),
            selector: "email",
            cell: (data) => (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Label style={{ fontSize: "18px" }}><b>{data?.email}</b><br /></Label>
                </div>
            ),
        },
        {
            name: (<Badge color="dark" style={{ fontSize: "18px" }} >dateOfBirth</Badge>),
            selector: "dateOfBirth",
            cell: (data) => (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Label style={{ fontSize: "18px" }}><b>{moment(data?.dateOfBirth).format(" YYYY-MM-DD ")}</b><br /></Label>
                </div>
            ),
        },
        {
            name: (<Badge color="dark" style={{ fontSize: "18px" }} >Weight</Badge>),
            selector: "weight",
            cell: (data) => (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Label style={{ fontSize: "18px" }}><b>{data?.weight}</b><br /></Label>
                </div>
            ),
        },
        {
            name: (<Badge color="dark" style={{ fontSize: "18px" }} >Height</Badge>),
            selector: "height",
            cell: (data) => (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Label style={{ fontSize: "18px" }}><b>{data?.height}</b><br /></Label>
                </div>
            ),
        },
        {
            name: (<Badge color="dark" style={{ fontSize: "18px" }} >Member Ship</Badge>),
            selector: "memberShip",
            cell: (data) => (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Label style={{ fontSize: "18px" }}><b>{data?.memberShip == null ? "No Membership" : data?.memberShip}</b><br /></Label>
                </div>
            ),
        },
        {
            name: (<Badge color="dark" style={{ fontSize: "18px" }} >Status</Badge>),
            selector: "status",
            cell: (data) => (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Label style={{ fontSize: "18px" }}><b>{data?.status == null ? "No Status" : data?.status}</b><br /></Label>
                </div>
            ),
        },
        {
            name: (<Badge color="dark" style={{ fontSize: "18px" }} >created At</Badge>),
            selector: "createdAt",
            cell: (data) => (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Label style={{ fontSize: "18px" }}><b>{moment(data?.createdAt).format(" YYYY-MM-DD ")}</b><br /></Label>
                </div>
            ),
        },
        {
            name: (<Badge color="dark" style={{ fontSize: "18px" }} >updated At</Badge>),
            selector: "updatedAt",
            cell: (data) => (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Label style={{ fontSize: "18px" }}><b>{moment(data?.updatedAt).format(" YYYY-MM-DD ")}</b><br /></Label>
                </div>
            ),
        },
        // {
        //     name: (<Badge color="dark" style={{ fontSize: "18px" }} >User Update</Badge>),
      
        //     cell: (data) => (
        //       <div style={{ display: "flex", flexDirection: "column" }}>
        //         {/* <Link to={`/updateSub/${data?._id}`}> */}
        //         <Button 
        //             className="btn btn-warning" style={{ fontSize: "16px" }}  ><i class="fa-solid fa-pen-to-square"></i>&nbsp;Update</Button>
        //         {/* </Link> */}
        //       </div>
      
        //     ),
        //   },
      
        //   {
        //     name: (<Badge color="dark" style={{ fontSize: "18px" }} >User Delete</Badge>),
      
        //     cell: (data) => (
        //       <div style={{ display: "flex", flexDirection: "column" }}>
        //         <Button className="btn btn-danger" style={{ fontSize: "16px" }} ><i class="fa-solid fa-trash-can"></i>&nbsp;<b>Delete</b></Button>
        //       </div>
      
        //     ),
        //   },






    ];


    return (
        <div style={{ marginTop: "70px", marginBottom: "70px" }}>
            <div style={{ margin: "10px" }}>
                <Card>
                    <CardHeader>
                        <center>
                        <CardTitle style={{ color: "black", fontSize: "30px", float:"left" }}><b>All Users</b></CardTitle>
                        {/* <Button className="btn btn-dark" style={{ fontSize: "15px"}} ><i class="fa-solid fa-print"></i><b> </b></Button> */}
                        <Button className="btn btn-dark" style={{ fontSize: "15px", marginLeft: "83%" }}  onClick={() => setopenModal(true)}><i class="fa-solid fa-circle-plus"></i>&nbsp;<b>Add New User</b></Button>
                        </center>
                    </CardHeader>
                    <CardBody>
                        <DataTable
                            data={UserDetails}
                            columns={columns}

                            progressPending={loading}

                        />
                    </CardBody>
                </Card>
                <div>
                    <Modal
                        isOpen={openModal}
                        className="modal-dialog-centered"
                        fade={true}
                        backdrop={true}>
                        <ModalHeader
                            toggle={() => {
                                setopenModal(false);
                            }}>
                            <Label>Add New User</Label>
                        </ModalHeader>
                        <ModalBody>
                            <div style={{ width: "400px" }}>
                                <Form>
                                    <Label>Full Name </Label>
                                    <Input type="text" className="input" placeholder="Full Name" value={fullName} onChange={(e) => handlefullName(e)} />
                                    <br />

                                    <Label>Email</Label>
                                    <Input type="email" className="input" placeholder="Email" value={email} onChange={(e) => handleemail(e)} />
                                    <br />

                                    <Label>Contact Number</Label>
                                    <Input type="text" className="input" placeholder="Contact Number" value={mobileno} onChange={(e) => handlemobileno(e)} />
                                    <br />

                                    <Label>Date of Birth</Label>
                                    <Input type="date" className="input" placeholder="dateOfBirth" value={dateOfBirth} onChange={(e) => handledateOfBirth(e)} />
                                    <br />                                  

                                    <Label>Weight</Label>
                                    <Input type="text" className="input" placeholder="Weight example : 65 " value={weight} onChange={(e) => handleweight(e)} />
                                    <br />

                                    <Label>Height</Label>
                                    <Input type="text" className="input" placeholder="Height example : 5' 5''" value={height} onChange={(e) => handleheight(e)} />
                                    <br />

                                    <Button  className="btn btn-dark" onClick={(e) => addUser(e)}>Add new User</Button>

                                </Form>
                            </div>
                        </ModalBody>
                    </Modal>
                </div>
            </div>

        </div>

    );
};

export default HandleUsers;
