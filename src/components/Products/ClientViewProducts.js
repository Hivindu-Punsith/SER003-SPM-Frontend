import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
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
import { getAllProducts } from '../../services/ProductService';
import '../Products/style.css'
import'../Products/style'
import Swal from 'sweetalert2';
import MyShoppingCart from './ShoppingCart';


const ClientViewProducts = () => {

    
    const [products, setProducts] = useState([]);
    const [suppllimentsDetails, setsuppllimentsDetails] = useState([]);
    const [clothingDetails, setclothingDetails] = useState([]);
    const [accessoriesDetails, setaccessoriesDetails] = useState([]);
    const [Protein_Bars_SnacksDetails, setProtein_Bars_SnacksDetails] = useState([]);
  

//Protein_Bars_&_Snacks
//clothing

    const GetProtein_Bars_SnacksProducts = async () => {
      try {
        const { data } = await getAllProducts();
        let array = [];
        data?.data?.map((item) => {
          if (item?.category == "Protein Bars & Snacks") {
            array.push(item);
          }
        }); 
        console.log("Protein_Bars_Snacks",array);
        setProtein_Bars_SnacksDetails(array);
        console.log(data.data);

      } catch (error) {
        console.log(error)
      }
    }

    const GetaccessoriesProducts = async () => {
      try {
        const { data } = await getAllProducts();
        let array = [];
        data?.data?.map((item) => {
          if (item?.category == "accessories") {
            array.push(item);
          }
        }); 
        setaccessoriesDetails(array);
        console.log(data.data);
  
      } catch (error) {
        console.log(error)
      }
    }

    const GetclothingProducts = async () => {
      try {
        const { data } = await getAllProducts();
        let array = [];
        data?.data?.map((item) => {
          if (item?.category == "clothing") {
            array.push(item);
          }
        }); 
        setclothingDetails(array);
        console.log(data.data);
  
      } catch (error) {
        console.log(error)
      }
    }

    const GetsuppllimentsProducts = async () => {
      try {
        const { data } = await getAllProducts();
        let array = [];
        data?.data?.map((item) => {
          if (item?.category == "Supplements") {
            array.push(item);
          }
        }); 
        setsuppllimentsDetails(array);
        console.log(data.data);
  
      } catch (error) {
        console.log(error)
      }
    }

    const GetProducts = async () => {
        try {
          const { data } = await getAllProducts();
          setProducts(data.data)
          console.log(data.data);
    
        } catch (error) {
          console.log(error)
        }
      }

    useEffect(() => {
        GetProducts();
        GetsuppllimentsProducts();
        GetclothingProducts();
        GetaccessoriesProducts();
        GetProtein_Bars_SnacksProducts();
    }, [])

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
      setProducts(result);
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

  const [supplliments, setsupplliments] = useState(false);
  const [clothing, setclothing] = useState(false);
  const [accessories, setaccessories] = useState(true);
  const [Protein_Bars_Snacks, setProtein_Bars_Snacks] = useState(false);

  const showaccessoriesbtn = (e) => {
    e.preventDefault();
    setsupplliments(false);
    setclothing(false);
    setaccessories(true);
    setProtein_Bars_Snacks(false);
  };

  const showProtein_Bars_Snacksbtn = (e) => {
    e.preventDefault();
    setsupplliments(false);
    setclothing(false);
    setaccessories(false);
    setProtein_Bars_Snacks(true);
  };

  const suppllimentsbtn = (e) => {
    e.preventDefault();
    setsupplliments(true);
    setclothing(false);
    setaccessories(false);
    setProtein_Bars_Snacks(false);
  };

  const clothingbtn = (e) => {
    e.preventDefault();
    setsupplliments(false);
    setclothing(true);
    setaccessories(false);
    setProtein_Bars_Snacks(false);
  };


  //shopping cart
  const [CartData, setCartData] = useState([]);
  const [showCart, setshowCart] = useState(false);
  const [total, settotal] = useState(0);

  const addtoCart = (e,data)=>{
    e.preventDefault();
    console.log(data);
    let array = CartData;
    array.push(data);
    setCartData(array);
    console.log(CartData);
    let itemtotal = total;
    itemtotal = itemtotal + data.productPrice;
    settotal(itemtotal);
    console.log(itemtotal);
    localStorage.setItem("totalPrice",itemtotal);
    Swal.fire({
      toast: true,
      icon: 'success',
      html: `<span>${data.productName} added to the Cart.</span>`,
      animation: true,
      position: 'top-right',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: false,
  });
  }

  const showShoppingCart= (e)=>{
    e.preventDefault();
    setshowCart(true);
  }

  const hideShoppingCart= (e)=>{
    e.preventDefault();
    setshowCart(false);
  }

  return (
    <div className='container'>
        <br></br>
        <br></br>
        <Button 
            className="btn btn-dark" style={{fontSize: "16px", float:'right',width:'250px'  , display: showCart ? "flex" : "none"}} 
            onClick={(e)=>hideShoppingCart(e)}
            > 
            Close My Shopping Cart
            &nbsp;&nbsp;
            <i class="fa-solid fa-cart-arrow-down"></i> 
        </Button>
        <br></br>
        <br></br>
        <div style={{display : showCart ? "none" : "flex"}}>
          <div>
          <center>
        <div class="container">
        <div class="row">
          <div class="col-md-12 text-center">
            <h3 class="animate-charcter"><b>Fitness Hub Shopping Store</b></h3>
          </div>
          <div>
              <Button 
                className="btn btn-dark" style={{fontSize: "16px", float:'right',width:'250px' , display: showCart ? "none" : "flex"}} 
                onClick={(e)=>showShoppingCart(e)}
                > 
                My Shopping Cart
                &nbsp;&nbsp;
                <i class="fa-solid fa-cart-arrow-down"></i> 
            </Button>
          </div>
        </div>
      </div>
        
        {/* <h1 ><b>Fitness Hub Shopping Store</b></h1>
    */}
        <br></br>
        </center>
        <br></br>
        <center>
        <table>
          <tr>
           
            <td>
                <div>
                  <center>
                    <input
                        className="form-control"
                        style={{ width: "600px",height:'45px', marginLeft: "50px" }}
                        type="search"
                        placeholder="Search for products"
                        name="searchQuery"
                        onChange={(e)=>handleSearchArea(e)}
                    ></input>
                    </center>
                </div>
            </td>
            {/* <td>
              
              <Button 
                className="btn btn-dark" style={{fontSize: "16px", marginLeft:'10px'}} > <i class="fa-solid fa-cart-arrow-down"></i> 
              </Button>
            </td> */}
            <td>
            </td>
          </tr>
        </table>
        </center>
        <br/><br/>
        
      
            <div>
            <Button color="dark" onClick={(e) => clothingbtn(e)}>
                  <b>Clothing</b>
                  </Button>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                  <Button color="dark" onClick={(e) => suppllimentsbtn(e)}>
                    <b>Supplements</b>
                  </Button>

                
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Button color="dark" onClick={(e) => showaccessoriesbtn(e)}>
                  <b>Accessories</b>
                  </Button>

                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Button color="dark" onClick={(e) => showProtein_Bars_Snacksbtn(e)}>
                  <b>Protein Bars & Snacks</b>
                  </Button>
                  <br />
                  <br />
            </div>
          
          <section class="cards" style={{ display:supplliments ?  'flex' : "none", flexWrap: 'wrap', justifyContent: 'space-between', marginTop: '30px' }}>

            {suppllimentsDetails.map((product) => (
              <article class="card" style={{ flex: '0 1 24%', borderWidth: '1px',borderColor:'white', marginBottom: '20px' }}>
                <img src={product.productImage} alt='No Image Added...' style={{ width: '100%', height: 'auto' }} />
                <h6>{product.productName}</h6>
                <p><b>LKR. {product.productPrice}</b></p>
                
                <button className='btn btn-dark' style={{color:'red'}} onClick={(e)=>addtoCart(e,product)}>Add to cart
                {/* <i className="fa-solid fa-cart-circle-plus"></i> */}
                </button>
              </article>
            ))}


          </section>

          <section class="cards" style={{ display:clothing ?  'flex' : "none", flexWrap: 'wrap', justifyContent: 'space-between', marginTop: '30px' }}>

            {clothingDetails.map((product) => (
              <article class="card" style={{ flex: '0 1 24%', borderWidth: '2px',borderColor:'white', marginBottom: '20px' }}>
                <img src={product.productImage} alt='No Image Added...' style={{ width: '100%', height: 'auto' }} />
                <h6>{product.productName}</h6>
                <p><b>LKR. {product.productPrice}</b></p>
                
                <button className='btn btn-dark' style={{color:'red'}} onClick={(e)=>addtoCart(e,product)}>Add to cart
                {/* <i className="fa-solid fa-cart-circle-plus"></i> */}
                </button>
              </article>
            ))}


          </section>


          <section class="cards" style={{ display:accessories ?  'flex' : "none", flexWrap: 'wrap', justifyContent: 'space-between', marginTop: '30px' }}>

            {accessoriesDetails.map((product) => (
              <article class="card" style={{ flex: '0 1 24%', borderWidth: '2px',borderColor:'white', marginBottom: '20px' }}>
                <img src={product.productImage} alt='No Image Added...' style={{ width: '100%', height: 'auto' }} />
                <h6>{product.productName}</h6>
                <p><b>LKR. {product.productPrice}</b></p>
                
                <button className='btn btn-dark' style={{color:'red'}} onClick={(e)=>addtoCart(e,product)}>Add to cart
                {/* <i className="fa-solid fa-cart-circle-plus"></i> */}
                </button>
              </article>
            ))}


          </section>

          <section class="cards" style={{ display:Protein_Bars_Snacks ?  'flex' : "none", flexWrap: 'wrap', justifyContent: 'space-between', marginTop: '30px' }}>

          {Protein_Bars_SnacksDetails.map((product) => (
            <article class="card" style={{ flex: '0 1 24%', borderWidth: '2px',borderColor:'white', marginBottom: '20px' }}>
              <img src={product.productImage} alt='No Image Added...' style={{ width: '100%', height: 'auto' }} />
              <h6>{product.productName}</h6>
              <p><b>LKR. {product.productPrice}</b></p>
              
              <button className='btn btn-dark' style={{color:'red'}} onClick={(e)=>addtoCart(e,product)}>Add to cart
                {/* <i className="fa-solid fa-cart-circle-plus"></i> */}
                </button>
            </article>
          ))}


          </section>

        </div>

          </div>
        
        


        <div style={{display : showCart ? "flex" : "none"}}>
            <MyShoppingCart data={CartData}/>
        </div>


    </div>
  )
}

export default ClientViewProducts;



































// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import DataTable from "react-data-table-component";
// import {
//     Badge,
//     Card,
//     CardHeader,
//     CardTitle,
//     CardBody,
//     Label,
//     Button,
//     Modal,
//     ModalHeader,
//     ModalBody,
//     Input,
//     Form
// } from "reactstrap";

// import moment from 'moment';
// import Swal from 'sweetalert2';

// import { getAllProducts } from '../../services/ProductService';
// import { validateCreateProduct } from "../auth/productValidation";
// import { createNewProduct } from "../../services/ProductService";
// import { deleteProduct} from "../../services/ProductService";
// import { updateProduct} from "../../services/ProductService";
// import { getProductByID} from "../../services/ProductService";


// const ClientViewProducts = () => {
//     const navigate = useNavigate();


//     const [ProductDetails, setProductDetails] = useState({});
//     const [loading, setLoading] = useState(false);
//     const [openModal, setopenModal] = useState(false);
//     const [productName, setProductName] = useState("");
//     const [productPrice, setProductPrice] = useState("");
//     const [expireDate, setExpireDate] = useState("");
//     const [quantity, setQuantity] = useState("");
//     const [productImage, setProductImage] = useState("");


//     const handleProductName = (e) => {
//         e.preventDefault();
//         setProductName(e.target.value)
//     }

//     const handleProductPrice = (e) => {
//         e.preventDefault();
//         setProductPrice(e.target.value)
//     }

//     const handleExpireDate = (e) => {
//         e.preventDefault();
//         setExpireDate(e.target.value)
//     }
//     const handleQuantity = (e) => {
//         e.preventDefault();
//         setQuantity(e.target.value)
//     }
//     const handleProductImage = (e) => {
//         e.preventDefault();
//         setProductImage(e.target.value)
//     }

//     const addProduct = async (e) => {

//         e.preventDefault();

//         // var info = [productName,productPrice,expireDate,quantity,productImage]

//         const regdata = {

//             productName: productName,
//             productPrice: productPrice,
//             expireDate: expireDate,
//             quantity: quantity,
//             productImage: productImage

//         }
//         let validate = validateCreateProduct(regdata);

//         if (validate.status == false) {
//             alert(validate.message);
//         }
//         else {
//             console.log("sending data", regdata);
//             let data = await createNewProduct(regdata);
//             console.log(" product data ", data);
//             if (data?.status == 201) {
//                 Swal.fire({
//                     icon: 'success',
//                     title: 'Successful!',
//                     text: 'New product added to the store!',
//                 })
//                 navigate("/products");

//             }
//             else {
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Oops...',
//                     text: 'Failed!',
//                 })
//             }
//         }

//     }

//     const GetProducts = async () => {
//         try {
//             setLoading(true);

//             let data = await getAllProducts();

//             console.log("all Products", data);
//             let newData = data?.data?.data?.map((item) => {
//                 return {


//                     productName: item?.productName,
//                     productPrice: item?.productPrice,
//                     expireDate: item?.expireDate,
//                     quantity: item?.quantity,
//                     productImage: item?.productImage,
//                     _id: item?._id
//                 }
//             })

//             setProductDetails(newData);
//             setLoading(false);

//         } catch (error) {
//             console.log(error);
//             setLoading(false);
//         }
//     }

//     useEffect(() => {
//         GetProducts();
//     }, [])

    
//     //Delete product

//     const removeProduct = async (id) => {
//         let data = await deleteProduct(id);
//         console.log("Delete ", data);
//         if (!data?.data?.message) {
//           Swal.fire({
//                     icon: 'success',
//                     title: 'Successful!',
//                     text: 'Product Deleted!',
//                   })
//         }
//         else {
//           //alert(data?.data?.message);
//           window.location.reload();
//         }
//       }
    


//     const [openUpdateModal, setopenUpdateModal] = useState(false);
//     const [ProductImageURL, setProductImageURL] = useState("");

//     const setUpdateData = (e, data) => {
//         e.preventDefault();
  

//         setProductName(data?.productName);
//         setProductPrice(data?.productPrice);
//         setExpireDate(data?.expireDate);
//         setQuantity(data?.quantity);
//         setProductImageURL(data?.productImage);

//         setopenUpdateModal(true);
//     }


//     const columns = [
//         {
//             name: (<Badge color="dark" style={{ fontSize: "18px" }} >Product Name</Badge>),
//             selector: "productName",
//             cell: (data) => (
//                 <div style={{ display: "flex", flexDirection: "column" }}>
//                     <Label style={{ fontSize: "18px" }}><b>{data?.productName}</b><br /></Label>
//                 </div>
//             ),
//         },
//         {
//             name: (<Badge color="dark" style={{ fontSize: "18px" }} >Price  (LKR)</Badge>),
//             selector: "productPrice",
//             cell: (data) => (
//                 <div style={{ display: "flex", flexDirection: "column" }}>
//                     <Label style={{ fontSize: "18px" }}><b>{data.productPrice}.00</b><br /></Label>
//                 </div>
//             ),
//         },
//         {
//             name: (<Badge color="dark" style={{ fontSize: "18px" }} >Expire date</Badge>),
//             selector: "expireDate",
//             cell: (date) => (
//                 <div style={{ display: "flex", flexDirection: "column" }}>
                    
//                     <Label style={{ fontSize: "18px" }} ><b> {moment(date).format(" YYYY-MM-DD ")}</b><br/></Label>
//                 </div>
//             ),
//         },
//         {
//             name: (<Badge color="dark" style={{ fontSize: "18px" }} >Quantity</Badge>),
//             selector: "quantity",
//             cell: (data) => (
//                 <div style={{ display: "flex", flexDirection: "column" }}>
//                     <Label style={{ fontSize: "18px" }}><b>{data.quantity}</b><br /></Label>
//                 </div>
//             ),
//         },
//         {
//             name: (<Badge color="dark" style={{ fontSize: "18px" }} >Image</Badge>),
//             selector: "productImage",
//             cell: (data) => (
//                 <div style={{ display: "flex", flexDirection: "column" }}>
//                     <img src={data.productImage} style={{ width: "80%", height: "80%" }} />
//                 </div>
//             ),
//         },
//         // {
//         //     name: (<Badge color="dark" ></Badge>),
      
//         //     cell: (data) => (
//         //       <div style={{ display: "flex", flexDirection: "column" }}>
//         //         {/* <Link to={`/updateSub/${data?._id}`}> */}
//         //         <Button 
//         //             className="btn btn-secondary" style={{ fontSize: "16px" }} onClick={(e) => setUpdateData(e, data)} >Update <i class="fa-solid fa-pen-to-square"></i></Button>
//         //         {/* </Link> */}
//         //       </div>
      
//         //     ),
//         //   },
      
//         //   {
//         //     name: (<Badge color="secondary"  ></Badge>),
      
//         //     cell: (data) => (
//         //       <div style={{ display: "flex", flexDirection: "column" }}>
//         //         <Button className="btn btn-secondary" style={{ fontSize: "16px" }} onClick={() => removeProduct(data?._id)}><b>Delete <i class="fa-solid fa-trash-can"></i></b></Button>
//         //       </div>
      
//         //     ),
//         //   },
      
      
//         // {
//         //     name: (<Badge color="secondary" style={{ fontSize: "15px" }} ></Badge>),
//         //     selector: "",
//         //     cell: (data) => (
//         //         <div style={{ display: "flex", flexDirection: "column" }}>
//         //             <button 
//         //              className="btn btn-dark" onClick={(e) => setUpdateData(e, data)} >Update <i class="fa-solid fa-pen-to-square"></i></button>
//         //         </div>
                
//         //     ),
//         // },

//         // {
//         //     name: (<Badge color="secondary" style={{ fontSize: "15px" }} ></Badge>),
//         //     selector: "",
//         //     cell: (data) => (
//         //         <div style={{ display: "flex", flexDirection: "column" }}>
//         //             <button 
//         //              className="btn btn-dark" onClick={(e) => setUpdateData(e, data)} >Delete <i class="fa-solid fa-trash-can"></i></button>
//         //         </div>
                
//         //     ),
//         // },






//     ];


//     return (
//         <div style={{ marginTop: "70px", marginBottom: "70px" }}>
//             <div style={{ margin: "10px" }}>
//                 <Card>
//                     <CardHeader>
//                         <center>
//                         <CardTitle style={{ color: "white", fontSize: "40px" }}><b>Store Items</b></CardTitle>
//                         {/* <Button className="btn btn-dark" style={{ fontSize: "15px"}} ><i class="fa-solid fa-print"></i><b> </b></Button> */}
//                         {/* <Button className="btn btn-dark" style={{ fontSize: "15px", marginLeft: "83%" }}  onClick={() => setopenModal(true)}><i class="fa-solid fa-circle-plus"></i><b>   Add New Product</b></Button> */}
//                         </center>
//                     </CardHeader>
//                     <CardBody>
//                         <DataTable
//                             data={ProductDetails}
//                             columns={columns}

//                             progressPending={loading}

//                         />
//                     </CardBody>
//                 </Card>
//                 <div>
//                     <Modal
//                         isOpen={openModal}
//                         className="modal-dialog-centered"
//                         fade={true}
//                         backdrop={true}>
//                         <ModalHeader
//                             toggle={() => {
//                                 setopenModal(false);
//                             }}>
//                             <Label>Add New Prduct</Label>
//                         </ModalHeader>
//                         <ModalBody>
//                             <div style={{ width: "400px" }}>
//                                 <Form>
//                                     <Label>Product Name </Label>
//                                     <Input type="text" className="input" placeholder="Product Name" value={productName} onChange={(e) => handleProductName(e)} />
//                                     <br />

//                                     <Label>Procuct Price</Label>
//                                     <Input type="text" className="input" placeholder="Product Price" value={productPrice} onChange={(e) => handleProductPrice(e)} />
//                                     <br />

//                                     <Label>Expired Date</Label>
//                                     <Input type="date" className="input" placeholder="Expired date" value={expireDate} onChange={(e) => handleExpireDate(e)} />
//                                     <br />

//                                     <Label>Quantity</Label>
//                                     <Input type="text" className="input" placeholder="Quantity" value={quantity} onChange={(e) => handleQuantity(e)} />
//                                     <br />

//                                     <Label>Product Image</Label>
//                                     <Input  type="file" className="input" placeholder="Product Image" value={productImage} onChange={(e) => handleProductImage(e)} />
//                                     <br />

//                                     <Button  className="btn btn-dark" onClick={(e) => addProduct(e)}>Add new product</Button>

//                                 </Form>
//                             </div>
//                         </ModalBody>
//                     </Modal>
//                 </div>

//                 {/* update modal */}
//                 <div>

//                     <Modal
//                         isOpen={openUpdateModal}
//                         className="modal-dialog-centered"
//                         fade={true}
//                         backdrop={true}>
//                         <ModalHeader
//                             toggle={() => {
//                                 setopenUpdateModal(false);
//                             }}>
//                             <Label>Update Prduct</Label>
//                         </ModalHeader>
//                         <ModalBody>
//                             <div style={{ width: "400px" }}>
//                                 <Form>
//                                     <Label>Product Name </Label>
//                                     <Input type="text" className="input" placeholder="Product Name" value={productName} onChange={(e) => handleProductName(e)} />
//                                     <br />

//                                     <Label>Procuct Price</Label>
//                                     <Input type="text" className="input" placeholder="Product Price" value={productPrice} onChange={(e) => handleProductPrice(e)} />
//                                     <br />

//                                     <Label>Expired Date</Label>
//                                     <Input type="date" className="input" placeholder="Expired date" value={expireDate} onChange={(e) => handleExpireDate(e)} />
//                                     <br />

//                                     <Label>Quantity</Label>
//                                     <Input type="text" className="input" placeholder="Quantity" value={quantity} onChange={(e) => handleQuantity(e)} />
//                                     <br />

//                                     <Label>Image view</Label><br></br>
//                                     <img src={ProductImageURL} style={{ width: "50%", height: "30%" }} />
//                                     <br/><br></br>

//                                     <Label>Product Image</Label>
//                                     <Input type="file" className="input" placeholder="Product Image" value={productImage} onChange={(e) => handleProductImage(e)} />
//                                     <br />

//                                     <Button className="btn btn-dark">Update product</Button>

//                                 </Form>
//                             </div>
//                         </ModalBody>
//                     </Modal>
//                 </div>
//             </div>

//         </div>

//     );
// };

// export default ClientViewProducts;
