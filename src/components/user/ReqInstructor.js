import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  Form,
  Row,
  Col,
  CardImg,
  Container,
  CardText,
} from "reactstrap";
import userImg from "../../assests/images/user.png";
import Swal from "sweetalert2";
import { getAllInstructors } from "../../services/InstructorServices";
import { UpdateUserInstructor } from "../../services/UserServices";
import moment from "moment/moment";

const ReqInstructor = () => {
  const navigate = useNavigate();

  const [InstructorDetails, setInstructorDetails] = useState([]);



  const GetInstructors = async () => {
    try {
      let data = await getAllInstructors();
      let newData = data?.data?.data?.instructors?.map((item) => {
        return {
          instructor_id: item?.instructor_id,
          fullName: item?.fullName,
          email: item?.email,
          mobileno: item?.mobileno,
          weight: item?.weight,
          height: item?.height,
          createdAt: item?.createdAt,
          status: item?.status,
          _id: item?._id,
        };
      });
      setInstructorDetails(newData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetInstructors();
  }, []);

  const [openModal, setopenModal] = useState(false);
  const [SelectedInstructor, setSelectedInstructor] = useState({});

  const OpenModalAndSetData = (e,instructor) => {
    e.preventDefault();
    setSelectedInstructor(instructor);
    setopenModal(true);
  }

  const requestInstructor = async (e)=>{
    e.preventDefault();
    const UserUpdatedData = {
      instructor : SelectedInstructor?._id,
    }
    let data = await UpdateUserInstructor(localStorage.getItem("userID"),UserUpdatedData);
    console.log("data",data);
    if (data?.data?.status === 1) {
      Swal.fire({
          icon: 'success',
          title: 'Successful!',
          text: 'Instructor Updated success!',
      })
      GetInstructors();
      setopenModal(false);
    }
    else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Failed!',
        })
    }
  }

  return (
    <div style={{ marginTop: "70px", marginBottom: "70px" }}>
      <div>
           <h2 style={{ color: "black", fontSize: "30px" }}><b>Request an Instructor</b></h2>
      </div>
      <br/>
      <Container>
        <Row xs={3}>
          {InstructorDetails?.map((Instructor) => {
            return (
              <Col style={{ padding: "10px" }}>
                <Card>
                  <CardHeader>
                    <CardTitle style={{ color: "black", fontSize: "40px" }}>
                      <center>
                        <b>{Instructor.fullName}</b>
                      </center>
                    </CardTitle>
                    <center>
                      <CardImg
                        width="100%"
                        src={userImg}
                        alt="User Img"
                        style={{ width: "250px" }}
                      />
                    </center>
                  </CardHeader>
                  <CardBody>
                    <CardText>Instructor Email -: {Instructor.email}</CardText>
                    <CardText>Instructor Mobile -: {Instructor.mobileno}</CardText>
                    <CardText>Instructor Weight -: {Instructor.weight}kg</CardText>
                    <CardText>Instructor Height -: {Instructor.height}feet</CardText>
                    <Button
                      style={{ marginRight: "20px" }}
                      className="btn btn-success"
                      onClick={(e)=>OpenModalAndSetData(e,Instructor)}
                    >
                      Request
                    </Button>
                  </CardBody>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>


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
                                <div>
                                  <CardText><b>Instructor Full Name -:{SelectedInstructor?.fullName}</b></CardText>
                                  <CardText><b>Instructor Email -:{SelectedInstructor?.email}</b></CardText>
                                  <CardText><b>Instructor Mobile No -:{SelectedInstructor?.mobileno}</b></CardText>
                                  <CardText><b>Instructor Weight -:{SelectedInstructor?.weight}</b></CardText>
                                  <CardText><b>Instructor Height -:{SelectedInstructor?.height}</b></CardText>
                                  <CardText><b>Instructor Registered Date -:{moment(SelectedInstructor?.createdAt).format(" YYYY-MM-DD ")}</b></CardText>
                                </div>
                                <Form>
                                    <br />                                  
                                    <Label>Your Gym ID</Label>
                                    <Input type="text" className="input"  value={localStorage.getItem("userID")} readOnly />
                                    <br />

                                    <Label>Your Name</Label>
                                    <Input type="text" className="input"  value={localStorage.getItem("user")} readOnly />
                                    <br />

                                    <Button
                                        style={{ marginRight: "20px" }}
                                        className="btn btn-success"
                                        onClick={(e)=>requestInstructor(e)}
                                    >
                                      Confirm Request
                                    </Button>

                                    <Button
                                        style={{ float:"right"}}
                                        className="btn btn-danger"
                                        onClick={()=>setopenModal(false)}
                                    >
                                      Cancel Request
                                    </Button>

                                </Form>
                            </div>
                        </ModalBody>
                    </Modal>
                </div>


    </div>
  );
};

export default ReqInstructor;
