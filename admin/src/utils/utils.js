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

export const dataUrlToFile = (dataurl, filename) => {
  const arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
  bstr = atob(arr[1]),n = bstr.length, u8arr = new Uint8Array(n);
  let i = n
  while(i--) {
    u8arr[i] = bstr.charCodeAt(i);
  }
  return new File([u8arr], filename, {type:mime});
}

export const toDataURL = async url => await fetch(url)
  .then(response => response.blob())
  .then(blob => new Promise((resolve, reject) => {
  const reader = new FileReader()
  reader.onloadend = () => resolve(reader.result)
  reader.onerror = reject
  reader.readAsDataURL(blob)
}))