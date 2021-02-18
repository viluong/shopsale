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

export const formatOrderData = (address, carts) => {
  const order = {
    order_lines: carts.map((cart) => {
      return {
        product_id: cart.product.id,
        quantity: cart.quantity,
        price: cart.product.price
      }
    }),
    delivery_fee: 0,
    ship_name: address.firstName + " " + address.lastName,
    ship_phone: "0213213122",
    ship_address: address.address1,
    ship_city: address.city,
    ship_district: address.district,
    payment_method: "PAYVN", 
  }
  console.log("order", order)
  return order;
}