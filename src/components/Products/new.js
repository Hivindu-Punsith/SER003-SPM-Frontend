import { useEffect, useState } from 'react'; 
import { Link } from "react-router-dom"; 
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit'; 
import StripeCheckout from "react-stripe-checkout"; 
import { Button } from 'reactstrap'; 
import swal from 'sweetalert'; 
 
const AddToCart = (props) => { 
  const Quantity = 1; 
 
 
  const [count, setCount] = useState(0); 
  const [amount, setamount] = useState(0); 
 
  useEffect(() => { 
    console.log("data", props?.data); 
  }, []); 
 
  async function handleToken(token) { 
    
    swal("congrats", "congrats your payment was reserved .. Thank You Come Back Again ", "success"); 
 
  } 
 
  const incrementCount = () => { 
 
    setCount(count + 1); 
  }; 
 
 
 
  const decrementCount = () => { 
 
     
    
    setCount(count - 1); 
  }; 
 
 
    
 
  return ( 
    <div> 
      <Link to="/Displaymenus"><span type="submit" class="badge rounded-pill badge-warning">back to menu list </span></Link> 
      <MDBTable align='middle' > 
        <MDBTableHead> 
          <tr> 
            <th scope='col'>Order Menu Images   </th> 
            <th scope='col'>Order Menu  item Description </th> 
            <th scope='col'>Order Menu  item Quantity  </th> 
            <th scope='col'>Order Menu  item   price </th> 
            <th scope='col'>total Price </th> 
          </tr> 
        </MDBTableHead> 
 
        <MDBTableBody  > 
 
          {props?.data?.map((item) => { 
            return ( 
              <tr> 
                <td> 
                  <div className='d-flex align-items-center'> 
                    <img 
                      src={item?.images} 
                      alt='' 
                      style={{ width: '45px', height: '45px' }} 
                      className='rounded-circle' 
                    /> 
                    <div className='ms-3'> 
                      <p className='fw-bold mb-1'>  {item?.foodName}</p> 
                    </div> 
                  </div> 
                </td> 
                <td> 
                  <p className='fw-normal mb-1'>    {item?.Description}</p> 
                </td> 
 
                <td> 
                  {count} 
                  <h4> <MDBBadge color='success' pill  onClick={incrementCount} > 
                     + 
                  </MDBBadge></h4> 
                  <h4> <MDBBadge color='success' pill  onClick={decrementCount} > 
                 - 
                  </MDBBadge></h4> 
 
                </td> 
                
                 
          
 
                <td> 
                  <h4> <MDBBadge color='success' pill> 
                    {item?.price} 
                  </MDBBadge></h4> 
                </td> 
          
 
                <td> 
                  <h4> <MDBBadge color='success' pill> 
                {item?.price * count} 
                  </MDBBadge></h4> 
                </td> 
 
 
              </tr> 
     
            ) 
           
 
          })} 
 
 
 
        </MDBTableBody> 
 
   
      </MDBTable> 
 
      <StripeCheckout 
        stripeKey="pk_test_51KyZL6FeoRdqg6f816PBNMT9VvvDUCbwgUS6pvLiK2kQ6Mvx3q4BOFTQc9ENZpb0IeCH2a3GABcaxBbTStcyvocg00TK9Bbc8z" 
        token={handleToken} 
        name="Tesla Roadster" 
     
        billingAddress 
        shippingAddress 
         
      /> 
  
 
  
 
    </div> 
  ) 
} 
 
export default AddToCart