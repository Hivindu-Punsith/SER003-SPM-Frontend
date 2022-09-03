import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import Select from "react-select"
import {
    CardTitle,
} from "reactstrap";

import Swal from 'sweetalert2';
import FileInput from "../../utils/FileInput";

import { validateCreateProduct } from "../auth/productValidation";
import { createNewProduct } from "../../services/ProductService";

const AddNewProduct = () => {
    const navigate = useNavigate();

    const [data, setData] = useState({
        category: "",
        productName: "",
        productPrice: "",
        expireDate: "",
        quantity: "",
        productImage: "",
      });
    
      let catergoryList = [
        { value: "supplliments", label: "Supplliments", name: "category" },
        { value: "clothing", label: "Clothing", name: "category" },
        { value: "accessories", label: "Accessories", name: "category" },
      ];

        const  handelSelectorChange = (e)=>{
            console.log(e);
            setData({ ...data, [e.name] : e });
        }


      const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
      };
    
      const handleInputState = (name, value) => {
        setData((prev) => ({ ...prev, [name]: value }));
      };
    

    const addProduct = async (e) => {

        e.preventDefault();

        let validate = validateCreateProduct(data);

        if (validate.status == false) {
            alert(validate.message);
        }
        else {
            let newdata = await createNewProduct(data);
            console.log(" product data ", newdata);
            if (newdata?.status == 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Successful!',
                    text: 'New product added to the store!',
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
        <div style={{ marginTop: "70px", marginBottom: "70px" }}>
            <div style={{ margin: "10px" }}>

                        <center>
                            <CardTitle style={{ color: "black", fontSize: "40px" }}><b>Fitness Hub Shopping Store Items</b></CardTitle>

                        </center>

                        <div className="container" style={{ width: '30%', }}>
                            <form className='form-group' onSubmit={addProduct} >
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

                                <label style={{ marginTop: '15px' }}>Enter Expire Date</label>
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

                                <center><button style={{ marginTop: '15px', marginBottom: '15px' }} type="submit" className="btn btn-success" >
                                Upload Product
                                </button></center>
                            </form>
                        </div>
            </div>

        </div>

    );

};

export default AddNewProduct;
