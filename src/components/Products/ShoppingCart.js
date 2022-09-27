import React from 'react'
import { useEffect, useState } from 'react';
import {
    Label,
    Button,
} from "reactstrap";
import '../Products/style.css'
import'../Products/style'
import Swal from 'sweetalert2';


const MyShoppingCart = (props) => {

  //shopping cart
  const [CartData, setCartData] = useState([]);
  const [totalPrice, settotalPrice] = useState(0);

  useEffect(() => {
    console.log(props);
    setCartData(props.data);
  }, [])



  const Payment = (e) => {

  }
  

  return (
    <div className='container'>
        <br></br>
        <br></br>
        <center>
        <div class="container">
        <div class="row">
            <div class="col-md-12 text-center">
            <h3 class="animate-charcter"><b>My Shopping Cart</b></h3>
            </div>
        </div>
        </div>

        </center>
        <br></br>
        <br/><br/>

        <div>
            <Button 
                className="btn btn-dark" style={{fontSize: "16px", float:'right',width:'200px'}} 
                onClick={(e)=>Payment(e)}
                > 
                Continue to Payment
            </Button>
        </div>
        <br/><br/><br/>
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
                        <th>Product Price</th>
                    </tr>
                </thead>
                <tbody> 
                    {CartData.map((item, index) => {
                        return (    
                            <tr key={index}>
                                <td>{item.productName}</td>
                                <td>{item.productPrice}</td>
                            </tr>
                        )
                    })}
                    <tr>
                        <td><b>Total Price</b></td>
                        <td>{localStorage.getItem("totalPrice")}</td>
                    </tr>
                </tbody> 
            </table>
        </div>
        <br></br>
        <br/><br/>

            <div class="col-md-12 text-center">
                <b class="animate-charcter"><b>My Items</b></b>
            </div>
            <section class="cards" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: '30px' }}>

                {CartData.map((product) => (
                <article class="card" style={{ flex: '0 1 24%', borderWidth: '1px',borderColor:'white', marginBottom: '20px' }}>
                    <img src={product.productImage} alt='No Image Added...' style={{ width: '100%', height: 'auto' }} />
                    <h6>{product.productName}</h6>
                    <p><b>LKR. {product.productPrice}</b></p>
                </article>
                ))}


            </section>

        


    </div>
  )
}

export default MyShoppingCart;

























