import cart from '../store/cart';
import { createCartItemHTML } from './createCartItem';

let element;


export function renderCart(elementID) {
    element = document.querySelector(elementID);
    if(!element) throw new Error("Elemento del dom no existe con ese id")
    element.innerHTML = '';
    actualizarNumero()
    if (cart.cart.length > 0) {
        //TODO: ACTUALIZARNUMERO()
        cart.cart.forEach(cartItem => {
            element.appendChild(createCartItemHTML(cartItem))
        });
    } else {
        element.append(renderEmptyCart());
    }
}

function actualizarNumero(){
    const heading = document.querySelector('#cart-heading')
    heading.textContent = `Your Cart (${cart.cart.length})`

}

function renderEmptyCart(){
const container = document.createElement('div')
container.classList.add('cart-empty')

const html = `<img src="/public/images/illustration-empty-cart.svg" alt="Empty cart illustration">
<p>Your added items will appear here</p>`

container.innerHTML = html;
return container;
}