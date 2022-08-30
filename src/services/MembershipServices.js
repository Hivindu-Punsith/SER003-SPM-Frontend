import axios from "axios";

import StartUrl from "../configs/Url.json";

const CreateURL = StartUrl?.StartUrl + "/gym/membership/createMembership";
const GetAllURL = StartUrl?.StartUrl + "/gym/membership/getAllMemberships";
const GetByIDURL = StartUrl?.StartUrl + "/gym/membership/getMembershipById/";
const UpdateURL = StartUrl?.StartUrl + "/gym/membership/updateMembership/";
const DeleteURL = StartUrl?.StartUrl + "/gym/membership/deleteMembership/";

 
export async function createMembership(data) {
    const alldata = {
        name: data?.name,
        price:data?.price,
        duration:data?.duration,
        description:data?.description
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
  
export async function getAllMemberships(){
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
  
export async function getMembershipById(id){
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
  
export async function updateMembership(id,data) {
    const alldata = {
        name: data?.name,
        price:data?.price,
        duration:data?.duration,
        description:data?.description
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
  
export async function deleteMembership(id) {
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