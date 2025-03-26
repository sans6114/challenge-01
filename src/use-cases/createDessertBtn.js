import cart from '../store/cart';

function btnForCart(cartItem) {
    const container = document.createElement('div');
    container.className = 'btn modify';

    // Crear botón de incremento
    const btnToIncrement = createIncrementBtn();
    btnToIncrement.addEventListener('click', () => {
        cart.increment(cartItem);
    });

    // Crear span con la cantidad
    const span = createSpanElement(cartItem.quantity);

    // Crear botón de decremento
    const btnToDecrement = createDecrementButton();
    btnToDecrement.addEventListener('click', () => {
        cart.decrement(cartItem)
    });

    // Agregar elementos al contenedor
    container.appendChild(btnToIncrement);
    container.appendChild(span);
    container.appendChild(btnToDecrement);

    return container;
}
//funcion que crea un boton para cuando el item no pertenece al carrito
function btnNormal(dessert) {
    const btn = document.createElement('button')
    btn.className = 'btn';
    btn.innerHTML = `<img src="/public/images/icon-add-to-cart.svg" alt="image of empty cart">Add to cart`;
    btn.addEventListener('click', () => {
        cart.addToCart(dessert);
    })
    return btn;
}
//funcion que crea el boton de incremento
function createIncrementBtn() {
    const btnToIncrement = document.createElement('button');
    btnToIncrement.setAttribute('id', 'increment');
    btnToIncrement.classList.add('modify-quantity');
    btnToIncrement.textContent = '+';

    return btnToIncrement;
}
//funcion que crea el boton de decremento
function createDecrementButton() {
    const btnToDecrement = document.createElement('button');
    btnToDecrement.setAttribute('id', 'decrement');
    btnToDecrement.classList.add('modify-quantity');
    btnToDecrement.textContent = '-';
    return btnToDecrement;
}
//funcion para el numerito de mi btn
function createSpanElement(text) {
    const spanElement = document.createElement('span')
    spanElement.textContent = text
    return spanElement;
}

export function renderButton(dessert, cartItem) {
    return !!cartItem ? btnForCart(cartItem) : btnNormal(dessert)
}