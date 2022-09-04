import axios from 'axios';

import StartUrl from '../configs/Url.json';

const CreateURL = StartUrl?.StartUrl + '/gym/instructor/createInstructor';
const GetAllURL = StartUrl?.StartUrl + '/gym/instructor/getAllInstructors';
const GetByIDURL = StartUrl?.StartUrl + '/gym/instructor/getInstructorById/';
const UpdateURL = StartUrl?.StartUrl + '/gym/instructor/updateInstructor/';
const DeleteURL = StartUrl?.StartUrl + '/gym/instructor/deleteInstructor/';

export async function createInstructor(data) {
  const alldata = {
    instructor_id: data?.instructor_id,
    fullName: data?.fullName,
    mobileno: data?.mobileno,
    email: data?.email,
    dateOfBirth: data?.dateOfBirth,
    weight: data?.weight,
    height: data?.height,
    status: data?.status,
    salary: data?.salary,
    password: data?.password,
    userRole: data?.userRole,
    };
    let result;
    await axios.post(CreateURL, alldata)
        .then(function (data) {
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

export async function getAllInstructors() {
    let result;
    await axios.get(GetAllURL)
        .then(function (data) {
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

export async function getInstructorById(id) {
    let result;
    await axios.get(GetByIDURL + id)
        .then(function (data) {
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

export async function updateInstructor(data) {
    const alldata = {
        instructor_id: data?.instructor_id,
        fullName: data?.fullName,
        mobileno: data?.mobileno,
        email: data?.email,
        dateOfBirth: data?.dateOfBirth,
        weight: data?.weight,
        height: data?.height,
        status: data?.status,
        salary: data?.salary,
        password: data?.password,
        userRole: data?.userRole,
    };
    let result;
    await axios.put(UpdateURL + data?.instructor_id, alldata)
        .then(function (data) {
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

export async function deleteInstructor(id) {
    let result;
    await axios.delete(DeleteURL + id)
        .then(function (data) {
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