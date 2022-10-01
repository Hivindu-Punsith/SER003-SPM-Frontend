import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import {
    Badge,
    Card,
    CardHeader,
    CardTitle,
    CardBody,
    CardText,
    CardImg,
    Label,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Input,
    Col,
    Row,
    Container,
    Form
} from "reactstrap";
import moment from 'moment';
import Swal from 'sweetalert2';
import { ValidateAddNewMembership } from "./Validation";
import { createMembership , getAllMemberships } from "../../services/MembershipServices";
import membershipImage from "../../assests/images/membership.png";
import { Auth } from "../../services/AuthServices";
import { UpdateUsermemberShip } from "../../services/UserServices";

const ClientMemberships = () => {
    const navigate = useNavigate();

    const [MembershipDetails, setMembershipDetails] = useState([]);
    const [UserDetails, setUserDetails] = useState({});
    const [loading, setLoading] = useState(false);
    const [openModal, setopenModal] = useState(false);


    const UpdateMembership = async (e) => {

        e.preventDefault();
            const alldata ={
                memberShip:selectedmemberShip?.name
            }
            let data = await UpdateUsermemberShip(UserDetails?.gym_id,alldata);
            if (data?.data?.status === 1) {
                Swal.fire({
                    icon: 'success',
                    title: 'Successful!',
                    text: 'Membership Updated success!',
                })
                setopenModal(false);
                GetMemberships();
                getUserDetails();
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Failed!',
                })
            }

    }

    const getUserDetails = async ()=>{
        let data = await Auth(localStorage.getItem("token"));
        setUserDetails(data?.data?.data?.user);
    }

    const GetMemberships = async () => {
        try {
            setLoading(true);

            let data = await getAllMemberships();

            console.log("Membership Data",data);

            let newData = data?.data?.data?.memberships?.map((item) => {
                return {
                    name:item?.name,
                    price: item?.price,
                    duration: item?.duration,
                    description: item?.description,
                }
            })

            setMembershipDetails(newData);
            setLoading(false);

        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        getUserDetails();
        GetMemberships();
    },[])

    const [selectedmemberShip, setselectedmemberShip] = useState({});

    const selectMemberShip = async (e, data) => {
        e.preventDefault();
        setselectedmemberShip(data);
        setopenModal(true);

    }


    return (
        <div style={{ marginTop: "70px", marginBottom: "70px" }}>
            <div style={{ margin: "10px" }}>
                <div>
                    <center>
                        <CardText style={{color:"Black" , fontSize:"30px"}}>
                            <h2 style={{ color: "black", fontSize: "30px" }} class="animate-charcter"><b>YOUR CURRENT MEMBERSHIP</b></h2><br/>

                           <p style={{fontSize:'40px',textTransform: 'uppercase'}}>{UserDetails?.memberShip !== null ? UserDetails?.memberShip : "No Membership yet"}</p> 
                        </CardText>
                    </center>
                </div>
                <div>
                    <Container>
                        <Row xs={4}>
                            {MembershipDetails?.map((item) => {
                                return (
                                <Col style={{ padding: "10px" }}>
                                    <Card >
                                    <CardHeader>
                                        <CardTitle style={{ color: "black", fontSize: "40px" }}>
                                        <center>
                                            <b style={{color:`${item?.name == "Gold" ? "#f7ef02" : item?.name == "Silver" ? "#787675" : item?.name == "Bronze" ? "#e67a53" : "#E5E4E2"}`,textTransform: 'uppercase'}}>
                                                {item.name}
                                            </b>
                                        </center>
                                        </CardTitle>
                                        <center>
                                        <CardImg
                                            width="100%"
                                            src={membershipImage}
                                            alt="User Img"
                                            style={{ width: "250px" }}
                                        />
                                        </center>
                                    </CardHeader>
                                    <CardBody>
                                        <Row><Col>  <CardText><b> Type </b> </CardText></Col> <Col> {item.name}</Col></Row>
                                        <Row><Col>  <CardText><b> Price </b> </CardText></Col> <Col>Rs.{item.price}.00</Col></Row>
                                        <Row><Col>  <CardText><b> Duration </b> </CardText></Col> <Col>{item.duration}</Col></Row>
                                        <Row><Col>  <CardText><b> Description </b> </CardText></Col> <Col>{item.description}</Col></Row>

                                        <br/>
                                        <center>
                                        <Button
                                        className="btn btn-dark"
                                        style={{ marginRight: "20px" }}
                                        onClick={(e)=>selectMemberShip(e,item)}
                                        >
                                        Update Membership
                                        </Button>
                                        </center>
                                      

                                    </CardBody>
                                    </Card>
                                </Col>
                                );
                            })}
                            </Row>
                        </Container>
                    </div>
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
                            <Label>Selected Membership</Label>
                        </ModalHeader>
                        <ModalBody>
                            <div style={{ width: "400px" }}>
                                <CardText><b>Membership Type -:</b> {selectedmemberShip.name}</CardText>
                                <CardText><b>Membership Price -:</b> {selectedmemberShip.price}</CardText>
                                <CardText><b>Membership Duration -:</b> {selectedmemberShip.duration}kg</CardText>
                                <CardText><b>Membership Description -:</b> {selectedmemberShip.description}feet</CardText>
                                <Form>
                                    <Label>Full Name</Label>
                                    <Input type="text" className="input" value={UserDetails?.fullName} readOnly />
                                    <br />

                                    <Label>Email</Label>
                                    <Input type="email" className="input" value={UserDetails?.email} readOnly />
                                    <br />                          

                                    <Button  className="btn btn-dark" onClick={(e) => UpdateMembership(e)}>Update Membership</Button>

                                </Form>
                            </div>
                        </ModalBody>
                    </Modal>
                </div>
            </div>

        </div>

    );
};

export default ClientMemberships;