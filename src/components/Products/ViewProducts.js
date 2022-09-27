import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import Select from "react-select"
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
import FileInput from "../../utils/FileInput";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

import { getAllProducts } from '../../services/ProductService';
import { validateCreateProduct } from "../auth/productValidation";
import { createNewProduct } from "../../services/ProductService";
import { deleteProduct } from "../../services/ProductService";
import { updateProduct } from "../../services/ProductService";
import { getProductByID } from "../../services/ProductService";


const ViewProducts = () => {
    const navigate = useNavigate();

    const [ProductDetails, setProductDetails] = useState({});
    const [loading, setLoading] = useState(false);


    //----------------------------Search-----------------------


    const filterData = (ProductDetails, Searchkey) => {
        console.log(ProductDetails, Searchkey);
        const result = ProductDetails.filter(
            (product) =>
                // console.log(product),
                product.category.toString().toLowerCase().includes(Searchkey) ||
                product.productName.toString().toLowerCase().includes(Searchkey) ||
                product.productPrice.toString().toLowerCase().includes(Searchkey) ||
                product.quantity.toString().toLowerCase().includes(Searchkey),
        );
        setProductDetails(result);
    }

    const handleSearchArea = (e) => {
        const Searchkey = e.currentTarget.value;
        axios.get("http://localhost:5000/product/getproducts").then((res) => {
            if (res.data?.message == "Success") {
                filterData(res.data.data, Searchkey);
            }
        });
    }

    //---------------------------------------------------------


    const GetProducts = async () => {
        try {
            setLoading(true);

            let data = await getAllProducts();

            console.log("all Products", data);
            let newData = data?.data?.data?.map((item) => {
                return {
                    //createdAt:item?.createdAt,
                    category: item?.category,
                    productName: item?.productName,
                    productPrice: item?.productPrice,
                    expireDate: item?.expireDate,
                    quantity: item?.quantity,
                    productImage: item?.productImage,
                    _id: item?._id
                }
            })

            setProductDetails(newData);
            setLoading(false);

        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        GetProducts();
    }, [])


    //Delete product

    const removeProduct = async (id) => {

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
                let data = deleteProduct(id);
                console.log("Delete ", data);
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
                GetProducts();
            }
        })
    }



    const routeToAddPage = (e) => {
        e.preventDefault();
        navigate("/add-new-product");
    }

    const routeToReportGenerate = (e) => {
        e.preventDefault();
        navigate("/report-test");
    }

    const columns = [

        {
            name: (<Badge color="dark" style={{ fontSize: "16px" }} >Category</Badge>),
            selector: "category",
            cell: (data) => (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Label style={{ fontSize: "16px" }}><b>{data?.category}</b><br /></Label>
                </div>
            ),
        },
        {
            name: (<Badge color="dark" style={{ fontSize: "16px" }} >Product Name</Badge>),
            selector: "productName",
            cell: (data) => (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Label style={{ fontSize: "16px" }}><b>{data?.productName}</b><br /></Label>
                </div>
            ),
        },
        {
            name: (<Badge color="dark" style={{ fontSize: "16px" }} >Price  (LKR)</Badge>),
            selector: "productPrice",
            cell: (data) => (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Label style={{ fontSize: "16px" }}><b>{data.productPrice}.00</b><br /></Label>
                </div>
            ),
        },
        {
            name: (<Badge color="dark" style={{ fontSize: "16px" }} >Stock - Expire date</Badge>),
            selector: "expireDate",
            cell: (data) => (
                <div style={{ display: "flex", flexDirection: "column" }}>

                    <Label style={{ fontSize: "16px" }} ><b> {moment(data?.expireDate).format(" YYYY-MM-DD ")}</b><br /></Label>
                </div>
            ),
        },
        {
            name: (<Badge color="dark" style={{ fontSize: "16px" }} >Quantity</Badge>),
            selector: "quantity",
            cell: (data) => (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Label style={{ fontSize: "16px" }}><b>{data.quantity}</b><br /></Label>
                </div>
            ),
        },
        {
            name: (<Badge color="dark" style={{ fontSize: "16px" }} >Image</Badge>),
            selector: "productImage",
            cell: (data) => (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <img src={data.productImage} style={{ width: "80%", height: "80%" }} />
                </div>
            ),
        },
        // {
        //     name: (<Badge color="dark" ></Badge>),

        //     cell: (data) => (
        //         <div style={{ display: "flex", flexDirection: "column" }}>
        //             {/* <Link to={`/updateSub/${data?._id}`}> */}
        //             <Button
        //                 className="btn btn-dark" style={{ fontSize: "16px", color:"red" }} href={`/edit-product/${data?._id}`} >Update <i class="fa-solid fa-pen-to-square"></i></Button>
        //             {/* </Link> */}
        //         </div>

        //     ),
        // },

        // {
        //     name: (<Badge color="secondary"  ></Badge>),

        //     cell: (data) => (
        //         <div style={{ display: "flex", flexDirection: "column" }}>
        //             <Button className="btn btn-dark" style={{ fontSize: "16px" , color:"red"}} onClick={() => removeProduct(data?._id)}>Delete <i class="fa-solid fa-trash-can"></i></Button>
        //         </div>

        //     ),
        // },

        {
            name: (<Badge color="secondary"  ></Badge>),

            cell: (data) => (
                <div className="row">
                    <div className="col">
                        <a href={`/edit-product/${data?._id}`}> <img src={editIcon} style={{ height: "25px", width: "25px" }} /></a>
                    </div>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <div className="col">
                        <a onClick={() => removeProduct(data?._id)} ><img src={binIcon} style={{ height: "25px", width: "25px", cursor: "pointer" }} /></a>
                    </div>
                </div>

            ),
        },





    ];


    return (
        <div style={{ marginTop: "70px", marginBottom: "70px" }}>
            <div style={{ margin: "10px" }}>
                <Card >
                    <CardHeader >

                        <CardTitle style={{ color: "black", fontSize: "30px", float: "left" }}><b>Fitness Hub Shopping Store </b></CardTitle>

                        <br /> <br /><br /> <br />
                        <div style={{ float: "left" }}>
                            <input
                                className="form-control"
                                style={{ width: "400px" }}
                                type="search"
                                placeholder="Search for products"
                                name="searchQuery"
                                onChange={(e) => handleSearchArea(e)}
                            >
                            </input>
                        </div>

                        <Button className="btn btn-dark" style={{ fontSize: "15px", float: "right", width: '200px' }} onClick={(e) => routeToAddPage(e)}><i class="fa-solid fa-circle-plus"></i><b>  Add New Product</b></Button>

                        <Button
                            className="btn btn-dark"
                            style={{ fontSize: "15px", float: "right", width: '50px', marginRight: '20px' }}
                            onClick={(e) => routeToReportGenerate(e)}>
                            <i class="fa-solid fa-print"></i><b></b>
                        </Button>



                    </CardHeader>
                    <CardBody >
                        {/* <ReactHTMLTableToExcel
                            id="test-table-xls-button"
                            className="download-table-xls-button"
                            table="table-to-xls"
                            filename="tablexls"
                            sheet="tablexls"
                            buttonText="Download as XLS" /> */}

                        <DataTable
                            // id="table-to-xls"
                            data={ProductDetails}
                            columns={columns}
                            progressPending={loading}
                        />
                    </CardBody>
                </Card>
            </div>

        </div>

    );

};

export default ViewProducts;
