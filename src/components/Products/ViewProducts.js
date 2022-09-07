import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import Select from "react-select"
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
                let data =  deleteProduct(id);
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


    const columns = [

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
            name: (<Badge color="dark" style={{ fontSize: "18px" }} >Product Name</Badge>),
            selector: "productName",
            cell: (data) => (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Label style={{ fontSize: "18px" }}><b>{data?.productName}</b><br /></Label>
                </div>
            ),
        },
        {
            name: (<Badge color="dark" style={{ fontSize: "18px" }} >Price  (LKR)</Badge>),
            selector: "productPrice",
            cell: (data) => (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Label style={{ fontSize: "18px" }}><b>{data.productPrice}.00</b><br /></Label>
                </div>
            ),
        },
        {
            name: (<Badge color="dark" style={{ fontSize: "18px" }} >Expire date</Badge>),
            selector: "expireDate",
            cell: (data) => (
                <div style={{ display: "flex", flexDirection: "column" }}>

                    <Label style={{ fontSize: "18px" }} ><b> {moment(data?.expireDate).format(" YYYY-MM-DD ")}</b><br /></Label>
                </div>
            ),
        },
        {
            name: (<Badge color="dark" style={{ fontSize: "18px" }} >Quantity</Badge>),
            selector: "quantity",
            cell: (data) => (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Label style={{ fontSize: "18px" }}><b>{data.quantity}</b><br /></Label>
                </div>
            ),
        },
        {
            name: (<Badge color="dark" style={{ fontSize: "18px" }} >Image</Badge>),
            selector: "productImage",
            cell: (data) => (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <img src={data.productImage} style={{ width: "80%", height: "80%" }} />
                </div>
            ),
        },
        {
            name: (<Badge color="dark" ></Badge>),

            cell: (data) => (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    {/* <Link to={`/updateSub/${data?._id}`}> */}
                    <Button
                        className="btn btn-secondary" style={{ fontSize: "16px" }} href={`/edit-product/${data?._id}`} >Update <i class="fa-solid fa-pen-to-square"></i></Button>
                    {/* </Link> */}
                </div>

            ),
        },

        {
            name: (<Badge color="secondary"  ></Badge>),

            cell: (data) => (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Button className="btn btn-secondary" style={{ fontSize: "16px" }} onClick={() => removeProduct(data?._id)}><b>Delete <i class="fa-solid fa-trash-can"></i></b></Button>
                </div>

            ),
        },




    ];


    return (
        <div style={{ marginTop: "70px", marginBottom: "70px" }}>
            <div style={{ margin: "10px" }}>
                <Card >
                    <CardHeader >
                        <center>
                            <CardTitle style={{ color: "black", fontSize: "40px" }}><b>FitnessHub Shopping Store Items</b></CardTitle>
                            {/* <Button className="btn btn-dark" style={{ fontSize: "15px"}} ><i class="fa-solid fa-print"></i><b> </b></Button> */}
                            <br></br>
                        </center>
                        {/* <center> */}
                        {/* <table>
                            <tr>
                                
                                <td> */}
                                <center>
                                <div>
                                    <input
                                        className="form-control"
                                        style={{ width: "400px", marginLeft: "50px" }}
                                        type="search"
                                        placeholder="Search for products"
                                        name="searchQuery"
                                        onChange={(e)=>handleSearchArea(e)}
                                    ></input>
                                </div>
                                </center>
                                {/* </td>
                                
                                <td > */}
                                    <Button className="btn btn-dark" style={{ fontSize: "15px",marginLeft:'1650px',width:'200px'}} onClick={(e) =>routeToAddPage(e)}><i class="fa-solid fa-circle-plus"></i><b>   Add New Product</b></Button>
                                {/* </td>
                            </tr>
                        </table>
                        </center> */}
                         <br></br>

                    </CardHeader>
                    <CardBody >
                        <DataTable
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
