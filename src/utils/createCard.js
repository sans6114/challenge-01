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
export const createCard = (desserts) => {
    const html = desserts.map(dessert => createCardDessert(dessert)).join('');
    dessertsContainer.innerHTML = html
}