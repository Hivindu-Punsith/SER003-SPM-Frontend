import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import Select from "react-select";
import editIcon from "../../assests/images/pencil.png"
import binIcon from "../../assests/images/bin.png"
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
import { ValidateAddNewEquipment } from "./Validation";
import { getAllEquipments , createEquipment, deleteEquipment } from "../../services/EquipmentServices";

const ViewAllEquipments = () => {

    let catergoryList = [
        { value: "liftings-equipments", label: "Liftings Equipments", name: "category" },
        { value: "electric-machines", label: "Electric Machines", name: "category" },
        { value: "lifting-machines", label: "Lifting Machines", name: "category" },
        { value: "other", label: "other", name: "category" },
      ];

    const navigate = useNavigate();

    const [allDetails, setAllDetails] = useState([]);
    const [liftingEqDetails, setLiftingEquipmentsDetails] = useState([]);
    const [electricEqDetails, setElectricDetails] = useState([]);
    const [liftingMachineDetails, setLiftingMachinesDetails] = useState([]);
    const [otherDetails, setotherDetails] = useState([]);

   // const [EquipmentDetails, setEquipmentDetails] = useState({});
    const [loading, setLoading] = useState(false);
    const [openModal, setopenModal] = useState(false);

    const [name, setname] = useState("");
    const [quantity, setquantity] = useState("");
    const [value, setvalue] = useState("");
    const [company_name, setcompanyname] = useState("");
    const [date_of_purchaced, setdate] = useState("");

    const [category, setcategory] = useState({
        category: "",
      });

    const handleName = (e) => {
        e.preventDefault();
        setname(e.target.value)
    }
    const handleQuantity = (e) => {
        e.preventDefault();
        setquantity(e.target.value)
    }
    const handleValue = (e) => {
        e.preventDefault();
        setvalue(e.target.value)
    }
    const handleCompanyName = (e) => {
        e.preventDefault();
        setcompanyname(e.target.value)
    }
    const handleDate = (e) => {
        e.preventDefault();
        setdate(e.target.value)
    }

    const  handleCategory = (e)=>{
        console.log(e);
        setcategory({ ...category, [e.name] : e });
    }




    const addEquipment = async (e) => {

        e.preventDefault();

        const eduipmentdata = {
            name: name,
            quantity: quantity,
            value: value,
            company_name: company_name,
            date_of_purchaced: date_of_purchaced,
            category: category.category
        }

        console.log("inpuit data ",eduipmentdata)
        let validate = ValidateAddNewEquipment(eduipmentdata);

        let msg = validate.message;

        console.log(msg);
        if (validate.status == false) {
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
           //alert(validate.message);
       }
       else {
            let data = await createEquipment(eduipmentdata);
            if (data?.data?.status === 1) {
                Swal.fire({
                    icon: 'success',
                    title: 'Successful!',
                    text: 'New Equipment added success!',
                })
                setopenModal(false);
                GetEquipments();
                GetLiftingsEquipments();
                GetElectictMachineEquipments();
                GetLiftingMachines();
                GetOtherEquipments();

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

    const GetEquipments = async () => {
        try {
            setLoading(true);

            let data = await getAllEquipments();

            console.log("Equipments Data",data);

            let newData = data?.data?.data?.equipments?.map((item) => {
                return {
                    name:item?.name,
                    quantity: item?.quantity,
                    value: item?.value,
                    company_name: item?.company_name,
                    date_of_purchaced: item?.date_of_purchaced,
                    category: item?.category,
                    _id: item?._id
                }
            })

            setAllDetails(newData);
            setLoading(false);

        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    const GetLiftingsEquipments = async () => {
        try {
            setLoading(true);

            let data = await getAllEquipments();

            console.log("Equipments Data",data);

            let array = [];
            data?.data?.data?.equipments?.map((item) => {
              if (item?.category == "liftings-equipments") {
                array.push(item);
              }
            });

            let newData = array.map((item) => {
                return {
                    name:item?.name,
                    quantity: item?.quantity,
                    value: item?.value,
                    company_name: item?.company_name,
                    date_of_purchaced: item?.date_of_purchaced,
                    category: item?.category,
                    _id: item?._id
                }
            })

            setLiftingEquipmentsDetails(newData);
            setLoading(false);

        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }


    const GetElectictMachineEquipments = async () => {
        try {
            setLoading(true);

            let data = await getAllEquipments();

            console.log("Equipments Data",data);

            let array = [];
            data?.data?.data?.equipments?.map((item) => {
              if (item?.category == "electric-machines") {
                array.push(item);
              }
            });

            let newData = array.map((item) => {
                return {
                    name:item?.name,
                    quantity: item?.quantity,
                    value: item?.value,
                    company_name: item?.company_name,
                    date_of_purchaced: item?.date_of_purchaced,
                    category: item?.category,
                    _id: item?._id
                }
            })

            setElectricDetails(newData);
            setLoading(false);

        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    const GetLiftingMachines = async () => {
        try {
            setLoading(true);

            let data = await getAllEquipments();

            console.log("Equipments Data",data);

            let array = [];
            data?.data?.data?.equipments?.map((item) => {
              if (item?.category == "lifting-machines") {
                array.push(item);
              }
            });

            let newData = array.map((item) => {
                return {
                    name:item?.name,
                    quantity: item?.quantity,
                    value: item?.value,
                    company_name: item?.company_name,
                    date_of_purchaced: item?.date_of_purchaced,
                    category: item?.category,
                    _id: item?._id
                }
            })

            setLiftingMachinesDetails(newData);
            setLoading(false);

        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    const GetOtherEquipments = async () => {
        try {
            setLoading(true);

            let data = await getAllEquipments();

            console.log("Equipments Data",data);

            let array = [];
            data?.data?.data?.equipments?.map((item) => {
              if (item?.category == "other") {
                array.push(item);
              }
            });

            let newData = array.map((item) => {
                return {
                    name:item?.name,
                    quantity: item?.quantity,
                    value: item?.value,
                    company_name: item?.company_name,
                    date_of_purchaced: item?.date_of_purchaced,
                    category: item?.category,
                    _id: item?._id
                }
            })

            setotherDetails(newData);
            setLoading(false);

        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        GetEquipments();
        GetLiftingsEquipments();
        GetElectictMachineEquipments();
        GetLiftingMachines();
        GetOtherEquipments();
    }, [])


    const [all, setAll] = useState(true);
    const [liftingEq, setLiftingEquipments] = useState(false);
    const [electricEq, setElectric] = useState(false);
    const [liftingMachine, setLiftingMachines] = useState(false);
    const [other, setother] = useState(false);
  
    const AllBtn = (e) => {
        e.preventDefault();
        setAll(true);
        setLiftingEquipments(false);
        setElectric(false);
        setLiftingMachines(false);
        setother(false);
    };

    const LiftingEqBtn = (e) => {
        e.preventDefault();
        setAll(false);
        setLiftingEquipments(true);
        setElectric(false);
        setLiftingMachines(false);
        setother(false);
    };
    
    const ElectricBtn = (e) => {
        e.preventDefault();
        setAll(false);
        setLiftingEquipments(false);
        setElectric(true);
        setLiftingMachines(false);
        setother(false);
    };

    const LiftingMachinesBtn = (e) => {
        e.preventDefault();
        setAll(false);
        setLiftingEquipments(false);
        setElectric(false);
        setLiftingMachines(true);
        setother(false);
    };

    const OtherBtn = (e) => {
        e.preventDefault();
        setAll(false);
        setLiftingEquipments(false);
        setElectric(false);
        setLiftingMachines(false);
        setother(true);
    };

    const removeEquipment = async (id) => {
        console.log(id);
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                let data = deleteEquipment(id);
                console.log("Delete ", data);
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
                GetEquipments();
            }
        })
    }

    
    const columns = [
        {
            name: (<Badge color="dark" style={{ fontSize: "18px" }} >Name</Badge>),
            selector: "name",
            cell: (data) => (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Label style={{ fontSize: "18px" }}><b>{data?.name}</b><br /></Label>
                </div>
            ),
        },
        {
            name: (<Badge color="dark" style={{ fontSize: "18px" }} >Quantity</Badge>),
            selector: "quantity",
            cell: (data) => (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Label style={{ fontSize: "18px" }}><b>{data?.quantity}</b><br /></Label>
                </div>
            ),
        },
        {
            name: (<Badge color="dark" style={{ fontSize: "18px" }} >Value</Badge>),
            selector: "value",
            cell: (data) => (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Label style={{ fontSize: "18px" }}><b>{data?.value}</b><br /></Label>
                </div>
            ),
        },
        {
            name: (<Badge color="dark" style={{ fontSize: "18px" }} >Company Name</Badge>),
            selector: "company_name",
            cell: (data) => (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Label style={{ fontSize: "18px" }}><b>{data?.company_name}</b><br /></Label>
                </div>
            ),
        },
        {
            name: (<Badge color="dark" style={{ fontSize: "18px" }} >Date Of Purchaced</Badge>),
            selector: "date_of_purchaced",
            cell: (data) => (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Label style={{ fontSize: "18px" }}><b>{data?.date_of_purchaced}</b><br /></Label>
                </div>
            ),
        },
        // {
        //     name: (<Badge color="dark" style={{ fontSize: "18px" }} >Category</Badge>),
        //     selector: "category",
        //     cell: (data) => (
        //         <div style={{ display: "flex", flexDirection: "column" }}>
        //             <Label style={{ fontSize: "18px" }}><b>{data?.category}</b><br /></Label>
        //         </div>
        //     ),
        // },
        {
            name: (<Badge color="dark" style={{ fontSize: "18px" }} >Created At</Badge>),
            selector: "createdAt",
            cell: (data) => (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Label style={{ fontSize: "18px" }}><b>{moment(data?.createdAt).format(" YYYY-MM-DD ")}</b><br /></Label>
                </div>
            ),
        },
        {
            name: (<Badge color="dark" style={{ fontSize: "18px" }} >Updated At</Badge>),
            selector: "updatedAt",
            cell: (data) => (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Label style={{ fontSize: "18px" }}><b>{moment(data?.updatedAt).format(" YYYY-MM-DD ")}</b><br /></Label>
                </div>
            ),
        },
        {     
            cell: (data) => (

                <div className="row">
                    <div className="col">
                        <img src={editIcon} style={{height: "25px", width:"25px"}} />
                    </div>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <div className="col">
                        <a onClick={() => removeEquipment(data?._id)}><img src={binIcon} style={{height: "25px", width:"25px"}} /></a> 
                    </div>
                </div>
      
            ),
          },
    
    ];


    return (
        <div style={{ marginTop: "70px", marginBottom: "70px" }}>
            <div style={{ margin: "10px" }}>
                <Card>
                    <CardHeader>

                    <center>
                <div style={{paddingTop:"10px"}}>
                <Button color="dark" onClick={(e) => AllBtn(e)}>
                    <b>All Equipments</b>
                    </Button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button color="dark" onClick={(e) => LiftingEqBtn(e)}>
                    <b>Liftings Equipments</b>
                    </Button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button color="dark" onClick={(e) => ElectricBtn(e)}>
                        <b>Electric Machines</b>
                    </Button>

                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button color="dark" onClick={(e) => LiftingMachinesBtn(e)}>
                    <b>Lifting Machines</b>
                    </Button>

                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button color="dark" onClick={(e) => OtherBtn(e)}>
                    <b>Other</b>
                    </Button>
                </div>
                </center>
                        <center>
                        <CardTitle style={{display: all ? "flex" : "none", color: "black", fontSize: "30px", float:"left" }}><b>All Equipments</b></CardTitle>
                        <CardTitle style={{display: liftingEq ? "flex" : "none", color: "black", fontSize: "30px", float:"left" }}><b>Liftings Equipments</b></CardTitle>
                        <CardTitle style={{display: electricEq ? "flex" : "none", color: "black", fontSize: "30px", float:"left" }}><b>Electric Machines</b></CardTitle>
                        <CardTitle style={{display: liftingMachine ? "flex" : "none", color: "black", fontSize: "30px", float:"left" }}><b>Lifting Machines</b></CardTitle>
                        <CardTitle style={{display: other ? "flex" : "none", color: "black", fontSize: "30px", float:"left" }}><b>Other Equipments</b></CardTitle>
                        {/* <Button className="btn btn-dark" style={{ fontSize: "15px"}} ><i class="fa-solid fa-print"></i><b> </b></Button> */}
                        <Button className="btn btn-dark" style={{ fontSize: "15px", float:"right"}}  onClick={() => setopenModal(true)}><i class="fa-solid fa-circle-plus"></i>&nbsp;<b>Add New Equipment</b></Button>
                        <br/>
                        </center>
                    </CardHeader>
                    <CardBody>
                        <div style={{ display: all ? "flex" : "none" }}>
                        <DataTable
                            data={allDetails}
                            columns={columns}
                            progressPending={loading}

                        />
                        </div>

                        <div style={{ display: liftingEq ? "flex" : "none" }}>
                        <DataTable
                            data={liftingEqDetails}
                            columns={columns}
                            progressPending={loading}

                        />
                        </div>

                        <div style={{ display: electricEq ? "flex" : "none" }}>
                        <DataTable
                            data={electricEqDetails}
                            columns={columns}
                            progressPending={loading}

                        />
                        </div>

                        <div style={{ display: liftingMachine ? "flex" : "none" }}>
                        <DataTable
                            data={liftingMachineDetails}
                            columns={columns}
                            progressPending={loading}

                        />
                        </div>

                        <div style={{ display: other ? "flex" : "none" }}>
                        <DataTable
                            data={otherDetails}
                            columns={columns}
                            progressPending={loading}

                        />
                        </div>

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
                            <Label>Add Equipment</Label>
                            <p></p>
                        </ModalHeader>
                        <ModalBody>
                            <div style={{ width: "400px" }}>
                                <Form>
                                    <Label>Name</Label>
                                    <Input type="text" className="input" placeholder="Name" value={name} onChange={(e) => handleName(e)} />
                                    <br />

                                    <Label>Quantity</Label>
                                    <Input type="number" className="input" placeholder="Quantitiy" value={quantity} onChange={(e) => handleQuantity(e)} />
                                    <br />

                                    <Label>Value(LKR)</Label>
                                    <Input type="number" className="input" placeholder="Value" value={value} onChange={(e) => handleValue(e)} />
                                    <br />

                                    <label>Select Category</label>                               
                                    <Select
                                        className="React"
                                        classNamePrefix="select"
                                        options={catergoryList}
                                        value={category.category}
                                        onChange={(e) => handleCategory(e)}
                                        name="category"
                                    />

                                    <Label style={{ marginTop: '10px' }}>Company Name</Label>
                                    <Input type="text" className="input" placeholder="Company" value={company_name} onChange={(e) => handleCompanyName(e)} />
                                    <br />                                  

                                    <Label>Date of Purchace</Label>
                                    <Input type="date" className="input" placeholder="Date of purchace" value={date_of_purchaced} onChange={(e) => handleDate(e)} />
                                    <br />

                                    <Button  className="btn btn-dark" onClick={(e) => addEquipment(e)} style={{marginTop:"20px"}}>Add Equipment</Button>

                                </Form>
                            </div>
                        </ModalBody>
                    </Modal>
                </div>
            </div>

        </div>

    );
};

export default ViewAllEquipments;