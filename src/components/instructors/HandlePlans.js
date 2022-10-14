import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DataTable from "react-data-table-component";
import editIcon from "../../assests/images/pencil.png";
import binIcon from "../../assests/images/bin.png";
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
} from "reactstrap";
import moment from "moment";
import Swal from "sweetalert2";
import { ValidateAddNewWorkout, ValidateAddNewMeal } from "./Validation";
import {GetOneUserDetails} from "../../services/UserServices";
import {createWorkout, getAllWorkouts, deleteWorkout, getWorkoutById, updateWorkout} from "../../services/WorkoutServices";
import {createDiet, getAllDiets, deleteDiet, getDietById, updateDiet} from "../../services/DietServices";
import { ValidateSignUp } from "../auth/Validation";
import ReactHTMLTableToExcel from "react-html-table-to-excel";


const HandlePlans = () => {
    const navigate = useNavigate();
    const id = useParams();

    const [workoutData, setWorkoutData] = useState([]);
    const [dietData, setDietData] = useState([]);
    const [userData, setuserData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openModalW, setopenModalW] = useState(false);
    const [openModalD, setopenModalD] = useState(false);
    // const [selectedUserID, setselectedUserID] = useState("");

    

    let catergoryList = [
        { value: "Cardio", label: "Cardio", name: "workout_type" },
        { value: "Fat-loss", label: "Fat-loss", name: "workout_type" },
        { value: "Hypertrophy", label: "Hypertrophy", name: "workout_type" },
        { value: "Strength", label: "Strength", name: "workout_type" },
      ];
    
      const [workoutTypeW, setworkoutTypeW] = useState({
        workout_type: "",
      });
      const [workoutTypeD, setworkoutTypeD] = useState({
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

      const handleWorkoutTypeW = (e) => {
        console.log(e);
        setworkoutTypeW({ ...workoutTypeW, [e.name]: e });
      };

      const handleWorkoutTypeD = (e) => {
        console.log(e);
        setworkoutTypeD({ ...workoutTypeD, [e.name]: e });
      };
    
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
          user_id: id?.id,
          workout_type: workoutTypeW.workout_type.value,
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
            getWorkouts();
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
          user_id: id?.id,
          workout_type: workoutTypeD.workout_type.value,
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
            getDiets();
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
          }
        }
      };

      const getWorkouts = async () => {
        try {
          setLoading(true);
          let data = await getWorkoutById(id?.id);
          console.log("all workout data", data);

          let newData = data?.data?.data?.workout?.map((item)=>{
            return {
              workout_type: item?.workout_type,
              user_id: item?.user_id,
              exercise1: item?.exercise1,
              exercise2: item?.exercise2,
              exercise3: item?.exercise3,
              exercise4: item?.exercise4,
              exercise5: item?.exercise5,
              exercise6: item?.exercise6,
              _id: item?._id,
            };
          });

          setWorkoutData(newData);
          console.log("new workout data", newData);
          setLoading(false);
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      };

      const getDiets = async () => {
        try {
          setLoading(true);
          let data = await getDietById(id?.id);
          console.log("all diet data", data);

          let newData = data?.data?.data?.diet?.map((item)=>{
            return {
              workout_type: item?.workout_type,
              user_id: item?.user_id,
              meal1: item?.meal1,
              meal2: item?.meal2,
              meal3: item?.meal3,
              meal4: item?.meal4,
              meal5: item?.meal5,
              meal6: item?.meal6,
              _id: item?._id,
            };
          });

          setDietData(newData);
          console.log("diet data", newData);
          setLoading(false);
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      };

      const getUserDetails= async () => {
        try {
          setLoading(true);
          let data = await GetOneUserDetails(id?.id);
          console.log("iddd", id?.id);
          console.log("user data single", data);
          
          let newData = data?.data?.data?.user?.map((item)=>{
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
          setuserData(newData);
          setLoading(false);
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      }

      useEffect(() => {
        getWorkouts();
        getDiets();
        getUserDetails();
      }, []);

      const columnsW = [
        {
          name: (
            <Badge color="dark" style={{ fontSize: "18px" }}>
              Workout Type
            </Badge>
          ),
          selector: "workout_type",
          cell: (data) => (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Label style={{ fontSize: "18px" }}>
                <b>{data?.workout_type}</b>
                <br />
              </Label>
            </div>
          ),
        },
        {
          name: (
            <Badge color="dark" style={{ fontSize: "18px" }}>
              Exercise 1
            </Badge>
          ),
          selector: "exercise1",
          cell: (data) => (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Label style={{ fontSize: "18px" }}>
                <b>{data?.exercise1}</b>
                <br />
              </Label>
            </div>
          ),
        },
        {
          name: (
            <Badge color="dark" style={{ fontSize: "18px" }}>
              Exercise 2
            </Badge>
          ),
          selector: "exercise2",
          cell: (data) => (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Label style={{ fontSize: "18px" }}>
                <b>{data?.exercise2}</b>
                <br />
              </Label>
            </div>
          ),
        },
        {
          name: (
            <Badge color="dark" style={{ fontSize: "18px" }}>
              Exercise 3
            </Badge>
          ),
          selector: "exercise3",
          cell: (data) => (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Label style={{ fontSize: "18px" }}>
                <b>{data?.exercise3}</b>
                <br />
              </Label>
            </div>
          ),
        },
        {
          name: (
            <Badge color="dark" style={{ fontSize: "18px" }}>
              Exercise 4
            </Badge>
          ),
          selector: "exercise4",
          cell: (data) => (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Label style={{ fontSize: "18px" }}>
                <b>{data?.exercise4}</b>
                <br />
              </Label>
            </div>
          ),
        },
        {
          name: (
            <Badge color="dark" style={{ fontSize: "18px" }}>
              Exercise 5
            </Badge>
          ),
          selector: "exercise5",
          cell: (data) => (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Label style={{ fontSize: "18px" }}>
                <b>{data?.exercise5}</b>
                <br />
              </Label>
            </div>
          ),
        },
        {
          name: (
            <Badge color="dark" style={{ fontSize: "18px" }}>
              Exercise 6
            </Badge>
          ),
          selector: "exercise6",
          cell: (data) => (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Label style={{ fontSize: "18px" }}>
                <b>{data?.exercise6}</b>
                <br />
              </Label>
            </div>
          ),
        },
        // {
        //   name: (
        //     <Badge color="dark" style={{ fontSize: "18px" }}>
        //       Salary
        //     </Badge>
        //   ),
        //   selector: "salary",
        //   cell: (data) => (
        //     <div style={{ display: "flex", flexDirection: "column" }}>
        //       <Label style={{ fontSize: "18px" }}>
        //         <b>{data?.salary !== null ? data?.salary : "No salary yet"}</b>
        //         <br />
        //       </Label>
        //     </div>
        //   ),
        // },
        {
        
            cell: (data) => (
    
                <div className="row">
                    <div className="col">
                    <a onClick={(e)=>getSelectedWorkout(e,data)}> <img src={editIcon} style={{height: "25px", width:"25px",cursor: "pointer"}} /> </a>
                    </div>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <div className="col">
                        <a onClick={(e) => deleteSelectedWorkout(e,data)}><img src={binIcon} style={{height: "25px", width:"25px", cursor: "pointer"}} /></a> 
                    </div>
                </div>
      
            ),
          },
      ];

      const columnsD = [
        {
          name: (
            <Badge color="dark" style={{ fontSize: "18px" }}>
              Workout Type
            </Badge>
          ),
          selector: "workout_type",
          cell: (data) => (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Label style={{ fontSize: "18px" }}>
                <b>{data?.workout_type}</b>
                <br />
              </Label>
            </div>
          ),
        },
        {
          name: (
            <Badge color="dark" style={{ fontSize: "18px" }}>
              Meal 1
            </Badge>
          ),
          selector: "meal1",
          cell: (data) => (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Label style={{ fontSize: "18px" }}>
                <b>{data?.meal1}</b>
                <br />
              </Label>
            </div>
          ),
        },
        {
          name: (
            <Badge color="dark" style={{ fontSize: "18px" }}>
              Meal 2
            </Badge>
          ),
          selector: "meal2",
          cell: (data) => (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Label style={{ fontSize: "18px" }}>
                <b>{data?.meal2}</b>
                <br />
              </Label>
            </div>
          ),
        },
        {
          name: (
            <Badge color="dark" style={{ fontSize: "18px" }}>
              Meal 3
            </Badge>
          ),
          selector: "meal3",
          cell: (data) => (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Label style={{ fontSize: "18px" }}>
                <b>{data?.meal3}</b>
                <br />
              </Label>
            </div>
          ),
        },
        {
          name: (
            <Badge color="dark" style={{ fontSize: "18px" }}>
              Meal 4
            </Badge>
          ),
          selector: "meal4",
          cell: (data) => (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Label style={{ fontSize: "18px" }}>
                <b>{data?.meal4}</b>
                <br />
              </Label>
            </div>
          ),
        },
        {
          name: (
            <Badge color="dark" style={{ fontSize: "18px" }}>
              Meal 5
            </Badge>
          ),
          selector: "meal5",
          cell: (data) => (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Label style={{ fontSize: "18px" }}>
                <b>{data?.meal5}</b>
                <br />
              </Label>
            </div>
          ),
        },
        {
          name: (
            <Badge color="dark" style={{ fontSize: "18px" }}>
              Meal 6
            </Badge>
          ),
          selector: "meal6",
          cell: (data) => (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Label style={{ fontSize: "18px" }}>
                <b>{data?.meal6}</b>
                <br />
              </Label>
            </div>
          ),
        },
        // {
        //   name: (
        //     <Badge color="dark" style={{ fontSize: "18px" }}>
        //       Salary
        //     </Badge>
        //   ),
        //   selector: "salary",
        //   cell: (data) => (
        //     <div style={{ display: "flex", flexDirection: "column" }}>
        //       <Label style={{ fontSize: "18px" }}>
        //         <b>{data?.salary !== null ? data?.salary : "No salary yet"}</b>
        //         <br />
        //       </Label>
        //     </div>
        //   ),
        // },
        {
        
            cell: (data) => (
    
                <div className="row">
                    <div className="col">
                    <a onClick={(e)=>getSelectedDiet(e,data)}> <img src={editIcon} style={{height: "25px", width:"25px",cursor: "pointer"}} /> </a>
                    </div>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <div className="col">
                        <a onClick={(e) => deleteSelectedDiet(e,data)}><img src={binIcon} style={{height: "25px", width:"25px", cursor: "pointer"}} /></a> 
                    </div>
                </div>
      
            ),
          },
      ];

      const [updateworkoutData, setUpdateWorkoutData] = useState([]);
      const [updatedietData, setUpdateDietData] = useState([]);
      const [updateworkoutTypeW, setUpdateworkoutTypeW] = useState({
        workout_type: "",
      });
      const [updateworkoutTypeD, setUpdateworkoutTypeD] = useState({
        workout_type: "",
      });
      const [updateworkout1, setUpdateworkout1] = useState("");
      const [updateworkout2, setUpdateworkout2] = useState("");
      const [updateworkout3, setUpdateworkout3] = useState("");
      const [updateworkout4, setUpdateworkout4] = useState("");
      const [updateworkout5, setUpdateworkout5] = useState("");
      const [updateworkout6, setUpdateworkout6] = useState("");
      const [updatemeal1, setUpdatemeal1] = useState("");
      const [updatemeal2, setUpdatemeal2] = useState("");
      const [updatemeal3, setUpdatemeal3] = useState("");
      const [updatemeal4, setUpdatemeal4] = useState("");
      const [updatemeal5, setUpdatemeal5] = useState("");
      const [updatemeal6, setUpdatemeal6] = useState("");

      const handleupdateWorkoutTypeW = (e) => {
        console.log(e);
        setUpdateworkoutTypeW({ ...workoutTypeW, [e.name]: e });
      };

      const handleupdateWorkoutTypeD = (e) => {
        console.log(e);
        setUpdateworkoutTypeD({ ...workoutTypeD, [e.name]: e });
      };
    
      const handleupdateWorkout1 = (e) => {
        e.preventDefault();
        setUpdateworkout1(e.target.value);
      };
    
      const handleupdateWorkout2 = (e) => {
        e.preventDefault();
        setUpdateworkout2(e.target.value);
      };
    
      const handleupdateWorkout3 = (e) => {
        e.preventDefault();
        setUpdateworkout3(e.target.value);
      };
    
      const handleupdateWorkout4 = (e) => {
        e.preventDefault();
        setUpdateworkout4(e.target.value);
      };
    
      const handleupdateWorkout5 = (e) => {
        e.preventDefault();
        setUpdateworkout5(e.target.value);
      };
    
      const handleupdateWorkout6 = (e) => {
        e.preventDefault();
        setUpdateworkout6(e.target.value);
      };
    
      const handleupdateMeal1 = (e) => {
        e.preventDefault();
        setUpdatemeal1(e.target.value);
      };
    
      const handleupdateMeal2 = (e) => {
        e.preventDefault();
        setUpdatemeal2(e.target.value);
      };
    
      const handleupdateMeal3 = (e) => {
        e.preventDefault();
        setUpdatemeal3(e.target.value);
      };
    
      const handleupdateMeal4 = (e) => {
        e.preventDefault();
        setUpdatemeal4(e.target.value);
      };
    
      const handleupdateMeal5 = (e) => {
        e.preventDefault();
        setUpdatemeal5(e.target.value);
      };
    
      const handleupdateMeal6 = (e) => {
        e.preventDefault();
        setUpdatemeal6(e.target.value);
      };

      const [openUpdateModalW, setopenUpdateModalW] = useState(false);
      const [openUpdateModalD, setopenUpdateModalD] = useState(false);

      const getSelectedWorkout = (e, workout) => {
        e.preventDefault();
        setUpdateWorkoutData(workout);
        setUpdateworkoutTypeW({ workout_type: workout.workout_type });
        setUpdateworkout1(workout.exercise1);
        setUpdateworkout2(workout.exercise2);
        setUpdateworkout3(workout.exercise3);
        setUpdateworkout4(workout.exercise4);
        setUpdateworkout5(workout.exercise5);
        setUpdateworkout6(workout.exercise6);
        setopenUpdateModalW(true);
        console.log(workout);
      }

      const getSelectedDiet = (e, diet) => {
        e.preventDefault();
        setUpdateDietData(diet);
        setUpdateworkoutTypeD({ workout_type: diet.workout_type });
        setUpdatemeal1(diet.meal1);
        setUpdatemeal2(diet.meal2);
        setUpdatemeal3(diet.meal3);
        setUpdatemeal4(diet.meal4);
        setUpdatemeal5(diet.meal5);
        setUpdatemeal6(diet.meal6);
        setopenUpdateModalD(true);
        console.log(diet);
      }

      //Update workout
      const updateWorkoutData = async (e) => {
        e.preventDefault();
    
        var formData = {
          workout_type: updateworkoutTypeW.workout_type.value,
          exercise1: updateworkout1,
          exercise2: updateworkout2,
          exercise3: updateworkout3,
          exercise4: updateworkout4,
          exercise5: updateworkout5,
          exercise6: updateworkout6,
        };
    
        let validate = ValidateAddNewWorkout(formData);
        let msg = validate?.message;
        if (validate.status == false) {
          Swal.fire({
            toast: true,
            icon: "warning",
            html: `<span>${msg}</span>`,
            animation: true,
            position: "top-right",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: false,
          });
        } else {
          var data = await updateWorkout(updateworkoutData._id, formData);
          console.log("data", data);
          if (data?.data?.status == 1) {
            Swal.fire({
              icon: "success",
              //title: 'Congrats!',
              text: "Update successful...!",
            });
            setopenUpdateModalW(false);
            getWorkouts();
            // navigate("/users");
            // window.location.reload();
          } else {
            Swal.fire({
              icon: "error",
              title: "Update Failed..!",
              text: `${data?.data?.message}`,
            });
          }
        }
        
      };

      //Update diet
      const updateDietData = async (e) => {
        e.preventDefault();
    
        var formData = {
          workout_type: updateworkoutTypeD.workout_type.value,
          meal1: updatemeal1,
          meal2: updatemeal2,
          meal3: updatemeal3,
          meal4: updatemeal4,
          meal5: updatemeal5,
          meal6: updatemeal6,
        };
    
        let validate = ValidateAddNewMeal(formData);
        let msg = validate?.message;
        if (validate.status == false) {
          Swal.fire({
            toast: true,
            icon: "warning",
            html: `<span>${msg}</span>`,
            animation: true,
            position: "top-right",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: false,
          });
        } else {
          var data = await updateDiet(updatedietData._id, formData);
          console.log("data", data);
          if (data?.data?.status == 1) {
            Swal.fire({
              icon: "success",
              //title: 'Congrats!',
              text: "Update successful...!",
            });
            setopenUpdateModalD(false);
            getDiets();
            // navigate("/users");
            // window.location.reload();
          } else {
            Swal.fire({
              icon: "error",
              title: "Update Failed..!",
              text: `${data?.data?.message}`,
            });
          }
        }
        
      };

      const deleteSelectedWorkout = async (e, workout) => {
        e.preventDefault();
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                let data = await deleteWorkout(workout._id);
                console.log("Delete ", data);
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
                getWorkouts();
            }
        }) 
      };

      const deleteSelectedDiet = async (e, diet) => {
        e.preventDefault();
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                let data = await deleteDiet(diet._id);
                console.log("Delete ", data);
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
                getDiets();
            }
        }) 
      };

      return (
        <div style={{ marginTop: "70px", marginBottom: "70px" }}>
          <div style={{ margin: "10px" }}>
            <center>
              <div>
               <h2 style={{ color: "black", fontSize: "30px" }} class="animate-charcter"><b>Client Details</b></h2>
              </div>
            </center>
            <br />
            <Card>
              <CardHeader>
                <center>
                  <CardTitle
                    style={{ color: "black", fontSize: "30px", float: "left" }}
                  >
                    <b>All Workouts</b>
                  </CardTitle>
                  {/* <Button className="btn btn-dark" style={{ fontSize: "15px"}} ><i class="fa-solid fa-print"></i><b> </b></Button> */}
                  <div style={{ fontSize: "15px", float: "right" , marginLeft:"10px"}}>                            
                    <ReactHTMLTableToExcel                                
                        id="test-table-xls-button"
                        className="download-table-xls-button btn btn-dark"
                        table="table-to-xls"
                        filename="Full Workout Details"
                        sheet="tablexls"
                        buttonText={<i class="fa-solid fa-print"></i>}
                    />
                  </div>
                  <Button
                    className="btn btn-dark"
                    style={{ fontSize: "15px", float: "right" }}
                    onClick={() => setopenModalW(true)}
                  >
                    <i class="fa-solid fa-circle-plus"></i>&nbsp;
                    <b>Add New Workout</b>
                  </Button>
                </center>
                {/* <br/><br/><br/>
                <div style={{ float: "right" }}>
                    <input
                        className="form-control"
                        style={{ width: "400px" }}
                        type="search"
                        placeholder="Search for Instructors"
                        name="searchQuery"
                        onChange={(e) => handleSearchArea(e)}
                    >
                    </input>
                </div> */}
              </CardHeader>
              <CardBody>
                <DataTable
                  data={workoutData}
                  columns={columnsW}
                  progressPending={loading}
                />
              </CardBody>
            </Card>
            <br /><br />
            <Card>
              <CardHeader>
                <center>
                  <CardTitle
                    style={{ color: "black", fontSize: "30px", float: "left" }}
                  >
                    <b>All Diets</b>
                  </CardTitle>
                  {/* <Button className="btn btn-dark" style={{ fontSize: "15px"}} ><i class="fa-solid fa-print"></i><b> </b></Button> */}
                  <div style={{ fontSize: "15px", float: "right" , marginLeft:"10px"}}>                            
                    <ReactHTMLTableToExcel                                
                        id="test-table-xls-button"
                        className="download-table-xls-button btn btn-dark"
                        table="table-to-xls2"
                        filename="Full Diet Details"
                        sheet="tablexls"
                        buttonText={<i class="fa-solid fa-print"></i>}
                    />
                  </div>
                  <Button
                    className="btn btn-dark"
                    style={{ fontSize: "15px", float: "right" }}
                    onClick={() => setopenModalD(true)}
                  >
                    <i class="fa-solid fa-circle-plus"></i>&nbsp;
                    <b>Add New Diet</b>
                  </Button>
                </center>
                {/* <br/><br/><br/>
                <div style={{ float: "right" }}>
                    <input
                        className="form-control"
                        style={{ width: "400px" }}
                        type="search"
                        placeholder="Search for Instructors"
                        name="searchQuery"
                        onChange={(e) => handleSearchArea(e)}
                    >
                    </input>
                </div> */}
              </CardHeader>
              <CardBody>
                <DataTable
                  data={dietData}
                  columns={columnsD}
                  progressPending={loading}
                />
              </CardBody>
            </Card>
    
            <table id="table-to-xls" style={{display:"none"}}>
                <tr>
                    <th>Workout Type</th>
                    <th>Exercise 1</th>
                    <th>Exercise 2</th>
                    <th>Exercise 3</th>
                    <th>Exercise 4</th>
                    <th>Exercise 5</th>
                    <th>Exercise 6</th>
                </tr>
                {workoutData.map((user)=>{
                    return (
                        <tr>
                            <td>{user?.workout_type}</td>
                            <td>{user?.exercise1}</td>
                            <td>{user?.exercise2}</td>
                            <td>{user?.exercise3}</td>
                            <td>{user?.exercise4}</td>
                            <td>{user?.exercise5}</td>
                            <td>{user?.exercise6}</td>
                        </tr>
                    )
                })}
                <tr></tr>
                <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th>Total Workout Plans</th>
                    <td>{workoutData.length}</td>
                </tr>                                      
            </table>

            <table id="table-to-xls2" style={{display:"none"}}>
                <tr>
                    <th>Workout Type</th>
                    <th>Meal 1</th>
                    <th>Meal 2</th>
                    <th>Meal 3</th>
                    <th>Meal 4</th>
                    <th>Meal 5</th>
                    <th>Meal 6</th>
                </tr>
                {dietData.map((user)=>{
                    return (
                        <tr>
                            <td>{user?.workout_type}</td>
                            <td>{user?.meal1}</td>
                            <td>{user?.meal2}</td>
                            <td>{user?.meal3}</td>
                            <td>{user?.meal4}</td>
                            <td>{user?.meal5}</td>
                            <td>{user?.meal6}</td>
                        </tr>
                    )
                })}
                <tr></tr>
                <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th>Total Diet Plans</th>
                    <td>{dietData.length}</td>
                </tr>                                      
            </table>
    
            <div>
              <Modal
                isOpen={openModalW}
                className="modal-dialog-centered"
                fade={true}
                backdrop={true}
              >
                <ModalHeader
                  toggle={() => {
                    setopenModalW(false);
                  }}
                >
                  <Label>Add New Workout</Label>
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
                      value={workoutTypeW.workout_type}
                      onChange={(e) => handleWorkoutTypeW(e)}
                      />
                      <br />
    
                      <Label>Exercise 1</Label>
                      <Input
                        type="text"
                        className="input"
                        placeholder="exercise 1"
                        value={workout1}
                        onChange={(e) => handleWorkout1(e)}
                      />
                      <br />

                      <Label>Exercise 2</Label>
                      <Input
                        type="text"
                        className="input"
                        placeholder="exercise 2"
                        value={workout2}
                        onChange={(e) => handleWorkout2(e)}
                      />
                      <br />

                      <Label>Exercise 3</Label>
                      <Input
                        type="text"
                        className="input"
                        placeholder="exercise 3"
                        value={workout3}
                        onChange={(e) => handleWorkout3(e)}
                      />
                      <br />

                      <Label>Exercise 4</Label>
                      <Input
                        type="text"
                        className="input"
                        placeholder="exercise 4"
                        value={workout4}
                        onChange={(e) => handleWorkout4(e)}
                      />
                      <br />

                      <Label>Exercise 5</Label>
                      <Input
                        type="text"
                        className="input"
                        placeholder="exercise 5"
                        value={workout5}
                        onChange={(e) => handleWorkout5(e)}
                      />
                      <br />

                      <Label>Exercise 6</Label>
                      <Input
                        type="text"
                        className="input"
                        placeholder="exercise 6"
                        value={workout6}
                        onChange={(e) => handleWorkout6(e)}
                      />
                      <br />
    
                      <Button
                        className="btn btn-dark"
                        onClick={(e) => addWorkout(e)}
                      >
                        Add new Workout
                      </Button>
                    </Form>
                  </div>
                </ModalBody>
              </Modal>
            </div>

            <div>
              <Modal
                isOpen={openModalD}
                className="modal-dialog-centered"
                fade={true}
                backdrop={true}
              >
                <ModalHeader
                  toggle={() => {
                    setopenModalD(false);
                  }}
                >
                  <Label>Add New Diet</Label>
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
                      value={workoutTypeD.workout_type}
                      onChange={(e) => handleWorkoutTypeD(e)}
                      />
                      <br />
    
                      <Label>Meal 1</Label>
                      <Input
                        type="text"
                        className="input"
                        placeholder="meal 1"
                        value={meal1}
                        onChange={(e) => handleMeal1(e)}
                      />
                      <br />

                      <Label>Meal 2</Label>
                      <Input
                        type="text"
                        className="input"
                        placeholder="meal 2"
                        value={meal2}
                        onChange={(e) => handleMeal2(e)}
                      />
                      <br />

                      <Label>Meal 3</Label>
                      <Input
                        type="text"
                        className="input"
                        placeholder="meal 3"
                        value={meal3}
                        onChange={(e) => handleMeal3(e)}
                      />
                      <br />

                      <Label>Meal 4</Label>
                      <Input
                        type="text"
                        className="input"
                        placeholder="meal 4"
                        value={meal4}
                        onChange={(e) => handleMeal4(e)}
                      />
                      <br />

                      <Label>Meal 5</Label>
                      <Input
                        type="text"
                        className="input"
                        placeholder="meal 5"
                        value={meal5}
                        onChange={(e) => handleMeal5(e)}
                      />
                      <br />

                      <Label>Meal 6</Label>
                      <Input
                        type="text"
                        className="input"
                        placeholder="meal 6"
                        value={meal6}
                        onChange={(e) => handleMeal6(e)}
                      />
                      <br />
    
                      <Button
                        className="btn btn-dark"
                        onClick={(e) => addDiet(e)}
                      >
                        Add new Diet
                      </Button>
                    </Form>
                  </div>
                </ModalBody>
              </Modal>
            </div>
    
            {/* update modal */}
    
            <div>
              <Modal
                isOpen={openUpdateModalW}
                className="modal-dialog-centered"
                fade={true}
                backdrop={true}
              >
                <ModalHeader
                  toggle={() => {
                    setopenUpdateModalW(false);
                  }}
                >
                  <Label>Update Workout</Label>
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
                      defaultInputValue={updateworkoutTypeW.workout_type}
                      // value={updateworkoutTypeW.workout_type}
                      onChange={(e) => handleupdateWorkoutTypeW(e)}
                      />
                      <br />
    
                      <Label>Exercise 1</Label>
                      <Input
                        type="text"
                        className="input"
                        placeholder="exercise 1"
                        value={updateworkout1}
                        onChange={(e) => handleupdateWorkout1(e)}
                      />
                      <br />

                      <Label>Exercise 2</Label>
                      <Input
                        type="text"
                        className="input"
                        placeholder="exercise 2"
                        value={updateworkout2}
                        onChange={(e) => handleupdateWorkout2(e)}
                      />
                      <br />

                      <Label>Exercise 3</Label>
                      <Input
                        type="text"
                        className="input"
                        placeholder="exercise 3"
                        value={updateworkout3}
                        onChange={(e) => handleupdateWorkout3(e)}
                      />
                      <br />

                      <Label>Exercise 4</Label>
                      <Input
                        type="text"
                        className="input"
                        placeholder="exercise 4"
                        value={updateworkout4}
                        onChange={(e) => handleupdateWorkout4(e)}
                      />
                      <br />

                      <Label>Exercise 5</Label>
                      <Input
                        type="text"
                        className="input"
                        placeholder="exercise 5"
                        value={updateworkout5}
                        onChange={(e) => handleupdateWorkout5(e)}
                      />
                      <br />

                      <Label>Exercise 6</Label>
                      <Input
                        type="text"
                        className="input"
                        placeholder="exercise 6"
                        value={updateworkout6}
                        onChange={(e) => handleupdateWorkout6(e)}
                      />
                      <br />
                      
    
                      <Button
                        className="btn btn-dark"
                        onClick={(e) => updateWorkoutData(e)}
                      >
                        Update Workout
                      </Button>
                    </Form>
                  </div>
                </ModalBody>
              </Modal>
            </div>

            <div>
              <Modal
                isOpen={openUpdateModalD}
                className="modal-dialog-centered"
                fade={true}
                backdrop={true}
              >
                <ModalHeader
                  toggle={() => {
                    setopenUpdateModalD(false);
                  }}
                >
                  <Label>Update Diet</Label>
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
                      defaultInputValue={updateworkoutTypeD.workout_type}
                      // value={updateworkoutTypeD.workout_type}
                      onChange={(e) => handleupdateWorkoutTypeD(e)}
                      />
                      <br />
    
                      <Label>Meal 1</Label>
                      <Input
                        type="text"
                        className="input"
                        placeholder="meal 1"
                        value={updatemeal1}
                        onChange={(e) => handleupdateMeal1(e)}
                      />
                      <br />

                      <Label>Meal 2</Label>
                      <Input
                        type="text"
                        className="input"
                        placeholder="meal 2"
                        value={updatemeal2}
                        onChange={(e) => handleupdateMeal2(e)}
                      />
                      <br />

                      <Label>Meal 3</Label>
                      <Input
                        type="text"
                        className="input"
                        placeholder="meal 3"
                        value={updatemeal3}
                        onChange={(e) => handleupdateMeal3(e)}
                      />
                      <br />

                      <Label>Meal 4</Label>
                      <Input
                        type="text"
                        className="input"
                        placeholder="meal 4"
                        value={updatemeal4}
                        onChange={(e) => handleupdateMeal4(e)}
                      />
                      <br />

                      <Label>Meal 5</Label>
                      <Input
                        type="text"
                        className="input"
                        placeholder="meal 5"
                        value={updatemeal5}
                        onChange={(e) => handleupdateMeal5(e)}
                      />
                      <br />

                      <Label>Meal 6</Label>
                      <Input
                        type="text"
                        className="input"
                        placeholder="meal 6"
                        value={updatemeal6}
                        onChange={(e) => handleupdateMeal6(e)}
                      />
                      <br />
                      
    
                      <Button
                        className="btn btn-dark"
                        onClick={(e) => updateDietData(e)}
                      >
                        Update Diet
                      </Button>
                    </Form>
                  </div>
                </ModalBody>
              </Modal>
            </div>
    
          </div>
        </div>
      );
}

export default HandlePlans;