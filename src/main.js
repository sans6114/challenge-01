//json con mi informacion para cada card
import desserts from './desserts/dessert.json';

// obtengo mi carrito del localStorage, si no existe creo un array vacio
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function founded(id) {
  return cart.find(cartItem => cartItem.id === id);
}


function updateStateBtn(btn, dessert) {
  const itemInCart = founded(dessert.id)
  if (itemInCart) {
    const myNewButton = document.createElement('div')
    myNewButton.className = btn.className
    myNewButton.classList.add('modify')
    myNewButton.innerHTML = `<button class="modify-quantity increment">+</button><span>${itemInCart.quantity}</span><button class="modify-quantity decrement">-</button>`
    
    // Reemplazar el botón con los controles
    //button de incremento:
    const btnIncrement = myNewButton.querySelector('.modify-quantity.increment')
    btnIncrement.addEventListener('click', (e) => {
      e.stopPropagation()
      //logica
      updateStateBtn(btn, dessert)
      console.log('hola')
    })
    //button decremento:
    const btnDecrement = myNewButton.querySelector('.modify-quantity.decrement')
    btnDecrement.addEventListener('click', (e) => {
      e.stopPropagation()
      //logica
      updateStateBtn(btn, dessert)
      console.log('hola')
    })
    btn.replaceWith(myNewButton)
    return myNewButton
  } else {
    if(btn.classList.contains('modify')){
      btn.classList.remove('modify')
    }
    btn.innerHTML = `<img src="/public/images/icon-add-to-cart.svg" alt="" srcset="">Add to cart`
    return btn;
  }
}

const btnRender = (dessert) => {
  const btn = document.createElement('button')
  btn.classList.add('btn')
  //pongo el estado inicial de mi boton
  updateStateBtn(btn, dessert)
  //agrego el listener para mi boton
  btn.addEventListener('click', () => {
    //existe mi item en el carrito?
    const itemInCart = founded(dessert.id)
    if (itemInCart) {
      itemInCart.quantity += 1
    } else {
      cart.push({ ...dessert, quantity: 1 })
    }
    //seteo mi nuevo cart en localStorage
    localStorage.setItem('cart', JSON.stringify(cart))
    //vuelvo a renderizar mis botones
    updateStateBtn(btn, dessert)
  })
  return btn;
}

const createCardDessert = (dessert) => {
  const card = document.createElement('div')
  card.setAttribute('id', dessert.id)
  card.classList.add('dessert-card')
  card.innerHTML = `<img src="${dessert.image}" alt="${dessert.name}">
  <div class="dessert-info">
  <p>${dessert.category}</p>
  <h3>${dessert.name}</h3>
  <p>$${dessert.price}</p>
  </div>`
  //boton para colocar
  const btnForCard = btnRender(dessert)
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
//funcion que crea todas mis cards
createCards(desserts)



//container de mi carrito
const cartContainer = document.querySelector('#cart-container')
//heading de mi carrito
const cartHeading = document.querySelector('#cart-heading')



































//cart
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




