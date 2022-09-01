import axios from "axios";

import StartUrl from "../configs/Url.json";

const CreateURL = StartUrl?.StartUrl + "/gym/equipment/createEquipment";
const GetAllURL = StartUrl?.StartUrl + "/gym/equipment/getAllEquipments";
const GetByIDURL = StartUrl?.StartUrl + "/gym/equipment/getEquipmentById/";
const UpdateURL = StartUrl?.StartUrl + "/gym/equipment/updateEquipment/";
const DeleteURL = StartUrl?.StartUrl + "/gym/equipment/deleteEquipment/";

 
export async function createEquipment(data) {
    const alldata = {
        name: data?.name,
        quantity:data?.quantity,
        value:data?.value,
        company_name:data?.company_name,
        date_of_purchaced:data?.date_of_purchaced,
        category:data?.category,
    } 
    let result;
    await axios.post(CreateURL,alldata)
     .then(function(data) {
         //console.log("success data",data)
         result = data;
     })
     .catch(function (error) {
         if (error.response) {
           //console.log(error.response.data);
           result = error.response;
         } else if (error.request) {
           //console.log(error.request);
           result = error.request;
         } 
       });
  return result; 
}
  
export async function getAllEquipments(){
    let result;
    await axios.get(GetAllURL)
     .then(function(data) {
         //console.log("success data",data)
         result = data;
     })
     .catch(function (error) {
         if (error.response) {
           //console.log(error.response.data);
           result = error.response;
         } else if (error.request) {
           //console.log(error.request);
           result = error.request;
         } 
       });
  return result; 
   
}
  
export async function getEquipmentById(id){
    let result;
    await axios.get(GetByIDURL + id)
     .then(function(data) {
         //console.log("success data",data)
         result = data;
     })
     .catch(function (error) {
         if (error.response) {
           //console.log(error.response.data);
           result = error.response;
         } else if (error.request) {
           //console.log(error.request);
           result = error.request;
         } 
       });
  return result; 
}
  
export async function updateEquipment(id,data) {
    const alldata = {
        name: data?.name,
        quantity:data?.quantity,
        value:data?.value,
        company_name:data?.company_name,
        date_of_purchaced:data?.date_of_purchaced,
        category:data?.category,
    } 
    let result;
    await  axios.put(UpdateURL + id,alldata)
     .then(function(data) {
         //console.log("success data",data)
         result = data;
     })
     .catch(function (error) {
         if (error.response) {
           //console.log(error.response.data);
           result = error.response; 
         } else if (error.request) {
           //console.log(error.request);
           result = error.request;
         }  
       });
  return result; 
}
  
export async function deleteEquipment(id) {
    let result;
    await axios.delete(DeleteURL + id)
     .then(function(data) {
         //console.log("success data",data)
         result = data;
     })
     .catch(function (error) {
         if (error.response) {
           //console.log(error.response.data);
           result = error.response;
         } else if (error.request) {
           //console.log(error.request);
           result = error.request;
         } 
       });
  return result; 
}