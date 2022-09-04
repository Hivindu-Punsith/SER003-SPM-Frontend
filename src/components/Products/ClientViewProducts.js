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

const ClientViewProducts = () => {

    
    const [products, setProducts] = useState([])

    const GetProducts = async () => {
        try {
          const { data } = await axios.get("http://localhost:5000/product/getproducts")
          setProducts(data.data)
          console.log(data.data);
    
        } catch (error) {
          console.log(error)
        }
      }

    useEffect(() => {
        GetProducts();
    }, [])


  return (
    <div className='container'>
        <br></br>
        <center>
        <h1><b>Fitness Hub Shopping Store</b></h1>
        <br></br>
        <br></br>
        <div>
                                <input
                                    className="form-control"
                                    style={{ width: "500px",border:"solid",borderWidth:'2px'}}
                                    type="search"
                                    placeholder="Search for products"
                                    name="searchQuery"
    
                                    
                                // onChange={this.handleSearchArea}
                                ></input>
                            </div>
        <Button 
                    className="btn btn-dark" style={{ fontSize: "16px",marginLeft:'110%' ,width: '10%' }} > <i class="fa-solid fa-cart-arrow-down"></i> </Button>

        </center>
        
      <section class="cards" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: '30px' }}>

        {products.map((product) => (
          <article class="card" style={{ flex: '0 1 24%', borderWidth: '5px', marginBottom: '20px' }}>
            <img src={product.productImage} alt='No Image Added...' style={{ width: '100%', height: 'auto'}} />
            <h4><b>{product.productName}</b></h4>
            <h6><b>LKR. {product.productPrice}</b></h6>
            
           
            <a className='btn btn-dark' ><b style={{color:'white'}}>Add to cart</b>
            {/* <i className="fa-solid fa-cart-circle-plus"></i> */}
            </a>
          </article>
        ))}


      </section>
    </div>
  )
}

export default ClientViewProducts;



































