export const formatCurrencyVND = (money) => {
  return parseFloat(money).toLocaleString('en-US', {style : 'currency', currency : 'VND'})
}

export const subtotalItem = (price, quantity) => {
  const subtotal = parseFloat(price) * parseFloat(quantity)
  return formatCurrencyVND(subtotal);
}

export const subtotalBill = (carts) => {
  const subtotal = carts.reduce((sum, cart) => {
    return sum + (cart.product.price * cart.quantity)
  }, 0)
  return subtotal
}

export const totalBill = (subtotal, delivery) => {
  return parseFloat(subtotal) + parseFloat(delivery)
}

export const checkValidity = ( value, rules ) => {
  let isValid = true;
  if ( !rules ) {
      return true;
  }
  if ( rules.required ) {
      isValid = value.trim() !== '' && isValid;
  }

  return isValid;
}
