export const ValidateAddNewWorkout = (formData) => {
  const messages = {
    WORKOUT_NAME_EMPTY: "The name should at least be 3 letters...",
    WORKOUT_TYPE_EMPTY: "Please select a workout type...",
  };

  const output = {
    status: false,
    message: null,
  };

  // if (formData.workout_type.length <= 0) {
  //   output.message = messages.WORKOUT_TYPE_EMPTY;
  //   output.status = false;
  //   return output;
  // }

  if (formData.exercise1.length <= 2) {
    output.message = messages.WORKOUT_NAME_EMPTY;
    output.status = false;
    return output;
  }

  if (formData.exercise2.length <= 2) {
    output.message = messages.WORKOUT_NAME_EMPTY;
    output.status = false;
    return output;
  }

  if (formData.exercise3.length <= 2) {
    output.message = messages.WORKOUT_NAME_EMPTY;
    output.status = false;
    return output;
  }

  if (formData.exercise4.length <= 2) {
    output.message = messages.WORKOUT_NAME_EMPTY;
    output.status = false;
    return output;
  }

  if (formData.exercise5.length <= 2) {
    output.message = messages.WORKOUT_NAME_EMPTY;
    output.status = false;
    return output;
  }

  if (formData.exercise6.length <= 2) {
    output.message = messages.WORKOUT_NAME_EMPTY;
    output.status = false;
    return output;
  } else {
    output.status = true;
    return output;
  }
};

export const ValidateAddNewMeal = (formData) => {
  const messages = {
    MEAL_NAME_EMPTY: "The meal should at least be 5 letters...",
    WORKOUT_TYPE_EMPTY: "Please select a workout type...",
  };

  const output = {
    status: false,
    message: null,
  };

  // if (formData.workout_type.length <= 0) {
  //   output.message = messages.MEAL_TYPE_EMPTY;
  //   output.status = false;
  //   return output;
  // }

  if (formData.meal1.length <= 2) {
    output.message = messages.MEAL_NAME_EMPTY;
    output.status = false;
    return output;
  }

  if (formData.meal2.length <= 2) {
    output.message = messages.MEAL_NAME_EMPTY;
    output.status = false;
    return output;
  }

  if (formData.meal3.length <= 2) {
    output.message = messages.MEAL_NAME_EMPTY;
    output.status = false;
    return output;
  }

  if (formData.meal4.length <= 2) {
    output.message = messages.MEAL_NAME_EMPTY;
    output.status = false;
    return output;
  }

  if (formData.meal5.length <= 2) {
    output.message = messages.MEAL_NAME_EMPTY;
    output.status = false;
    return output;
  }

  if (formData.meal6.length <= 2) {
    output.message = messages.MEAL_NAME_EMPTY;
    output.status = false;
    return output;
  } else {
    output.status = true;
    return output;
  }
};
