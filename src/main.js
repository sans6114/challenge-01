import desserts from './desserts/dessert.json';
import { createCard } from './utils/createCard';

//funcion que crea el html para mi card
createCard(desserts)

const cartContainer = document.querySelector('#cart-container')
const cartHeading = document.querySelector('#cart-heading')

// obtengo mi carrito del localStorage, si no existe creo un array vacio
let cart = JSON.parse(localStorage.getItem('cart')) || [];


const renderEmptyCart = () => {
  return cartContainer.innerHTML = `
  <img id="img-empty" src="/public/images/illustration-empty-cart.svg" alt="Empty cart illustration">
  <p>Your added items will appear here</p>`
}

const renderCartItem = () => {
  const renderHtmlForCart = cart.map(cartItem => `
    <div class="cart-item">
      <!-- info de mi item -->
      <div class="info-cart">
        <h3>${cartItem.name}</h3>
        <div class="price-info">
          <p aria-label="Quantity">${cartItem.quantity}x</p>
          <p aria-label="Unit price">$${cartItem.price}</p>
          <p aria-label="Total">$${cartItem.quantity * cartItem.price}</p>
        </div>
      </div>
      <button aria-label="${`Remove ${cartItem.name} from cart`}">
        <img src="/public/images/icon-remove-item.svg" alt="Remove item icon">
      </button>
    </div>`).join('')
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const otherInfo = `
    <div class="total">
      <p>Order Total</p>
      <p>$${total.toFixed(2)}</p>
    </div>
    <button class="btn-confirmed">
      Confirm order
    </button>`
  cartContainer.innerHTML = renderHtmlForCart + otherInfo
}

const updateCartHeading = () => {
  cartHeading.textContent = `Your cart (${cart.length})`;
}

//funcion que renderiza el html de mi cart
function renderCart() {
  updateCartHeading()

  if (cart.length === 0) {
  //renderizo carrito vacio
  renderEmptyCart()
  } else {
    renderCartItem()
  }
}
renderCart()

//accedo a los botones creados por mis cards
const btnsAdd = document.querySelectorAll('.image-container button')
//listener de mi boton al hacer click en el
btnsAdd.forEach(btn => {
  btn.addEventListener('click', (event) => {
    const card = btn.closest('.dessert-card')
    const nameCard = card.querySelector('h3').textContent
    const cardSelected = desserts.find(dessert => dessert.name === nameCard)
    if (!cardSelected) return
    const findInCart = cart.find(itemCart => itemCart.name === cardSelected.name)
    if (findInCart) {
      //agregar cantidad
      findInCart.quantity += 1
    } else {
      //no esta el item en el cart, hay que agregarlo
      cart.push({ ...cardSelected, quantity: 1 })
    }
    localStorage.setItem('cart', JSON.stringify(cart))
    //llamar al que cambie el carrito
    renderCart()
  })
})
