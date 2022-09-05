import axios from "axios";

import StartUrl from "../configs/Url.json";

const CreateNewUserURL = StartUrl?.StartUrl + "/gym/user/create-user";
const GetAllUsersURL = StartUrl?.StartUrl + "/gym/user/all-users";
const UpdateUserInstructorURL = StartUrl?.StartUrl + "/gym/user/update-instructor/";
const UpdateUsermemberShipURL = StartUrl?.StartUrl + "/gym/user/update-memberShip/";

export async function AddNewUsers(data){
    const alldata = {
        fullName:data?.fullName,
        mobileno:data?.mobileno,
        email:data?.email,
        weight:data?.weight,
        dateOfBirth:data?.dateOfBirth,
        height:data?.height
    
    }

    let result;
    await  axios.post(CreateNewUserURL,alldata)
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

export async function GetAllUserDetails(){
    let result;
    await  axios.get(GetAllUsersURL)
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


export async function UpdateUserInstructor (id,UserUpdatedData){
  let result;
  await  axios.put(UpdateUserInstructorURL+id,UserUpdatedData)
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

export async function UpdateUsermemberShip (id,UserUpdatedData){
  let result;
  await  axios.put(UpdateUsermemberShipURL+id,UserUpdatedData)
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