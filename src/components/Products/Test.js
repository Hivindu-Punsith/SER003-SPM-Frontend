import React, { useRef } from 'react';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import { getAllProducts } from '../../services/ProductService';
import axios from "axios";
import { useState, useEffect } from "react";
import moment from 'moment';



const Test = () => {
    const tableRef = useRef(null);

    const [products, setProducts] = useState([])

    const getAllProducts = async () => {
        try {
            const { data } = await axios.get("http://localhost:5000/product/getproducts")
            setProducts(data.data)
            console.log(data.data);

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllProducts()
    }, [])


    return (
        <div>
            <DownloadTableExcel
                filename="Fitness hub shopping store"
                sheet="Fitness hub shopping store"
                currentTableRef={tableRef.current}
            >
                <br></br>

                <center>

                    <button className="btn btn-dark" style={{ fontSize: "15px", width: '250px' }}> <b>Get Report of Stock</b>
                        &nbsp;&nbsp;
                        <i class="fa-solid fa-print"></i>
                    </button>
                </center>
                <br></br>


            </DownloadTableExcel>
            <div className='container'>
                <table ref={tableRef} className="table table-secondary">
                    {/* table table-light table-striped table-bordered */}
                    <thead className="table-danger">
                        <tr>
                            <th></th>
                            <th>Category</th>
                            <th>Product Name</th>
                            <th>Product Price</th>
                            <th>In stock</th>
                            <th>Expired Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr >
                                <th scope="row">{index + 1}</th>
                                <td><b>{product.category}</b></td>
                                <td><b>{product.productName}</b></td>
                                <td><b>LKR. {product.productPrice}</b></td>
                                <td><b>{product.quantity}</b></td>
                                <td><b>{moment(product?.expireDate).format(" YYYY-MM-DD ")}</b></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div >
    );
}


export default Test