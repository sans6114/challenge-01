import cart from '../store/cart';
import { createDessertHTML } from './createDessertHTML';

let element;
/**
 * 
 * @param {String} elementId
 * @param {Todo} todos
 */
export const renderDesserts = (elementID, desserts = []) => {
    element = document.querySelector(elementID);
    if(!element) throw new Error("Elemento del dom no existe con ese id")

    element.innerHTML = '';
    desserts.forEach(dessert => {
        const itemInCart = cart.findById(dessert.id)
        const dessertHTML =  createDessertHTML(dessert, itemInCart)
        element.append(dessertHTML)
})
}