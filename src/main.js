//json con mi informacion para cada card
import desserts from './desserts/dessert.json';

// obtengo mi carrito del localStorage, si no existe creo un array vacio
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function founded(id) {
  return cart.find(cartItem => cartItem.id === id);
}

const increment = (item) => {
  return item.quantity += 1
}
const decrement = (item) => {
  if (item.quantity > 1) {
    item.quantity -= 1
  } else {
    alert('vas a borrar tu item del carrito')
    cart = cart.filter(itemCart => itemCart.id !== item.id)
    localStorage.setItem('cart', JSON.stringify(cart))

    const card = document.getElementById(item.id)
    if (card) {
      const newCard = createCardDessert(item)
      card.replaceWith(newCard)
    }
  }
  return item
}

//funcion que crea el boton de incremento
function createIncrementButton() {
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

function updateStateBtn(btn, dessert) {
  const itemInCart = founded(dessert.id);
  if (itemInCart) {
    const myNewButton = document.createElement('div');
    myNewButton.className = btn.className;
    myNewButton.classList.add('modify');
    //span con numero que muestra cantidad del item indicado en carrito
    let span = createSpanElement(itemInCart.quantity);
    //btns de incremento y decremento 
    const btnToIncrement = createIncrementButton();
    const btnToDecrement = createDecrementButton();

    myNewButton.appendChild(btnToIncrement)
    myNewButton.appendChild(span)
    myNewButton.appendChild(btnToDecrement)
    // Reemplazar el botón con los controles
    //button de incremento:
    const btnIncrement = myNewButton.querySelector('#increment');
    btnIncrement.addEventListener('click', (e) => {
      e.stopPropagation();
      //logica

      increment(itemInCart)
      renderCart();
      span.textContent = itemInCart.quantity
    });
    //button decremento:
    const btnDecrement = myNewButton.querySelector('#decrement');
    btnDecrement.addEventListener('click', (e) => {
      e.stopPropagation();
      //logica
      decrement(itemInCart)
      renderCart()
      span.textContent = itemInCart.quantity
    });
    btn.replaceWith(myNewButton);
    return myNewButton;
  } else {
    btn.className = 'btn';
    btn.innerHTML = `<img src="/public/images/icon-add-to-cart.svg" alt="imagen que muestra un carrito vacio">Add to cart`;
    return btn;
  }
}

const btnRender = (dessert) => {
  let btn = document.createElement('button')
  btn.classList.add('btn')
  //pongo el estado inicial de mi boton
  btn = updateStateBtn(btn, dessert)
  //agrego el listener para mi boton
  btn.addEventListener('click', () => {
    //existe mi item en el carrito?
    const itemInCart = founded(dessert.id)
    if (itemInCart) {
      itemInCart.quantity += 1
    } else {
      cart.push({ ...dessert, quantity: 1 })
      // Obtenemos la card y agregamos la clase selected
      const card = document.getElementById(dessert.id)
      card.classList.add('selected')
    }
    //seteo mi nuevo cart en localStorage
    localStorage.setItem('cart', JSON.stringify(cart))
    //vuelvo a renderizar mis botones
    btn = updateStateBtn(btn, dessert)
  })
  return btn;
}

const createCardDessert = (dessert) => {
  const card = document.createElement('div')
  card.setAttribute('id', dessert.id)
  card.classList.add('dessert-card')
  const isInCart = founded(dessert.id)
  isInCart ? card.classList.add('selected') : card.className = 'dessert-card'
  card.innerHTML = `<img src="${dessert.image}" alt="${dessert.name}">
  <div class="dessert-info">
  <p>${dessert.category}</p>
  <h3>${dessert.name}</h3>
  <p>$${dessert.price}</p>
  </div>`
  //boton para colocar
  const btnForCard = btnRender(dessert)
  card.appendChild(btnForCard);
  return card;
}

const createCards = (desserts) => {
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


const createCartItem = (cartItem) => {
  const cartCard = document.createElement('div')
  cartCard.classList.add('cart-item')

  const infoCartCard = document.createElement('div')
  infoCartCard.classList.add('info-cart')
  //agregar informacion
  infoCartCard.innerHTML = `
        <h3>${cartItem.name}</h3>
        <div class="price-info">
          <p aria-label="Quantity">${cartItem.quantity}x</p>
          <p aria-label="Unit price">$${cartItem.price}</p>
          <p aria-label="Total">$${cartItem.quantity * cartItem.price}</p>
        </div>`
  //btn para eleminar elementos
  const removeBtn = document.createElement('button')
  removeBtn.setAttribute('aria-label', `Remove ${cartItem.name} from cart`)
  removeBtn.innerHTML = `<img src="/public/images/icon-remove-item.svg" alt="Remove item icon">`

  //append de los elementos hijos en nodo padre
  cartCard.appendChild(infoCartCard)
  cartCard.appendChild(removeBtn)
  return cartCard
}

const renderCartItem = () => {

  cart.forEach(cartItem => {
    cartContainer.appendChild(createCartItem(cartItem))
  });

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const totalElement = document.createElement('div')
  totalElement.className = 'total'
  totalElement.innerHTML = `
    <p>Order Total</p>
    <p>$${total.toFixed(2)}</p>
  `
  const confirmBtn = document.createElement('button')
  confirmBtn.className = 'btn-confirmed'
  confirmBtn.textContent = 'Confirm order'
  confirmBtn.addEventListener('click', () => {
    if (cart.length > 0) {
      const modal = document.querySelector('dialog')

      modal.innerHTML = '<h1>hola sii</h1>'
      modal.setAttribute('open')

    }
  })

  cartContainer.appendChild(totalElement)
  cartContainer.appendChild(confirmBtn)
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




