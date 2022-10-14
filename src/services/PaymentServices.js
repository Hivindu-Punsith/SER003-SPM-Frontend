import axios from "axios";

import StartUrl from "../configs/Url.json";

const CreateURL = StartUrl?.StartUrl + "/gym/payment/createPayment";
const GetAllURL = StartUrl?.StartUrl + "/gym/payment/getAllPayments";
const GetByIDURL = StartUrl?.StartUrl + "/gym/payment/getPaymentById/";


 
export async function createPayment(data) {
    const alldata = {
        name: data?.name,
        email: data?.email,
        mobile: data?.mobile,
        address:data?.address,
        method:data?.method,
        total:data?.total,
        Items:data?.Items


    } 
    let result;
    await axios.post(CreateURL,alldata)
     .then(function(data) {
         result = data;
     })
     .catch(function (error) {
         if (error.response) {
           result = error.response;
         } else if (error.request) {
           result = error.request;
         } 
       });
  return result; 
}
  
export async function getAllPayments(){
    let result;
    await axios.get(GetAllURL)
     .then(function(data) {
        
         result = data;
     })
     .catch(function (error) {
         if (error.response) {
          
           result = error.response;
         } else if (error.request) {
           
           result = error.request;
         } 
       });
  return result; 
   
}
  
export async function getPaymentById(id){
    let result;
    await axios.get(GetByIDURL + id)
     .then(function(data) {
        
         result = data;
     })
     .catch(function (error) {
         if (error.response) {
         
           result = error.response;
         } else if (error.request) {
          
           result = error.request;
         } 
       });
  return result; 
}
















// import axios from 'axios';
// import StartUrl from "../configs/Url.json";

// const getAllPaymentsURL = StartUrl?.StartUrl + "/gym/payment/getPayments";
// const CreatetURL = StartUrl?.StartUrl + "/gym//payment/createPayment";
// const GetPaymentByIDURL = StartUrl?.StartUrl + "/gym//payment/Payments/";


// export async function getAllPayments() {
//     return axios.get(getAllPaymentsURL)
    
// }

// export async function getPaymentByID(id) {
//     return axios.get(GetPaymentByIDURL + id);
// }

// export async function createNewPayment(formData) {
//     const alldata = {

        

//         name:formData.name.value ,
        
//         address:formData.address.value ,
        
//         method:formData.method.value ,
        
//     }

//     console.log("alldata",alldata)

//     return await axios.post(CreatetURL, alldata);
    
// }





