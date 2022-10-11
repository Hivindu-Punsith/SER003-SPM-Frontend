import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Avatar, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#e4eaeb",
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));


export default function CustomizedTables() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [userID, setUserID] = useState("");

  const navigate = useNavigate();

  const RouteToProduct = (e) => {

    e.preventDefault();
    navigate("/client-products");
  }
  

  useEffect(() => {
    function getCart() {
      axios
        .get(
          "http://localhost:5000/gym/cart/get/" +
          localStorage.getItem("userID")
        )
        .then((res) => {
          setCart(res.data);
          setTotal(res.data.reduce((total, item) => total + item.productrice, 0)); //total price}
          setUserID(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getCart(); //getCart();
  }, []);

  const deleteItem = (itemID) => {
    axios
      .delete("http://localhost:5000/gym/cart/delete/item/" + itemID)
      .then((res) => {
        Swal.fire({
          title: 'Are you sure to remove?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, remove!'
        }).then((result) => {
          if (result.isConfirmed) {
            let data = deleteItem(itemID);
            console.log("Delete ", data);
            // Swal.fire(
            //   'Removed',
            //   'Item has been removed',
            //   'success'

            // )
            window.location.reload(true);
          }
        });
        console.log(res);
      });
  };

  return (

    <TableContainer component={Paper}>

      <Button
        onClick={(e) => RouteToProduct(e)}
        style={{ backgroundColor: 'black', color: 'white', fontSize: "12px", float: 'right', width: '140px', height: '30px' }}>
        Shop More </Button>
      <br></br>
      <br></br>

      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center"><b>Image</b></StyledTableCell>
            <StyledTableCell align="right"><b>Name</b></StyledTableCell>
            <StyledTableCell align="right"><b>Price</b></StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>

          {cart.map((row) => (
            <StyledTableRow>
              <StyledTableCell component="th" scope="row" sx={{ maxWidth: 30 }}>
                <Avatar
                  alt="productImage"
                  src={row.productImage}
                  sx={{ width: 100, height: 100 }}
                />
              </StyledTableCell>
              <StyledTableCell align="right" sx={{ maxWidth: 30 }}>
                {row.productName}
              </StyledTableCell>

              <StyledTableCell align="right">LKR. {row.productPrice}</StyledTableCell>
              <StyledTableCell align="center">
                <Button
                  color="error"
                  variant="outlined"
                  startIcon={<DeleteIcon />}
                  onClick={() => {
                    deleteItem(row._id);
                  }}
                >
                  Remove Item
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
