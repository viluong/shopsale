export const formatCurrencyVND = (money) => {
  return parseFloat(money).toLocaleString('en-US', {style : 'currency', currency : 'VND'})
}

export const checkValidity = ( value, rules ) => {
  let isValid = true;
  if ( !rules ) {
      return true;
  }
  if ( rules.required ) {
    try {
      isValid = value.trim() !== '' && isValid;
    } catch( err) {
      console.log(err)
      isValid = value !== '' && isValid;
    }
  }
  if ( rules.type) {
    if (rules.type === 'email') {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid
    }
  }
  return isValid;
}

export const formatDateTime = (datetime) => {
  const endIndex = datetime.indexOf('.')
  const formatDateTime = new Date(datetime.substring(0, endIndex))
  return formatDateTime
}

export const updateObject = (oldObject, updatedProperties) => {
  return {
      ...oldObject,
      ...updatedProperties
  };
};
