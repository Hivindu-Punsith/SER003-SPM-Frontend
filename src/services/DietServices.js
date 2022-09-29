import axios from 'axios';
import StartUrl from '../configs/Url.json';

const CreateURL = StartUrl?.StartUrl + '/gym/diet/createDiet';
const GetAllURL = StartUrl?.StartUrl + '/gym/diet/getAllDiets';
const GetByIDURL = StartUrl?.StartUrl + '/gym/diet/getDietById/';
const UpdateURL = StartUrl?.StartUrl + '/gym/diet/updateDiet/';
const DeleteURL = StartUrl?.StartUrl + '/gym/diet/deleteDiet/';

export async function createDiet(data) {
  const alldata = {
    user_id:data?.user_id,
    workout_type: data?.workout_type,
    meal1: data?.meal1,
    meal2: data?.meal2,
    meal3: data?.meal3,
    meal4: data?.meal4,
    meal5: data?.meal5,
    meal6: data?.meal6,
  };
  let result;
  await axios
    .post(CreateURL, alldata)
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

export async function getAllDiets() {
  let result;
  await axios
    .get(GetAllURL)
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

export async function getDietById(id) {
  let result;
  await axios
    .get(GetByIDURL + id)
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

export async function updateDiet(id, data) {
  const alldata = {
    workout_type: data?.workout_type,
    meal1: data?.meal1,
    meal2: data?.meal2,
    meal3: data?.meal3,
    meal4: data?.meal4,
    meal5: data?.meal5,
    meal6: data?.meal6,
  };
  let result;
  await axios
    .put(UpdateURL + id, alldata)
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

export async function deleteDiet(id) {
  let result;
  await axios
    .delete(DeleteURL + id)
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
