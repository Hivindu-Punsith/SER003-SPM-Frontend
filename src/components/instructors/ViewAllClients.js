import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
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
import { GetAllUserDetails, GetUserPlans } from "../../services/UserServices";
import userImg from "../../assests/images/user.png";
import { ValidateAddNewWorkout, ValidateAddNewMeal } from "./Validation";
import { createWorkout, getWorkoutById, updateWorkout, deleteWorkout } from "../../services/WorkoutServices";
import { createDiet, getDietById, updateDiet, deleteDiet } from "../../services/DietServices";
import Swal from "sweetalert2";

const ViewAllClients = () => {
  const navigate = useNavigate();

  const [UserDetails, setUserDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModalW, setopenModalW] = useState(false);
  const [openModalD, setopenModalD] = useState(false);
  const [fullName, setfullName] = useState("");
  const [email, setemail] = useState("");
  const [mobileno, setmobileno] = useState("+94");
  const [dateOfBirth, setdateOfBirth] = useState("");
  const [weight, setweight] = useState("");
  const [height, setheight] = useState("");

  let catergoryList = [
    { value: "Cardio", label: "Cardio", name: "workout_type" },
    { value: "Fat-loss", label: "Fat-loss", name: "workout_type" },
    { value: "Hypertrophy", label: "Hypertrophy", name: "workout_type" },
    { value: "Strength", label: "Strength", name: "workout_type" },
  ];

  const [workoutType, setworkoutType] = useState({
    workout_type: "",
  });
  const [workout1, setworkout1] = useState("");
  const [workout2, setworkout2] = useState("");
  const [workout3, setworkout3] = useState("");
  const [workout4, setworkout4] = useState("");
  const [workout5, setworkout5] = useState("");
  const [workout6, setworkout6] = useState("");
  const [meal1, setmeal1] = useState("");
  const [meal2, setmeal2] = useState("");
  const [meal3, setmeal3] = useState("");
  const [meal4, setmeal4] = useState("");
  const [meal5, setmeal5] = useState("");
  const [meal6, setmeal6] = useState("");

  const handleWorkoutType = (e) => {
    console.log(e);
    setworkoutType({ ...workoutType, [e.name]: e });
  };

  // const handleWorkoutType = (e) => {
  //   e.preventDefault();
  //   setworkoutType(e.target.value);
  // };

  const handleWorkout1 = (e) => {
    e.preventDefault();
    setworkout1(e.target.value);
  };

  const handleWorkout2 = (e) => {
    e.preventDefault();
    setworkout2(e.target.value);
  };

  const handleWorkout3 = (e) => {
    e.preventDefault();
    setworkout3(e.target.value);
  };

  const handleWorkout4 = (e) => {
    e.preventDefault();
    setworkout4(e.target.value);
  };

  const handleWorkout5 = (e) => {
    e.preventDefault();
    setworkout5(e.target.value);
  };

  const handleWorkout6 = (e) => {
    e.preventDefault();
    setworkout6(e.target.value);
  };

  const handleMeal1 = (e) => {
    e.preventDefault();
    setmeal1(e.target.value);
  };

  const handleMeal2 = (e) => {
    e.preventDefault();
    setmeal2(e.target.value);
  };

  const handleMeal3 = (e) => {
    e.preventDefault();
    setmeal3(e.target.value);
  };

  const handleMeal4 = (e) => {
    e.preventDefault();
    setmeal4(e.target.value);
  };

  const handleMeal5 = (e) => {
    e.preventDefault();
    setmeal5(e.target.value);
  };

  const handleMeal6 = (e) => {
    e.preventDefault();
    setmeal6(e.target.value);
  };

  const addWorkout = async (e) => {
    e.preventDefault();

    const regdata = {
      user_id:selectedUserID,
      workout_type: workoutType.workout_type.value,
      exercise1: workout1,
      exercise2: workout2,
      exercise3: workout3,
      exercise4: workout4,
      exercise5: workout5,
      exercise6: workout6,
    };

    let isValid = ValidateAddNewWorkout(regdata);

    if (isValid.status == false) {
      alert(isValid.message);
    } else {
      console.log("sending data", regdata);
      let data = await createWorkout(regdata);
      console.log("workout_data", data);
      if (data?.data?.status === 1) {
        Swal.fire({
          icon: "success",
          title: "Successfull",
          text: "Workout Added Successfully",
        });
        setopenModalW(false);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    }
  };

  const addDiet = async (e) => {
    e.preventDefault();

    const regdata = {
      user_id:selectedUserID,
      workout_type: workoutType.workout_type.value,
      meal1: meal1,
      meal2: meal2,
      meal3: meal3,
      meal4: meal4,
      meal5: meal5,
      meal6: meal6,
    };

    let isValid = ValidateAddNewMeal(regdata);

    if (isValid.status == false) {
      alert(isValid.message);
    } else {
      console.log("sending data", regdata);
      let data = await createDiet(regdata);
      console.log("diet_data", data);
      if (data?.data?.status === 1) {
        Swal.fire({
          icon: "success",
          title: "Successfull",
          text: "Diet Added Successfully",
        });
        setopenModalD(false);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    }
  };

  const GetUsers = async () => {
    try {
      setLoading(true);

      let data = await GetAllUserDetails();

      console.log("all Products", data);
      let newData = data?.data?.data?.users?.map((item) => {
        return {
          gym_id: item?.gym_id,
          fullName: item?.fullName,
          email: item?.email,
          mobileno: item?.mobileno,
          dateOfBirth: item?.dateOfBirth,
          weight: item?.weight,
          height: item?.height,
          memberShip: item?.memberShip,
          createdAt: item?.createdAt,
          updatedAt: item?.updatedAt,
          status: item?.status,
          instructor: item?.instructor,
          _id: item?._id,
        };
      });

      setUserDetails(newData);
      console.log("data users", newData);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getUserPlans = async () => {
    try {
      setLoading(true);

      let data = await GetUserPlans(UserDetails._id);

      console.log("all Plans", data);
      let newData = data?.data?.data?.plans?.map((item) => {
        return {
          user_id: item?.user_id,
          workout_type: item?.workout_type,
          exercise1: item?.exercise1,
          exercise2: item?.exercise2,
          exercise3: item?.exercise3,
          exercise4: item?.exercise4,
          exercise5: item?.exercise5,
          exercise6: item?.exercise6,
          meal1: item?.meal1,
          meal2: item?.meal2,
          meal3: item?.meal3,
          meal4: item?.meal4,
          meal5: item?.meal5,
          meal6: item?.meal6,
          createdAt: item?.createdAt,
          updatedAt: item?.updatedAt,
          _id: item?._id,
        };
      });

      // setUserPlans(newData);
      console.log("data plans", newData);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  //filtering userdata 
  const getFilteredUsers = UserDetails.filter(user => user.instructor !== null)

  useEffect(() => {
    GetUsers();
    getUserPlans();
  }, []);

  const [selectedUserID, setselectedUserID] = useState("");

  const openDietModal = (e,user) => {
    e.preventDefault();
    setopenModalD(true);
    setselectedUserID(user.gym_id)
  }

  const openWorkModal = (e,user) => {
    e.preventDefault();
    setopenModalW(true);
    setselectedUserID(user.gym_id);
  }

  return (
    <div style={{ marginTop: "70px", marginBottom: "70px" }}>
      <Container>
        <Row xs={3}>
          {UserDetails?.map((user) => {
            return (
              <Col style={{ padding: "10px" }}>
                <Card>
                  <CardHeader>
                    <CardTitle style={{ color: "black", fontSize: "40px" }}>
                      <center>
                        <b>{user.fullName}</b>
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
                    <CardText>User ID -: {user.gym_id}</CardText>
                    <CardText>User Email -: {user.email}</CardText>
                    <CardText>User Mobile -: {user.mobileno}</CardText>
                    <CardText>User Weight -: {user.weight}kg</CardText>
                    <CardText>User Height -: {user.height}feet</CardText>
                    <Button
                      style={{ marginRight: "10px" }}
                      onClick={(e) => openWorkModal(e,user)}
                    >
                      Add Workout
                    </Button>
                    <Button 
                      style={{ marginRight: "10px" }}
                      onClick={(e) => openDietModal(e,user)}>
                      Add Diet Plan
                    </Button>
                    <Button 
                    //  style={{ marginLeft: "20px", marginRight: "20px" }}
                     onClick={() => navigate(`/clients/${user.gym_id}`)}>
                      View Details
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
          isOpen={openModalW}
          className="modal-dialog-centered"
          fade={true}
          backdrop={true}
        >
          <ModalHeader toggle={() => setopenModalW(false)}>
            <Label>Add Workout</Label>
          </ModalHeader>
          <ModalBody>
            <div style={{ width: "400px" }}>
              <Form>
                <Label>Workout Type</Label>
                <Select
                  className="React"
                  classNamePrefix="select"
                  options={catergoryList}
                  name="workoutType"
                  value={workoutType.workout_type}
                  onChange={(e) => handleWorkoutType(e)}
                />
                <br />

                <Label>Workout 1</Label>
                <Input
                  type="text"
                  placeholder="workout1"
                  value={workout1}
                  onChange={(e) => handleWorkout1(e)}
                />
                <br />

                <Label>Workout 2</Label>
                <Input
                  type="text"
                  placeholder="workout2"
                  value={workout2}
                  onChange={(e) => handleWorkout2(e)}
                />
                <br />

                <Label>Workout 3</Label>
                <Input
                  type="text"
                  placeholder="workout3"
                  value={workout3}
                  onChange={(e) => handleWorkout3(e)}
                />
                <br />

                <Label>Workout 4</Label>
                <Input
                  type="text"
                  placeholder="workout4"
                  value={workout4}
                  onChange={(e) => handleWorkout4(e)}
                />
                <br />

                <Label>Workout 5</Label>
                <Input
                  type="text"
                  placeholder="workout5"
                  value={workout5}
                  onChange={(e) => handleWorkout5(e)}
                />
                <br />

                <Label>Workout 6</Label>
                <Input
                  type="text"
                  placeholder="workout6"
                  value={workout6}
                  onChange={(e) => handleWorkout6(e)}
                />
                <br />

                <Button className="btn btn-dark" onClick={(e) => addWorkout(e)}>
                  Add Workout
                </Button>
              </Form>
            </div>
          </ModalBody>
        </Modal>

        <Modal
          isOpen={openModalD}
          className="modal-dialog-centered"
          fade={true}
          backdrop={true}
        >
          <ModalHeader toggle={() => setopenModalD(false)}>
            <Label>Add Diet Plan</Label>
          </ModalHeader>
          <ModalBody>
            <div style={{ width: "400px" }}>
              <Form>
                <Label>Workout Type</Label>
                <Select
                  className="React"
                  classNamePrefix="select"
                  options={catergoryList}
                  name="workoutType"
                  value={workoutType.workout_type}
                  onChange={(e) => handleWorkoutType(e)}
                />
                <br />

                <Label>Meal 1</Label>
                <Input
                  type="text"
                  placeholder="meal1"
                  value={meal1}
                  onChange={(e) => handleMeal1(e)}
                />
                <br />

                <Label>Meal 2</Label>
                <Input
                  type="text"
                  placeholder="meal2"
                  value={meal2}
                  onChange={(e) => handleMeal2(e)}
                />
                <br />

                <Label>Meal 3</Label>
                <Input
                  type="text"
                  placeholder="meal3"
                  value={meal3}
                  onChange={(e) => handleMeal3(e)}
                />
                <br />

                <Label>Meal 4</Label>
                <Input
                  type="text"
                  placeholder="meal4"
                  value={meal4}
                  onChange={(e) => handleMeal4(e)}
                />
                <br />

                <Label>Meal 5</Label>
                <Input
                  type="text"
                  placeholder="meal5"
                  value={meal5}
                  onChange={(e) => handleMeal5(e)}
                />
                <br />

                <Label>Meal 6</Label>
                <Input
                  type="text"
                  placeholder="meal6"
                  value={meal6}
                  onChange={(e) => handleMeal6(e)}
                />
                <br />

                <Button className="btn btn-dark" onClick={(e) => addDiet(e)}>
                  Add Diet
                </Button>
              </Form>
            </div>
          </ModalBody>
        </Modal>
      </div>
    </div>
  );
};

export default ViewAllClients;
