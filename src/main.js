//json con mi informacion para cada card
import desserts from './desserts/dessert.json';

// obtengo mi carrito del localStorage, si no existe creo un array vacio
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function btnToColocate (dessert){
  const btn = document.createElement('button')
  btn.classList.add('btn')
  const cartFounded = cart.find(cartItem => cartItem.name === dessert.name)
  if(cartFounded){
    btn.classList.add('modify')
    btn.innerHTML = `<span class="modify-quantity">+</span><span>1</span><span class="modify-quantity">-</span>`
  } else{
      btn.innerHTML = `<img src="/public/images/icon-add-to-cart.svg" alt="" srcset="">Add to cart`
  }
  return btn
}

const createCardDessert = (dessert) => {
  const card = document.createElement('div')
  card.classList.add('dessert-card')
  card.innerHTML = `<img src="${dessert.image}" alt="${dessert.name}">
  <div class="dessert-info">
  <h3>${dessert.name}</h3>
  <p>${dessert.category}</p>
  <p>$${dessert.price}</p>
  </div>`
  //boton para colocar
  const btnForCard = btnToColocate(dessert)
  card.appendChild(btnForCard)
  return card;
}
export const createCards = (desserts) => {
  //contenedor para mis cards
  const dessertsContainer = document.querySelector('.desserts')
  desserts.map((dessert) => {
    dessertsContainer.append(createCardDessert(dessert))
  })
}
//funcion que crea el html para mi card
createCards(desserts)

function renderButton(dessert) {
  return console.log(dessert)
}

//container de mi carrito
const cartContainer = document.querySelector('#cart-container')
//heading de mi carrito
const cartHeading = document.querySelector('#cart-heading')



const renderEmptyCart = () => {
  return cartContainer.innerHTML = `
  <div class="cart-empty">
  <img src="/public/images/illustration-empty-cart.svg" alt="Empty cart illustration">
  <p>Your added items will appear here</p>
  </div>`
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
  btn.addEventListener('click', () => {
    const card = btn.closest('.dessert-card')
    const productName = card.querySelector('h3').textContent
    const cardSelected = desserts.find(dessert => dessert.name === productName)
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
    //llamar a que cambie el carrito
    renderCart()
    renderButton(btn, !!findInCart, findInCart)
  })
})
