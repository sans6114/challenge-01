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

    const html = `<img src="/public/images/illustration-empty-cart.svg" alt="Empty cart illustration">
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
        modal.open = true;
        document.body.classList.add('no-scroll');
        const closeBtn = modal.querySelector('button')
        closeBtn.addEventListener('click', () => {
            if(document.body.classList.contains('no-scroll')){
                document.body.classList.remove('no-scroll')
            }
        })
        

        //actualCart.forEach(cartItem => {
    //const { id, name, image, category, price } = cartItem;

            
      //  })

        console.log(actualCart, total)
    })

return confirmedBtn;
}