const cart = [
  { item: "apple", price: 2, category: "fruit" },
  { item: "milk", price: 5, category: "dairy" },
  { item: "bread", price: 4, category: "bakery" }
];


const vendorLedger = cart.reduce((acc, cartItem)=> {
return {
    totalItems : acc.totalItems + 1,
    totalPrice: acc.totalPrice + cartItem.price,
    fruitItems: cartItem.category ==="fruit" ? acc.fruitItems + 1 : acc.fruitItems
}
}, {
    totalItems: 0,
    totalPrice: 0,
    fruitItems: 0
});

console.log(vendorLedger);