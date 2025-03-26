import { Dessert } from '../models/dessert.model';

//state
let cart = JSON.parse(localStorage.getItem('cart')) || [];

//en mi app asignare la funcion que actualizara mi ui.
let onCartChange = () => { };
function setOnCartChange(callback) {
    onCartChange = callback;
}

function updateLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart))
    onCartChange();
}

/**
 * 
 * @param {Number} dessertId
 */
function findById(dessertId) {
    const itemInCart = cart.find(cartItem => cartItem.id === dessertId);
    return itemInCart;
}

/**
 * 
 * @param {Dessert} dessert
 */
function addToCart(dessert) {
    cart.push({ ...dessert, quantity: 1 })
    updateLocalStorage()
}
/**
 *
 * @param {Object} itemCart
 */
function increment(itemCart) {
    itemCart.quantity+=1
    updateLocalStorage()
}

/**
 * 
 * @param {Number} cartItemId
 */
function deleteOfCart(cartItemId){
    cart = cart.filter(cartItem => cartItem.id !== cartItemId)
    updateLocalStorage()
}

/**
 * 
 * @param {Object} cartItem
 */
function decrement(cartItem) {
    if(cartItem.quantity > 1){
        cartItem.quantity-=1
    }
    updateLocalStorage()
}

function restartCart(){
    cart = [];
    updateLocalStorage()
}

export default {
    cart,
    findById,
    setOnCartChange,
    addToCart,
    increment,
    decrement,
    deleteOfCart,
    restartCart
}