import React from 'react'
import { useEffect, useState } from 'react';
import {
    Label,
    Button,
} from "reactstrap";
import '../Products/style.css'
import '../Products/style'
import Swal from 'sweetalert2';
import { Link, useNavigate } from "react-router-dom";

const MyShoppingCart = (props) => {

    //shopping cart
    const [CartData, setCartData] = useState([]);
    const [totalPrice, settotalPrice] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        console.log(props);
        setCartData(props.data);
    }, [])



    const Payment = (e) => {
       
        e.preventDefault();
        navigate("/payment");
    }

    return (
        <div className='container' style={{ width: '960px' }}>
            <br></br>
            <br></br>
            <center>
                <div class="card" >
                    <div class="row">
                        <div class="col-md-12 text-center">
                            <h4><b>MY SHOPPING CART</b></h4>
                        </div>
                    </div>
                </div>

            </center>

            <br /><br />
            <div>
                <table className="table table-striped table-bordered">
                    {/* <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Product Price</th>
                        <th>Product Quantity</th>
                        <th>Product Total</th>
                    </tr>
                </thead>
                <tbody> 
                    {CartData.map((item, index) => {
                        return (    
                            <tr key={index}>
                                <td>{item.productName}</td>
                                <td>{item.productPrice}</td>
                                <td>{item.productQuantity}</td>
                                <td>{item.productTotal}</td>
                            </tr>
                        )
                    })}
                </tbody> */}
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Product Price (LKR)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {CartData.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.productName}</td>
                                    <td>{item.productPrice}.00</td>
                                </tr>
                            )
                        })}
                        <tr>
                            <td><b>Total Price (LKR)</b></td>
                            <td>{localStorage.getItem("totalPrice")}.00</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div>

            </div>
            {/* class="animate-charcter" */}
            <div class="col-md-12 text-center">
                {/* <b>Items in my cart</b> */}
            </div>
            <section class="cards" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: '30px' }}>

                {CartData.map((product) => (
                    <article class="card" style={{ flex: '0 1 24%', borderWidth: '1px', borderColor: 'white', marginBottom: '20px' }}>
                        <img src={product.productImage} alt='No Image Added...' style={{ width: '50%', height: 'auto' }} />
                        <h6>{product.productName}</h6>
                        <p><b>LKR. {product.productPrice}</b></p>
                    </article>
                ))}


            </section>

            <center>
                <Button
                    className="btn btn-dark" style={{ fontSize: "16px", width: '220px', height: '40px', marginBottom: '40px' }}
                    onClick={(e) => Payment(e)}
                >
                    Continue to Payment
                    &nbsp;

                    <i class="fa-solid fa-money-check-dollar"></i>
                </Button>

            </center>


        </div>
    )
}

export default MyShoppingCart;

























