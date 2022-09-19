import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select"
import Swal from 'sweetalert2';
import card from "../../assests/images/card.png";
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
import { validateAddPayment } from "../Products/paymentValidation";
import { ValidateAddNewCard } from "../Products/cardValidation";
import { createPayment } from "../../services/PaymentServices";
import { createCard } from "../../services/cardServices";



const Payment = () => {

    const navigate = useNavigate();
    const [openModal, setopenModal] = useState(false);

    //---------model from--------------//
    const [ctype, setType] = useState("");
    const [holder, setHolder] = useState("");
    const [cardNum, setCardNum] = useState("");
    const [year, setYear] = useState("");
    const [month, setMonth] = useState("");
    const [cvv, setCvv] = useState("");

    // const [data, setData] = useState({
    //     name: "",
    //     address: "",
    //     method: "",

    // });

    const handleType = ({ currentTarget: input }) => {
        setType({ ...data, [input.type]: input.value });
    };

    //    const handleType = (e) => {
    //         e.preventDefault();
    //         setType(e.target.value)
    //     }
    const handleHolder = (e) => {
        e.preventDefault();
        setHolder(e.target.value)
    }
    const handleCardNum = (e) => {
        e.preventDefault();
        setCardNum(e.target.value)
    }
    const handleYear = (e) => {
        e.preventDefault();
        setYear(e.target.value)
    }
    const handleMonth = (e) => {
        e.preventDefault();
        setMonth(e.target.value)
    }
    const handleCvv = (e) => {
        e.preventDefault();
        setCvv(e.target.value)
    }

    const addCard = async (e) => {

        e.preventDefault();

        const carddata = {
            ctype: ctype,
            holder: holder,
            cardNum: cardNum,
            year: year,
            month: month,
            cvv: cvv

        }

        console.log("card data ", carddata)
        let validate = ValidateAddNewCard(carddata);

        let msg = validate.message;

        console.log(msg);
        if (validate.status == false) {
            Swal.fire({
                toast: true,
                icon: 'warning',
                html: `<span>${msg}</span>`,
                animation: true,
                position: 'top-right',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: false,
            });
            //alert(validate.message);
        }
        else {
            let data = await createCard(carddata);
            if (data?.data?.status === 1) {
                Swal.fire({
                    icon: 'success',
                    title: 'Successful!',
                    text: 'Card details entered',
                })
                navigate("/thankyou")
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Failed!',
                })
            }
        }

    }

    const [data, setData] = useState({
        name: "",
        address: "",
        method: "",

    });

    // let methodList = [
    //     { value: "cash", label: "Cash On Delivery", name: "method" },
    //     { value: "card", label: "Card", name: "method" },

    // ];

    const handelSelectorChange = (e) => {
        console.log(e);
        setData({ ...data, [e.name]: e });
    }


    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };


    const addPayment = async (e) => {

        e.preventDefault();

        let validate = validateAddPayment(data);
        let msg = validate?.message;
        if (validate.status == false) {
            Swal.fire({
                toast: true,
                icon: 'warning',
                html: `<span>${msg}</span>`,
                animation: true,
                position: 'top-right',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: false,
            });
        }
        else {
            let newdata = await createPayment(data);
            console.log(" payment data ", newdata);
            if (newdata?.status == 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Successful!',
                    text: 'payment success!',
                })
                navigate("/thankyou");

            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Failed!',
                })
            }
        }


    }

    return (
        <div class='card' style={{ width: '700px', marginLeft: '450px', backgroundColor: '#F5FFFA', display: 'flex', marginBottom: '30px', marginTop: '30px' }}>
            <div style={{ margin: "10px" }}>

                <center>
                    <CardTitle style={{ color: "black", fontSize: "30px" }}><h2><b>Billing Details</b></h2></CardTitle>


                </center>


                <div className="container" style={{ width: '50%', }}>
                    <form className='form-group' onSubmit={addPayment} >
                        <label style={{ marginTop: '15px' }}>Enter Your Name</label>
                        <input
                            className='form-control'
                            name="name"
                            onChange={handleChange}
                            value={data.name}

                        />

                        <label style={{ marginTop: '15px' }}>Enter Your Email</label>
                        <input
                            className='form-control'
                            name="email"
                            onChange={handleChange}
                            value={data.email}

                        />

                        <label style={{ marginTop: '15px' }}>Enter Your Mobile Number</label>
                        <input
                            className='form-control'
                            name="mobile"
                            onChange={handleChange}
                            value={data.mobile}

                        />

                        <label style={{ marginTop: '15px' }}>Enter Your Address</label>
                        <textarea
                            className='form-control'
                            name="address"
                            onChange={handleChange}
                            value={data.address}


                        />

                        <label style={{ marginTop: '15px' }}>Select Payment Method</label>
                        <br></br>
                        <input type="radio" value="cash" name="method" onChange={handleChange} /> Cash On Delivery
                        &nbsp;&nbsp;&nbsp;
                        <input type="radio" value="card" name="method" onClick={() => setopenModal(true)} /> Card

                        <div>
                            <Modal
                                isOpen={openModal}
                                className="modal-dialog-centered"
                                fade={true}
                                backdrop={true}>
                                <ModalHeader
                                    toggle={() => {
                                        setopenModal(false);
                                    }}>
                                    <Label>Card Details</Label>
                                    <p></p>
                                </ModalHeader>
                                <ModalBody>
                                    <div style={{ width: "300px" }}>
                                        <Form>
                                            <img src={card} style={{ width: 170, float: 'right' }}></img>
                                            <br></br>
                                            <br></br>
                                            <Label>Card Type</Label>
                                            <br></br>
                                            <input type="radio" value="visa" name="ctype" onChange={handleType} /> VISA
                                            &nbsp; &nbsp;
                                            <input type="radio" value="master" name="ctype" onChange={handleType} /> Master
                                            &nbsp; &nbsp;
                                            <input type="radio" value="american" name="ctype"  onChange={handleType}/> American Express
                                            &nbsp; &nbsp;


                                            <br></br>
                                            <Label>Card Holder Name</Label>
                                            <Input type="text" className="input" placeholder="Name" value={holder} onChange={(e) => handleHolder(e)} />
                                            <br />

                                            <Label>Card Number</Label>
                                            <Input type="text" className="input" placeholder="Card number" value={cardNum} onChange={(e) => handleCardNum(e)} />
                                            <br />
                                            <table>
                                                <tr>
                                                    <td>
                                                        <Label>Year</Label>
                                                        <Input type="text" className="input" placeholder="year" value={year} onChange={(e) => handleYear(e)} />
                                                        &nbsp; &nbsp;
                                                    </td>
                                                    <td>
                                                        <Label>Month</Label>
                                                        <Input type="text" className="input" placeholder="month" value={month} onChange={(e) => handleMonth(e)} />
                                                        &nbsp; &nbsp;
                                                    </td>
                                                    <td>
                                                        <Label>CVV</Label>
                                                        <Input type="text" className="input" placeholder="cvv" value={cvv} onChange={(e) => handleCvv(e)} />
                                                        &nbsp; &nbsp;
                                                    </td>
                                                </tr>
                                            </table>



                                            <Button className="btn btn-dark" onClick={(e) => addCard(e)} style={{ marginTop: "20px" }}>Confirm Payment</Button>

                                        </Form>
                                    </div>
                                </ModalBody>
                            </Modal>
                        </div>

                        {/* <Select
                            className="React"
                            classNamePrefix="select"
                            options={methodList}
                            value={data.method}
                            onChange={(e) => handelSelectorChange(e)}
                            name="method"
                        /> */}



                        <center>
                            <br></br>
                            <button style={{ marginTop: '15px', marginBottom: '15px', width: '200px' }} type="submit" className="btn btn-dark" >
                                Confirm Order
                            </button></center>
                    </form>
                </div>
            </div>

        </div>

    );

};

export default Payment;