import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
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
    const [openModal, setopenModal] = useState(false);
    const [category, setCategory] = useState("");
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [expireDate, setExpireDate] = useState("");
    const [quantity, setQuantity] = useState("");
    const [productImage, setProductImage] = useState({
        image:""
    });
    const [searchTerm, setSearchTerm] = useState();


    const handleCategory = (e) => {
        e.preventDefault();
        setCategory(e.target.value)
    }


    const handleProductName = (e) => {
        e.preventDefault();
        setProductName(e.target.value)
    }

    const handleProductPrice = (e) => {
        e.preventDefault();
        setProductPrice(e.target.value)
    }

    const handleExpireDate = (e) => {
        e.preventDefault();
        setExpireDate(e.target.value)
    }
    const handleQuantity = (e) => {
        e.preventDefault();
        setQuantity(e.target.value)
    }
    const handleProductImage = (e) => {
        e.preventDefault();
        console.log("image",e.target.files[0]);
        setProductImage({...productImage,image:e.target.files[0]});
    }

    const addProduct = async (e) => {

        e.preventDefault();

        // const regdata = {
        //     category: category,
        //     productName: productName,
        //     productPrice: productPrice,
        //     expireDate: expireDate,
        //     quantity: quantity,
        //     productImage: productImage

        // }

        const formData = new FormData();
        formData.append("category",category);
        formData.append("productName",productName);
        formData.append("productPrice",productPrice);
        formData.append("expireDate",expireDate);
        formData.append("quantity",quantity);
        formData.append("productImage",productImage.image);



        let validate = validateCreateProduct(formData);

        if (validate.status == false) {
            alert(validate.message);
        }
        else {
            let data = await createNewProduct(formData);
            console.log(" product data ", data);
            if (data?.status == 201) {
                Swal.fire({
                    icon: 'success',
                    title: 'Successful!',
                    text: 'New product added to the store!',
                })
                navigate("/products");

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

    //----------------------------Search-----------------------


    // const filterData = (ProductDetails, Searchkey) => {
    //     const result = ProductDetails.filter(
    //         (product) =>
    //             product.category.toLowerCase().includes(Searchkey) ||
    //             product.productName.toLowerCase().includes(Searchkey) ||
    //             product.productPrice.toLowerCase().includes(Searchkey) ||
    //             product.quantity.toLowerCase().includes(Searchkey) ||
    //             product.expireDate.toLowerCase().includes(Searchkey)
    //     );

    //     category.setState({ ProductDetails: result });
    //     productName.setState({ ProductDetails: result });
    //     productPrice.setState({ ProductDetails: result });
    //     quantity.setState({ ProductDetails: result });
    //     expireDate.setState({ ProductDetails: result });

    // }

    // const handleSearchArea = (e) => {
    //     const Searchkey = e.currentTarget.value;
    //     axios.get("http://localhost:5000/product/getproducts").then((res) => {
    //         if (res.data.success) {
    //             category.filterData(res.data.existingProducts, Searchkey);
    //             productName.filterData(res.data.existingProducts, Searchkey);
    //             productPrice.filterData(res.data.existingProducts, Searchkey);
    //             quantity.filterData(res.data.existingProducts, Searchkey);
    //             expireDate.filterData(res.data.existingProducts, Searchkey);
    //         }
    //     });
    // }

    //---------------------------------------------------------


    const GetProducts = async () => {
        try {
            setLoading(true);

            let data = await getAllProducts();

            console.log("all Products", data);
            let newData = data?.data?.data?.map((item) => {
                return {

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
        let data = await deleteProduct(id);
        console.log("Delete ", data);
        if (data?.status == 201) {
            Swal.fire({
                icon: 'success',
                title: 'Successful!',
                text: 'Product Deleted!',
            })


        }
        else {
            Swal.fire({
                icon: 'success',
                title: 'Successful!',
                text: 'Product Deleted!',
                // icon: 'error',
                // title: 'Oops...',
                // text: 'Failed!',
            })
            //alert(data?.data?.message);
            window.location.reload();
            //navigate("");
        }
    }



    const [openUpdateModal, setopenUpdateModal] = useState(false);
    const [ProductImageURL, setProductImageURL] = useState("");

    const setUpdateData = (e, data) => {
        e.preventDefault();

        setCategory(data?.category);
        setProductName(data?.productName);
        setProductPrice(data?.productPrice);
        setExpireDate(data?.expireDate);
        setQuantity(data?.quantity);
        setProductImageURL(data?.productImage);

        setopenUpdateModal(true);
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
            cell: (date) => (
                <div style={{ display: "flex", flexDirection: "column" }}>

                    <Label style={{ fontSize: "18px" }} ><b> {moment(date).format(" YYYY-MM-DD ")}</b><br /></Label>
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
                        className="btn btn-secondary" style={{ fontSize: "16px" }} onClick={(e) => setUpdateData(e, data)} >Update <i class="fa-solid fa-pen-to-square"></i></Button>
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
                        {/* <div>
                            <input
                                className="form-control"
                                style={{ width: "400px", marginLeft: "50px" }}
                                type="search"
                                placeholder="Search for student"
                                name="searchQuery"
                                onChange={this.handleSearchArea}
                            ></input>
                        </div> */}
                        <center>
                            <CardTitle style={{ color: "black", fontSize: "40px" }}><b>Fitness Hub Shopping Store Items</b></CardTitle>
                            {/* <Button className="btn btn-dark" style={{ fontSize: "15px"}} ><i class="fa-solid fa-print"></i><b> </b></Button> */}
                            <Button className="btn btn-dark" style={{ fontSize: "15px", marginLeft: "83%" }} onClick={() => setopenModal(true)}><i class="fa-solid fa-circle-plus"></i><b>   Add New Product</b></Button>
                        </center>
                    </CardHeader>
                    <CardBody >
                        <DataTable
                            data={ProductDetails}
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
                        backdrop={true}
                        style={{ color: 'black' }}>
                        <ModalHeader
                            style={{ backgroundColor: '#DCDCDC' }}
                            toggle={() => {
                                setopenModal(false);
                            }}>
                            <Label>Add New Prduct</Label>
                        </ModalHeader >
                        <ModalBody style={{ backgroundColor: '#DCDCDC' }}>
                            <div style={{ width: "400px", backgroundColor: '#DCDCDC' }}>
                                <Form>
                                    <Label>Category </Label>
                                    <Input type="text" list="productslist" placeholder="Category" value={category} onChange={(e) => handleCategory(e)}
                                    />
                                    {/* <datalist id="productslist">
                                        <option value="Suppliments"></option>
                                        <option value="Snacks and protiens"></option>
                                        <option value="Clothes"></option>
                                    </datalist> */}
                                    <br />

                                    <Label>Product Name </Label>
                                    <Input type="text" className="input" placeholder="Product Name" value={productName} onChange={(e) => handleProductName(e)} />
                                    <br />

                                    <Label>Procuct Price</Label>
                                    <Input type="text" className="input" placeholder="Product Price" value={productPrice} onChange={(e) => handleProductPrice(e)} />
                                    <br />

                                    <Label>Expired Date</Label>
                                    <Input type="date" className="input" placeholder="Expired date" value={expireDate} onChange={(e) => handleExpireDate(e)} />
                                    <br />

                                    <Label>Quantity</Label>
                                    <Input type="text" className="input" placeholder="Quantity" value={quantity} onChange={(e) => handleQuantity(e)} />
                                    <br />

                                    <Label>Product Image</Label>
                                    <Input 
                                        type="file"
                                        accept=".png, .jpg, .jpeg"
                                        className="input"
                                        placeholder="Product Image"
                                        name="image"
                                        onChange={(e)=>handleProductImage(e)} 
                                    />
                                    <br />

                                    <Button className="btn btn-dark" onClick={(e) => addProduct(e)}>Add new product</Button>

                                </Form>
                            </div>
                        </ModalBody>
                    </Modal>
                </div>

                {/* update modal */}
                <div>

                    <Modal
                        isOpen={openUpdateModal}
                        className="modal-dialog-centered"
                        fade={true}
                        backdrop={true}
                        style={{ color: 'black' }}>

                        <ModalHeader
                            style={{ backgroundColor: '#DCDCDC' }}
                            toggle={() => {
                                setopenUpdateModal(false);
                            }}>
                            <Label>Update Prduct</Label>
                        </ModalHeader>
                        <ModalBody style={{ backgroundColor: '#DCDCDC' }}>
                            <div style={{ width: "400px", backgroundColor: '#DCDCDC' }}>
                                <Form>
                                    <Label>Category </Label>
                                    <Input type="text" className="input" placeholder="Category" value={category} onChange={(e) => handleCategory(e)} />
                                    <br />

                                    <Label>Product Name </Label>
                                    <Input type="text" className="input" placeholder="Product Name" value={productName} onChange={(e) => handleProductName(e)} />
                                    <br />

                                    <Label>Procuct Price</Label>
                                    <Input type="text" className="input" placeholder="Product Price" value={productPrice} onChange={(e) => handleProductPrice(e)} />
                                    <br />

                                    <Label>Expired Date</Label>
                                    <Input type="date" className="input" placeholder="Expired date" value={expireDate} onChange={(e) => handleExpireDate(e)} />
                                    <br />

                                    <Label>Quantity</Label>
                                    <Input type="text" className="input" placeholder="Quantity" value={quantity} onChange={(e) => handleQuantity(e)} />
                                    <br />

                                    <Label>Image view</Label><br></br>
                                    <img src={ProductImageURL} style={{ width: "50%", height: "30%" }} />
                                    <br /><br></br>

                                    <Label>Product Image</Label>
                                    <Input type="file" className="input" placeholder="Product Image" value={productImage} onChange={(e) => handleProductImage(e)} />
                                    <br />

                                    <Button className="btn btn-dark" onClick={(e) => addProduct(e)} setUpdateData>Update product</Button>

                                </Form>
                            </div>
                        </ModalBody>
                    </Modal>
                </div>
            </div>

        </div>

    );

};

export default ViewProducts;