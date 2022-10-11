import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import DataTable from "react-data-table-component";
import Select from "react-select"
import {
    CardTitle,
} from "reactstrap";

import Swal from 'sweetalert2';
import FileInput from "../../utils/FileInput";

import { validateCreateProduct } from "../Products/productValidation";
import { updateProduct, getProductByID } from "../../services/ProductService";
import moment from "moment";

const EditProduct = () => {
    const navigate = useNavigate();
    const id = useParams();

    const [data, setData] = useState({
        category: "",
        productName: "",
        productPrice: "",
        expireDate: "",
        quantity: "",
        productImage: "",
    });

    let catergoryList = [
        { value: "Supplements", label: "Supplements", name: "category" },
        { value: "clothing", label: "Clothing", name: "category" },
        { value: "accessories", label: "Accessories", name: "category" },
        { value: "Protein Bars & Snacks", label: "Protein Bars & Snacks", name: "category" },
    ];

    const handelSelectorChange = (e) => {
        console.log(e);
        setData({ ...data, [e.name]: e });
    }


    const handleChange = ({ currentTarget: input }) => {
        console.log(input);
        setData({ ...data, [input.name]: input.value });
    };

    const handleInputState = (name, value) => {
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const getById = async () => {
        try {
            let data = await getProductByID(id?.id);
            console.log("data", data.data.data);
            setData({
                category: { value: data.data.data.category, label: data.data.data.category, name: "category" },
                productName: data.data.data.productName,
                productPrice: data.data.data.productPrice,
                expireDate: moment(data.data.data.expireDate).format("YYYY-MM-DD"),
                quantity: data.data.data.quantity,
                productImage: data.data.data.productImage,
            })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getById();
    }, [])

    const updateSelectedProduct = async (e) => {

        e.preventDefault();

        let validate = validateCreateProduct(data);
        let msg = validate?.message;
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
            let newdata = await updateProduct(id?.id, data);
            console.log(" product data ", newdata);
            if (newdata?.status == 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Successful!',
                    text: 'Product Updated!',
                })
                navigate("/admin-products");

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



    return (
        <div class='container' style={{ marginTop: "70px", marginBottom: "70px", width: '800px',border: '2px solid black', backgroundColor: 'white',borderWidth:'4px' }}>
            <div style={{ margin: "10px" }}>

                <center>
                    <CardTitle style={{ color: "black", fontSize: "40px" }}><h3><b>FitnessHub Shopping Store </b></h3></CardTitle>
                    
                    <h4><b>Update Product</b></h4>
                    <br></br>
                </center>

                <div className="container" style={{ width: '50%', }}>
                    <form className='form-group' onSubmit={updateSelectedProduct} >
                        <label style={{ marginTop: '15px' }}>Select Category</label>
                        <Select
                            className="React"
                            classNamePrefix="select"
                            options={catergoryList}
                            value={data.category}
                            onChange={(e) => handelSelectorChange(e)}
                            name="category"
                        />

                        <label style={{ marginTop: '15px' }}>Enter Product Name</label>
                        <input
                            className='form-control'
                            name="productName"
                            onChange={handleChange}
                            value={data.productName}
                        />

                        <label style={{ marginTop: '15px' }}>Enter Product Price</label>
                        <input
                            className='form-control'
                            name="productPrice"
                            onChange={handleChange}
                            value={data.productPrice}
                        />

                        <label style={{ marginTop: '15px' }}>Enter Stock - Expire Date</label>
                        <input
                            className='form-control'
                            name="expireDate"
                            type="date"
                            onChange={handleChange}
                            value={data.expireDate}
                        />

                        <label style={{ marginTop: '15px' }}>Enter Quantity</label>
                        <input
                            className='form-control'
                            name="quantity"
                            onChange={handleChange}
                            value={data.quantity}
                        />

                        <label style={{ marginTop: '15px' }}>Product Image</label>
                        <FileInput
                            name="productImage"
                            label="Choose Image"
                            handleInputState={handleInputState}
                            type="image"
                            value={data.productImage}
                        />

                        <center><button style={{ marginTop: '15px', marginBottom: '15px', width: '200px' }} type="submit" className="btn btn-dark" >
                            Update Product
                        </button></center>
                    </form>
                </div>
            </div>

        </div>

    );

};

export default EditProduct;
