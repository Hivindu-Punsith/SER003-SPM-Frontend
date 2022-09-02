import React from "react";
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Logo from "../../assests/images/gym.png";



const Dashboard = () => {

	return (
		<div>
			<center>
				<table>
					<tr>
						<td>
							<center><h1 style={{marginTop: '200px',marginBottom: '20px',color:"black"}}>Welcome to the system {localStorage.getItem("user")}</h1></center>
							<center><h2 style={{marginTop: '20px',marginBottom: '20px',color:"red"}}>Your Role : {localStorage.getItem("userRole")}</h2></center>
						</td>
					</tr>
					<tr>
						<td>
							<img src={Logo} style={{ width: 600,  marginBottom: '300px', marginLeft: '10px', marginRight: '10px' }}></img>
						</td>
					</tr>
				</table>
			</center>
		</div>
	);
};


export default Dashboard;
