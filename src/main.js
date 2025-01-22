import desserts from './desserts/dessert.json';

const dessertsContainer = document.querySelector('.desserts')
//funcion que crea el html para mi card
const createCardDessert = (dessert) => {
  return `<div class="dessert-card">
  <div class="image-container">
  <img src="${dessert.image}" alt=${dessert.name}>
  <button>
  <img src="/public/images/icon-add-to-cart.svg" alt="" srcset="">
  Add to cart
  </button>
  </div>
  <h3>${dessert.name}</h3>
  <p>${dessert.category}</p>
  <p>$${dessert.price}</p>
  </div>`
}
const createCard = (desserts) => {
  const html = desserts.map(dessert => createCardDessert(dessert)).join('');
  dessertsContainer.innerHTML = html
}
createCard(desserts)

let cart = JSON.parse(localStorage.getItem('cart')) || [];
//accedo a los botones creados por mis cards
const btnsAdd = document.querySelectorAll('.image-container button')

btnsAdd.forEach(btn => {
  btn.addEventListener('click', (event) => {
    const card = btn.closest('.dessert-card')
    const nameCard = card.querySelector('h3').textContent
    const cardSelected = desserts.find(dessert => dessert.name === nameCard)
    if(!cardSelected) return
    const findInCart = cart.find(itemCart => itemCart.name === cardSelected.name)
    if(findInCart){
      //agregar cantidad
        findInCart.quantity += 1
    } else {
      //no esta el item en el cart, hay que agregarlo
      cart.push({...cardSelected, quantity: 1})
    }
    localStorage.setItem('cart', JSON.stringify(cart))
  })
})
