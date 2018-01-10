//handles update of the object in a immutable manner
export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  };
};

//set the value property in the state according to the given data
export const onChange = (val, key, state) => {
  let touched = true;

  if (val === '') {
    touched = false;
  }

  let updatedvalue = updateObject(state.truckingDetails[key], {
    value: val,
    valid: checkValidity(val, state.truckingDetails[key].validation),
    touched: touched
  });
  let updatedTruckingDetails = updateObject(state.truckingDetails, {
    [key]: updatedvalue
  });

  let isValid = true;
  for (let key in updatedTruckingDetails) {
    isValid = updatedTruckingDetails[key].valid && isValid;
  }

  return {
    truckingDetails: updatedTruckingDetails,
    isValid: isValid
  };
};

//check the validity of the inputs
export const checkValidity = (value, rules) => {
  let isValid = true;
  if (!rules) {
    return true;
  }

  if (rules.required) {
    isValid = value.trim() !== '' && isValid;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }

  if (rules.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid;
  }

  if (rules.isNumeric) {
    const pattern = /^\d+$/;
    isValid = pattern.test(value) && isValid;
  }

  return isValid;
};
