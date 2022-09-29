import axios from 'axios';
import StartUrl from '../configs/Url.json';

const CreateURL = StartUrl?.StartUrl + '/gym/workout/createWorkout';
const GetAllURL = StartUrl?.StartUrl + '/gym/workout/getAllWorkouts';
const GetByIDURL = StartUrl?.StartUrl + '/gym/workout/getWorkoutById/';
const UpdateURL = StartUrl?.StartUrl + '/gym/workout/updateWorkout/';
const DeleteURL = StartUrl?.StartUrl + '/gym/workout/deleteWorkout/';

export async function createWorkout(data) {
  const alldata = {
    user_id:data?.user_id,
    workout_type: data?.workout_type,
    exercise1: data?.exercise1,
    exercise2: data?.exercise2,
    exercise3: data?.exercise3,
    exercise4: data?.exercise4,
    exercise5: data?.exercise5,
    exercise6: data?.exercise6,
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

export async function getAllWorkouts() {
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

export async function getWorkoutById(id) {
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

export async function updateWorkout(id, data) {
  const alldata = {
    workout_type: data?.workout_type,
    exercise1: data?.exercise1,
    exercise2: data?.exercise2,
    exercise3: data?.exercise3,
    exercise4: data?.exercise4,
    exercise5: data?.exercise5,
    exercise6: data?.exercise6,
  };
  let result;
  await axios.put(UpdateURL + id, alldata)
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

export async function deleteWorkout(id) {
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
