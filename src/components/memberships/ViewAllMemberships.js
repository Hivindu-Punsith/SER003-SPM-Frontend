import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import axios from "axios";
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
import { ValidateAddNewMembership } from "./Validation";
import { createMembership , getAllMemberships, deleteMembership, updateMembership } from "../../services/MembershipServices";
import editIcon from "../../assests/images/pencil.png";
import binIcon from "../../assests/images/bin.png";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const ViewAllMemberships = () => {
    const navigate = useNavigate();

    const [MembershipDetails, setMembershipDetails] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openModal, setopenModal] = useState(false);

    const [name, setname] = useState("");
    const [price, setprice] = useState("");
    const [duration, setduration] = useState("");
    const [description, setdescription] = useState("");

    const [openUpdateModal, setopenUpdateModal] = useState(false);

    const handleName = (e) => {
        e.preventDefault();
        setname(e.target.value)
    }
    const handlePrice = (e) => {
        e.preventDefault();
        setprice(e.target.value)
    }
    const handleDuration = (e) => {
        e.preventDefault();
        setduration(e.target.value)
    }
    const handledescription = (e) => {
        e.preventDefault();
        setdescription(e.target.value)
    }

    //----------------------------Search-----------------------

    const filterData = (searchMembershipDetails, Searchkey) => {
        console.log(searchMembershipDetails, Searchkey);
        const result = searchMembershipDetails.filter(
            (membership) =>
                // console.log(product),
                membership.name.toString().toLowerCase().includes(Searchkey) ||
                membership.price.toString().toLowerCase().includes(Searchkey) ||
                membership.duration.toString().toLowerCase().includes(Searchkey) ||
                membership.description.toString().toLowerCase().includes(Searchkey),
        );
        setMembershipDetails(result);
    }

    const handleSearchArea = (e) => {
        const Searchkey = e.currentTarget.value;
        axios.get("http://localhost:5000/gym/membership/getAllMemberships").then((res) => {

            console.log(res.data);
            if (res.data?.status == "1") {
                filterData(res?.data?.data?.memberships, Searchkey);
            }
        });
    }

    //---------------------------------------------------------

    const addMembership = async (e) => {

        e.preventDefault();

        const membershiptdata = {
            name: name,
            price: price,
            duration: duration,
            description: description
        }

        let validate = ValidateAddNewMembership(membershiptdata);
        let msg = validate.message;
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
       }
       else {
            let data = await createMembership(membershiptdata);
            if (data?.data?.status === 1) {
                Swal.fire({
                    icon: 'success',
                    title: 'Successful!',
                    text: 'New Membership added success!',
                })
                setopenModal(false);
                GetMemberships();
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
                    _id: item?._id
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
        GetMemberships();
    }, [])

    const [memberShip , setMembership] = useState({});
    const [updatename, setUpdatename] = useState("");
    const [updateprice, setUpdateprice] = useState("");
    const [updateduration, setUpdateduration] = useState("");
    const [updatedescription, setUpdatedescription] = useState("");

    const handleUpdateName = (e) => {
        e.preventDefault();
        setUpdatename(e.target.value)
    }
    const handleUpdatePrice = (e) => {
        e.preventDefault();
        setUpdateprice(e.target.value)
    }
    const handleUpdateDuration = (e) => {
        e.preventDefault();
        setUpdateduration(e.target.value)
    }
    const handleUpdatedescription = (e) => {
        e.preventDefault();
        setUpdatedescription(e.target.value)
    }

    const getSelectedMembership = (e,memberShip) => {
        e.preventDefault();

        setMembership(memberShip)
        setUpdatename(memberShip.name);
        setUpdateprice(memberShip.price);
        setUpdateduration(memberShip.duration);
        setUpdatedescription(memberShip.description);

        setopenUpdateModal(true);
    }

//update user 
const updateMembershipForm = async (e) => {

e.preventDefault();

var formData = {
    name: updatename,
    price: updateprice,
    duration:updateduration,
    description:updatedescription
}

let validate = ValidateAddNewMembership(formData);
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
        var data = await updateMembership(memberShip._id,formData);
        console.log("data",data)
        if(data?.data?.status == 1)
        {
        Swal.fire({
            icon: 'success',
            //title: 'Congrats!',
            text: 'Update successful...!',
            })
        setopenUpdateModal(false);
        //navigate("/memberships");
        GetMemberships();
        }
        else
        {
            Swal.fire({
                icon: 'error',
                title: 'Update Failed..!',
                text: `${data?.data?.message}`,
            });
        }
    }
};


    const removeMembership = async (id) => {
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
                let data = deleteMembership(id);
                console.log("Delete ", data);
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
                GetMemberships();
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
            name: (<Badge color="dark" style={{ fontSize: "18px" }} >Price</Badge>),
            selector: "price",
            cell: (data) => (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Label style={{ fontSize: "18px" }}><b>{data?.price}</b><br /></Label>
                </div>
            ),
        },
        {
            name: (<Badge color="dark" style={{ fontSize: "18px" }} >Duration</Badge>),
            selector: "duration",
            cell: (data) => (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Label style={{ fontSize: "18px" }}><b>{data?.duration}</b><br /></Label>
                </div>
            ),
        },
        {
            name: (<Badge color="dark" style={{ fontSize: "18px" }} >Description</Badge>),
            selector: "description",
            cell: (data) => (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Label style={{ fontSize: "18px" }}><b>{data?.description}</b><br /></Label>
                </div>
            ),
        },
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
                        <a onClick={(e)=>getSelectedMembership(e,data)}> <img src={editIcon} style={{height: "25px", width:"25px",cursor: "pointer"}} /> </a>
                    </div>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <div className="col">
                       <a onClick={() => removeMembership(data?._id)}><img src={binIcon} style={{height: "25px", width:"25px",cursor: "pointer"}} /></a> 
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
                        <CardTitle style={{ color: "black", fontSize: "30px", float:"left" }}><b>All Memberships</b></CardTitle>

                        <div style={{ fontSize: "15px", float: "right" , marginLeft:"10px"}}>                            
                            <ReactHTMLTableToExcel                                
                                id="test-table-xls-button"
                                className="download-table-xls-button btn btn-dark"
                                table="table-to-xls"
                                filename="Full User Details"
                                sheet="tablexls"
                                buttonText={<i class="fa-solid fa-print"></i>}
                            />
                        </div>

                        <br /> <br /><br /> <br />
                        <div style={{ float: "left" }}>
                            <input
                                className="form-control"
                                style={{ width: "400px" }}
                                type="search"
                                placeholder="Search for Memberships"
                                name="searchQuery"
                                onChange={(e) => handleSearchArea(e)}
                            >
                            </input>
                        </div>

                        <br/>
                        <Button className="btn btn-dark" style={{ fontSize: "15px", float:"right"}}  onClick={() => setopenModal(true)}><i class="fa-solid fa-circle-plus"></i>&nbsp;<b>Add New Membership</b></Button>
                        </center>
                    </CardHeader>
                    <CardBody>
                        <DataTable
                            data={MembershipDetails}
                            columns={columns}
                            progressPending={loading}
                        />
                    </CardBody>
                </Card>

                <table id="table-to-xls" style={{display:"none"}}>
                    <tr>
                        <th>Membership ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Duration</th>
                        <th>Description</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                    </tr>
                    {MembershipDetails.map((membership)=>{
                        return (
                            <tr>
                                <td>{membership?._id}</td>
                                <td>{membership?.name}</td>
                                <td>{membership?.price}</td>
                                <td>{membership?.duration}</td>
                                <td>{membership?.description}</td>
                                <td>{moment(membership?.createdAt).format(" YYYY-MM-DD ")}</td>
                                <td>{moment(membership?.updatedAt).format(" YYYY-MM-DD ")}</td>
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
                        <th></th>
                        <th>Total Memberships</th>
                        <td>{MembershipDetails.length}</td>
                    </tr>                                      
                </table>

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
                            <Label>Add Membership</Label>
                        </ModalHeader>
                        <ModalBody>
                            <div style={{ width: "400px" }}>
                                <Form>
                                    <Label>Name</Label>
                                    <Input type="text" className="input" placeholder="Name" value={name} onChange={(e) => handleName(e)} />
                                    <br />

                                    <Label>Price(LKR)</Label>
                                    <Input type="number" className="input" placeholder="Price" value={price} onChange={(e) => handlePrice(e)} />
                                    <br />

                                    <Label>Duration</Label>
                                    <Input type="text" className="input" placeholder="Duration" value={duration} onChange={(e) => handleDuration(e)} />
                                    <br />

                                    <Label>Description</Label>
                                    <Input type="text" className="input" placeholder="Description" value={description} onChange={(e) => handledescription(e)} />
                                    <br />                                  

                                    <Button  className="btn btn-dark" onClick={(e) => addMembership(e)}>Add Membership</Button>

                                </Form>
                            </div>
                        </ModalBody>
                    </Modal>
                </div>



                {/* Update modal */}
                <div>
                    <Modal
                        isOpen={openUpdateModal}
                        className="modal-dialog-centered"
                        fade={true}
                        backdrop={true}>
                        <ModalHeader
                            toggle={() => {
                                setopenUpdateModal(false);
                            }}>
                            <Label>Update User</Label>
                        </ModalHeader>
                        <ModalBody>
                            <div style={{ width: "400px" }}>
                            <Form>
                                    <Label>Name</Label>
                                    <Input type="text" className="input" placeholder="Name" value={updatename} onChange={(e) => handleUpdateName(e)} />
                                    <br />

                                    <Label>Price(LKR)</Label>
                                    <Input type="number" className="input" placeholder="Price" value={updateprice} onChange={(e) => handleUpdatePrice(e)} />
                                    <br />

                                    <Label>Duration</Label>
                                    <Input type="text" className="input" placeholder="Duration" value={updateduration} onChange={(e) => handleUpdateDuration(e)} />
                                    <br />

                                    <Label>Description</Label>
                                    <Input type="text" className="input" placeholder="Description" value={updatedescription} onChange={(e) => handleUpdatedescription(e)} />
                                    <br />                                  

                                    <Button  className="btn btn-dark" onClick={(e) => updateMembershipForm(e)}>Update Membership</Button>

                                </Form>
                            </div>
                        </ModalBody>
                    </Modal>
                </div>


            </div>

        </div>

    );
};

export default ViewAllMemberships;