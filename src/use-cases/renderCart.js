import cart from '../store/cart';
import { createCartItemHTML } from './createCartItem';

let element;



export function renderCart(elementID) {
    const cartLS = JSON.parse(localStorage.getItem('cart') || []);
    const total = cartLS.reduce((acc, item) => acc + item.price * item.quantity, 0)
    element = document.querySelector(elementID);
    if (!element) throw new Error("Elemento del dom no existe con ese id")
    element.innerHTML = '';
    actualizarNumero(cartLS.length)
    if (cartLS.length > 0) {
        cartLS.forEach(cartItem => {
            element.appendChild(createCartItemHTML(cartItem))
        });
        const totalElement = renderTotal(total)
        const confirmOrderBtn = renderConfirmedBtn(cartLS, total)
        element.appendChild(totalElement)
        element.appendChild(confirmOrderBtn)
    } else {
        element.appendChild(renderEmptyCart());
    }
    return element;
}

function actualizarNumero(numberItemsInCart) {
    const heading = document.querySelector('#cart-heading')
    heading.textContent = `Your Cart (${numberItemsInCart})`

}

function renderEmptyCart() {
    const container = document.createElement('div')
    container.classList.add('cart-empty')

    const html = `<img src="/images/illustration-empty-cart.svg" alt="Empty cart illustration">
<p>Your added items will appear here</p>`

    container.innerHTML = html;
    return container;
}


function renderTotal(total) {
    const totalContainer = document.createElement('div')
    totalContainer.classList.add('total')
    totalContainer.innerHTML = `<p>Order Total</p><p>$${total.toFixed(2)}</p>`
    return totalContainer;
}

function renderConfirmedBtn(actualCart, total) {
    const confirmedBtn = document.createElement('button')
    confirmedBtn.classList.add('btn-confirmed')
    confirmedBtn.textContent = 'Confirm order'
    //event listener
    confirmedBtn.addEventListener('click', () => {
        const modal = document.querySelector('dialog')
        const purchaseContainer = modal.querySelector('.purchase-container')
        purchaseContainer.innerHTML = '';
        modal.showModal();
        document.body.classList.add('no-scroll');
        const closeBtn = modal.querySelector('button')
        closeBtn.addEventListener('click', () => {
            document.body.classList.remove('no-scroll')
            cart.restartCart()
        })
        if (actualCart.length > 3) {
            purchaseContainer.classList.add('no-overflow')
        } else {
            purchaseContainer.classList.remove('no-overflow')
        }
        actualCart.forEach(cartItem => purchaseContainer.appendChild(renderPurchaseItem(cartItem)))
        const totalElement = renderTotal(total)
        purchaseContainer.appendChild(totalElement)
    })

    return confirmedBtn;
}

function renderPurchaseItem(cartItem) {
    const { id, name, image, category, price, quantity } = cartItem;
    const total = quantity * price
    const itemPurchase = document.createElement('div')
    itemPurchase.classList.add('purchase-item')
    itemPurchase.innerHTML = `<img src="${image}" alt="image of dessert: ${name}">
            <div class="purchase-item-info">
                <h3>Classic tiramissu</h3>
                <div class="purchase-price-quantity">
                    <p aria-label="Quantity">${quantity}x</p>
                    <p aria-label="Unit price">$${price}</p>
                </div>
            </div>
            <p aria-label="Total-product">$${total}</p>`
    return itemPurchase;
}