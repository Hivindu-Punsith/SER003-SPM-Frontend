import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
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
    Form
} from "reactstrap";
import moment from 'moment';
import Swal from 'sweetalert2';
import { ValidateAddNewEquipment } from "./Validation";
import { getAllEquipments , createEquipment } from "../../services/EquipmentServices";

const ViewAllEquipments = () => {

    let catergoryList = [
        { value: "liftings-equipments", label: "Liftings Equipments", name: "category" },
        { value: "electric-machines", label: "Electric Machines", name: "category" },
        { value: "lifting-machines", label: "Lifting Machines", name: "category" },
        { value: "other", label: "other", name: "category" },
      ];

    const navigate = useNavigate();

    const [EquipmentDetails, setEquipmentDetails] = useState({});
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
                }
            })

            setEquipmentDetails(newData);
            setLoading(false);

        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        GetEquipments();
    }, [])

    
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
                    <Label style={{ fontSize: "18px" }}><b>{moment(data?.company_name).format(" YYYY-MM-DD ")}</b><br /></Label>
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
        {
            name: (<Badge color="dark" style={{ fontSize: "18px" }} >Category</Badge>),
            selector: "category",
            cell: (data) => (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Label style={{ fontSize: "18px" }}><b>{data?.category}</b><br /></Label>
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
        //     name: (<Badge color="dark" style={{ fontSize: "18px" }} >Equipment Update</Badge>),
      
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
        //     name: (<Badge color="dark" style={{ fontSize: "18px" }} >Equipment Delete</Badge>),
      
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
                        <CardTitle style={{ color: "black", fontSize: "30px", float:"left" }}><b>All Equipments</b></CardTitle>
                        {/* <Button className="btn btn-dark" style={{ fontSize: "15px"}} ><i class="fa-solid fa-print"></i><b> </b></Button> */}
                        <Button className="btn btn-dark" style={{ fontSize: "15px", marginLeft: "83%" }}  onClick={() => setopenModal(true)}><i class="fa-solid fa-circle-plus"></i>&nbsp;<b>Add New Equipment</b></Button>
                        </center>
                    </CardHeader>
                    <CardBody>
                        <DataTable
                            data={EquipmentDetails}
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
                            <Label>Add Equipment</Label>
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