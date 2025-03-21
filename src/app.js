import dessertsData from './info/dessert.json';
import { Dessert } from './models/dessert.model';
import cart from './store/cart';
import { renderCart } from './use-cases/renderCart';
import { renderDesserts } from './use-cases/renderDesserts';

//id de elementos a manipular mediante el DOM
const elementIDs = {
    dessertContainer: '.desserts',
    cartContainer: '.cart-container'
}

function updateUi(){
    renderDesserts(elementIDs.dessertContainer, desserts)
    renderCart(elementIDs.cartContainer)
}

//configuro que hacer cuando el carrito cambie
cart.setOnCartChange(() => {
    updateUi()
})

// creacion de mis objetos dessert y mis cards
function createDessert(data) {
    const desserts = data.map(dessert => new Dessert(
        dessert.id,
        dessert.name,
        dessert.image,
        dessert.category,
        dessert.price
    ));
    return desserts;
}
const desserts = createDessert(dessertsData);
//inicializacion
updateUi()