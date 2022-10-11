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
import '../Products/style'
import Swal from 'sweetalert2';
import MyShoppingCart from './ShoppingCart';
import categoryPhoto from "../../assests/images/category.png"
import { Link, useNavigate } from "react-router-dom";


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
      console.log("Protein_Bars_Snacks", array);
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


  //    const filterData = (ProductDetails, Searchkey) => {
  //     console.log(ProductDetails, Searchkey);
  //     const result = ProductDetails.filter(
  //         (product) =>
  //            // console.log(product),
  //             product.category.toString().toLowerCase().includes(Searchkey) ||
  //             product.productName.toString().toLowerCase().includes(Searchkey) ||
  //             product.productPrice.toString().toLowerCase().includes(Searchkey) ||
  //             product.quantity.toString().toLowerCase().includes(Searchkey),
  //     );
  //     setProducts(result);
  // }

  // const handleSearchArea = (e) => {
  //     const Searchkey = e.currentTarget.value;
  //     axios.get("http://localhost:5000/product/getproducts").then((res) => {
  //         if (res.data?.message == "Success") {
  //             filterData(res.data.data, Searchkey);
  //         }
  //     });
  // }

  //---------------------------------------------------------

  const [supplliments, setsupplliments] = useState(false);
  const [clothing, setclothing] = useState(true);
  const [accessories, setaccessories] = useState(false);
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
  const [badge, setBadge] = useState(0);

  const navigate = useNavigate();

  //-------------------------------------------------

  const addtoCart = (e, data) => {

    e.preventDefault();

    let userID = localStorage.getItem("userID");
    let productName = data.productName;
    let productImage = data.productImage;
    let productPrice = Number(data.productPrice);
    let itemID = data._id;


    const cartItem = {
      userID,
      productImage,
      productName,
      productPrice,
      itemID,
    };

    console.log(cartItem);

    axios
      .post("http://localhost:5000/gym/cart/add", cartItem)
      .then((res) => {
        console.log(res);
        Swal.fire({
          toast: true,
          icon: 'success',
          html: `<span><b>${data.productName}</b> successfully added to the cart</span>`,
          animation: true,
          position: 'top-right',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: false,
        }).then((result) => {
          if (result.isConfirmed) {
            axios
              .get(
                "http://localhost:5000/gym/cart/get/" +
                localStorage.getItem("userID")
              )
              .then((res) => {
                setBadge(res.data.length);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };


  //-------------------------------------------------

  // const addtoCart = (e, data) => {
  //   e.preventDefault();
  //   console.log(data);
  //   let array = CartData;
  //   array.push(data);
  //   setCartData(array);
  //   console.log(CartData);
  //   let itemtotal = total;
  //   itemtotal = itemtotal + data.productPrice;
  //   settotal(itemtotal);
  //   console.log(itemtotal);
  //   localStorage.setItem("totalPrice", itemtotal);
  //   Swal.fire({
  //     toast: true,
  //     icon: 'success',
  //     html: `<span><b>${data.productName}</b> successfully added to the cart</span>`,
  //     animation: true,
  //     position: 'top-right',
  //     showConfirmButton: false,
  //     timer: 2000,
  //     timerProgressBar: false,
  //   });
  // }

  const showShoppingCart = (e) => {
    e.preventDefault();
    navigate("/cart-table");
  }

  const hideShoppingCart = (e) => {
    e.preventDefault();
    setshowCart(false);
  }

  return (
    <div className='container'>
      <br></br>
      <br></br>
      <Button
        className="btn btn-danger" style={{ color: 'black', fontSize: "14px", float: 'right', width: '140px', height: '40px', display: showCart ? "flex" : "none" }}
        onClick={(e) => hideShoppingCart(e)}
      >
        <b>Shop More</b>
        &nbsp;&nbsp;&nbsp;
        <center>
          <i class="fa-solid fa-cart-arrow-down"></i>
        </center>
      </Button>
      <br></br>
      <br></br>
      <div style={{ display: showCart ? "none" : "flex" }}>
        <div>
          <center>
            <div class="container">
              <div class="row">
                <div class="col-md-12 text-center">
                  <h3 class="animate-charcter"><b>Fitness Hub Shopping Store</b></h3>

                </div>
                <div>
                  <Button
                    className="btn btn-danger" style={{ color: 'black', fontSize: "14px", float: 'right', width: '180px', height: '40px', display: showCart ? "none" : "flex" }}
                    onClick={(e) => showShoppingCart(e)}
                  >
                    <b>My Shopping Cart</b>
                    &nbsp;&nbsp;&nbsp;
                    <center>
                      <i class="fa-solid fa-cart-shopping"></i>
                    </center>
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

                {/* <td>
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
            </td> */}
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



          <div>
            <center>
              <div>
                <h5><b>SHOP BY CAREGORY &nbsp;&nbsp;<img src={categoryPhoto} style={{ width: '3%', height: 'auto' }} ></img></b></h5>
              </div>
              <br></br>
              <br></br>
              <Button style={{ width: '20%' }} color="dark" onClick={(e) => clothingbtn(e)}>
                <b>Clothing</b>
              </Button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

              <Button style={{ width: '20%' }} color="dark" onClick={(e) => suppllimentsbtn(e)}>
                <b>Supplements</b>
              </Button>


              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button style={{ width: '20%' }} color="dark" onClick={(e) => showaccessoriesbtn(e)}>
                <b>Accessories</b>
              </Button>

              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button style={{ width: '20%' }} color="dark" onClick={(e) => showProtein_Bars_Snacksbtn(e)}>
                <b>Protein Bars & Snacks</b>
              </Button>
              <br />
              <br />
            </center>
          </div>

          <section class="cards" style={{ display: supplliments ? 'flex' : "none", flexWrap: 'wrap', justifyContent: 'space-between', marginTop: '30px' }}>

            {suppllimentsDetails.map((product) => (
              <article class="card" style={{ flex: '0 1 24%', borderWidth: '1px', borderColor: 'white', marginBottom: '20px' }}>
                <img src={product.productImage} alt='No Image Added...' style={{ width: '100%', height: 'auto' }} />
                <h6>{product.productName}</h6>
                <p><b>LKR. {product.productPrice}</b></p>

                <button className='btn btn-dark' style={{ color: 'red' }} onClick={(e) => addtoCart(e, product)}>Add to cart
                  {/* <i className="fa-solid fa-cart-circle-plus"></i> */}
                </button>
              </article>
            ))}


          </section>

          <section class="cards" style={{ display: clothing ? 'flex' : "none", flexWrap: 'wrap', justifyContent: 'space-between', marginTop: '30px' }}>

            {clothingDetails.map((product) => (
              <article class="card" style={{ flex: '0 1 24%', borderWidth: '2px', borderColor: 'white', marginBottom: '20px' }}>
                <img src={product.productImage} alt='No Image Added...' style={{ width: '100%', height: 'auto' }} />
                <h6>{product.productName}</h6>
                <p><b>LKR. {product.productPrice}</b></p>

                <button className='btn btn-dark' style={{ color: 'red' }} onClick={(e) => addtoCart(e, product)}>Add to cart
                  {/* <i className="fa-solid fa-cart-circle-plus"></i> */}
                </button>
              </article>
            ))}


          </section>


          <section class="cards" style={{ display: accessories ? 'flex' : "none", flexWrap: 'wrap', justifyContent: 'space-between', marginTop: '30px' }}>

            {accessoriesDetails.map((product) => (
              <article class="card" style={{ flex: '0 1 24%', borderWidth: '2px', borderColor: 'white', marginBottom: '20px' }}>
                <img src={product.productImage} alt='No Image Added...' style={{ width: '100%', height: 'auto' }} />
                <h6>{product.productName}</h6>
                <p><b>LKR. {product.productPrice}</b></p>

                <button className='btn btn-dark' style={{ color: 'red' }} onClick={(e) => addtoCart(e, product)}>Add to cart
                  {/* <i className="fa-solid fa-cart-circle-plus"></i> */}
                </button>
              </article>
            ))}


          </section>

          <section class="cards" style={{ display: Protein_Bars_Snacks ? 'flex' : "none", flexWrap: 'wrap', justifyContent: 'space-between', marginTop: '30px' }}>

            {Protein_Bars_SnacksDetails.map((product) => (
              <article class="card" style={{ flex: '0 1 24%', borderWidth: '2px', borderColor: 'white', marginBottom: '20px' }}>
                <img src={product.productImage} alt='No Image Added...' style={{ width: '100%', height: 'auto' }} />
                <h6>{product.productName}</h6>
                <p><b>LKR. {product.productPrice}</b></p>

                <button className='btn btn-dark' style={{ color: 'red' }} onClick={(e) => addtoCart(e, product)}>Add to cart
                  {/* <i className="fa-solid fa-cart-circle-plus"></i> */}
                </button>
              </article>
            ))}


          </section>

        </div>

      </div>




      <div style={{ display: showCart ? "flex" : "none" }}>
        <MyShoppingCart data={CartData} />
      </div>


    </div>
  )
}

export default ClientViewProducts;








