import cart from '../store/cart';

export function createCartItemHTML(cartItem) {
    const container = document.createElement('div')
    const {quantity, price, id} = cartItem
    const total = (quantity * price).toFixed(2)
    container.classList.add('cart-item')

    const infoContainer = document.createElement('div')
    infoContainer.classList.add('info-cart');
    infoContainer.innerHTML = `
        <h3>${cartItem.name}</h3>
        <div class="price-info">
            <p aria-label="Quantity">${quantity}x</p>
            <p aria-label="Unit price">$${price}</p>
            <p aria-label="Total">$${total}</p>
        </div>`;

        const deleteBtn = document.createElement('button');
        deleteBtn.setAttribute('aria-label', `Remove ${cartItem.name} from cart`)
        deleteBtn.innerHTML = '<img src="/public/images/icon-remove-item.svg" alt="Remove item icon">';
        //event listener
        deleteBtn.addEventListener('click', () => {
            cart.deleteOfCart(id)
        })
        container.appendChild(infoContainer);
        container.appendChild(deleteBtn);
        return container;
}