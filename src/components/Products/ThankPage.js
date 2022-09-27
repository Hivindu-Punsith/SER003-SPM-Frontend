import React from 'react'
import '../Products/bouncing.css'
import purchase from "../../assests/images/purchase.png";
import { Link, useNavigate } from "react-router-dom";

function ThankPage() {
    return (
        <div>
            <br></br>
            <br></br>
            <br></br>

            <center>
                <h1>
                    <span>THANK YOU FOR</span>
                    <div class="message">
                        <div class="word1">PURCHASE</div>
                        {/* <div class="word2">Order</div>
                        <div class="word3">Purchase</div> */}

                    </div>
                </h1>
                <br></br>
                <img src={purchase} style={{ width: 350, marginBottom: '30px', marginLeft: '40px', marginRight: '10px' }}></img>
                <br></br>
                <button style={{ marginBottom: '60px', width: '200px', marginLeft: '40px', marginRight: '10px' }} type="submit" className="btn btn-dark">

                    
                    <Link to="/client-products" style={{ color: "white", textDecoration: "none" }}>Back To Shopping Store</Link>
                </button>
            </center>

        </div>
    )
}

export default ThankPage