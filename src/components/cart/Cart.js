import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
// import ResponsiveAppBarNew from "../cart/ResponsiveAppBarNew";
import { Card, CardContent, Container, Typography } from "@mui/material";
import CustomizedTables from "./Table";
import ToPay from "./ToPay";
import cartPhoto from "../../assests/images/cart.png"

function Cart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [userID, setUserID] = useState("");
  const [badge, setBadge] = useState(0);

  let navigate = useNavigate();
  

  useEffect(() => {
    function getCart() {
      axios
        .get(
          "http://localhost:5000/gym/cart/get" +
            localStorage.getItem("userID")
        )
        .then((res) => {
          setBadge(res.data.length);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getCart();
  }, []);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      function getCart() {
        setUserID(localStorage.getItem("userID"));
        axios
          .get("http://localhost:5000/gym/cart/get" + userID)
          .then((res) => {
            setCart(res.data);
            setTotal(res.data.reduce((total, item) => total + item.price, 0)); //total price}
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      getCart(); //getCart();
    } else {
      navigate("/notFound");
    }
  }, []); //useEffect

  const deleteCart = (id) => {
    axios.delete("http://localhost:5000/gym/cart/delete/" + id).then(() => {
      window.location.reload(true);
      Swal.fire({
        title: "Success",
        text: "Proceed to Payment",
        icon: "success",
        confirmButtonText: "OK",
      });
    });
  };

  const deleteItem = (id, itemID) => {
    axios
      .delete("http://localhost:5000/gym/cart/delete/" + id + "/" + itemID)
      .then(() => {
        window.location.reload(true);
        Swal.fire({
          title: "Success",
          text: "Item Deleted",
          icon: "error",
        });
      });
  };

  return (
    <div>
      {/* <ResponsiveAppBarNew badge={badge} /> */}
      <Container sx={{ mt: 10 }}>
        <center>
          <Typography variant="h5" component="div" gutterBottom>
            <b>MY SHOPPING CART&nbsp;&nbsp;<img src={cartPhoto} style={{ width: '4%', height: 'auto' }} ></img></b>
          </Typography>
          <Card sx={{ minWidth: 1000, m: 5, p: 3, maxWidth: 1500 }} raised>
            <CardContent>
              <CustomizedTables />
              <ToPay />
            </CardContent>
          </Card>
        </center>
      </Container>
    </div>
  );
} //Cart

export default Cart;
