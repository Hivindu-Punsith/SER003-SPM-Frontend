import React, { useRef } from 'react';
import axios from "axios";
import { useState, useEffect } from "react";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

const ViewOrders = () => {
    
    const [payment, setPayments] = useState([]);
    const [Fulltotal, setFulltotal] = useState(0);

    const getAllPayments = async () => {
        try {
            const  data  = await axios.get("http://localhost:5000/gym/payment/getPayments")
            setPayments(data?.data?.data?.payments)
            console.log("payment data",data);
            let tot = 0;
            data?.data?.data?.payments.map((item)=>{
                tot = tot + parseInt(item?.total);
            })
            setFulltotal(tot);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllPayments()
    }, [])


    return (
        <div style={{marginTop:"50px",marginBottom:"20px"}}>
            
            <div style={{ fontSize: "15px", float: "right", marginLeft: "10px",marginRight: '20px' }}>&nbsp;&nbsp;&nbsp;
                            <ReactHTMLTableToExcel
                                id="test-table-xls-button"
                                className="download-table-xls-button btn btn-dark"
                                table="table-to-xls"
                                filename="Order Details"
                                sheet="tablexls"
                                buttonText={<i class="fa-solid fa-print"></i>}
                            />
                        </div>

            <div className='container'>
                <table className="table table-bordered" id="table-to-xls">
                 
                    <thead className="table-secondary">
                        <tr>
                            <th></th>
                            <th>Customer Name</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Mobile Number</th>
                            <th>Items</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payment.map((product, index) => {
                            return(
                            <tr >
                                <th scope="row">{index + 1}</th>
                                <td><b>{product.name}</b></td>
                                <td><b>{product.email}</b></td>
                                <td><b>{product.address}</b></td>
                                <td><b>{product.mobile}</b></td>
                                <td>
                                    <tr>
                                        <th>Product Name</th>
                                        <th>Product Price</th>
                                    </tr>
                                    {product?.Items.map((item)=>                                        
                                        (
                                            <tr>
                                            <td>{item?.productName}</td>
                                            <td>LKR.{item?.productPrice}.00</td>
                                            </tr>
                                        )
                                    )}
                                </td>
                                <td>LKR.{product?.total}.00</td>
                            </tr>
                            )
                        })}
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>      
                            <th>Full Total</th>
                            <td>LKR.{Fulltotal}.00</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div >
    );
}


export default ViewOrders