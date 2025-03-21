import { Dessert } from '../models/dessert.model';
import { renderButton } from './createDessertBtn';

/**
 * 
 * @param {Dessert} dessert
 */
export const createDessertHTML = (dessert, itemInCart) => {
    if (!dessert) throw new Error('Es necesario un objeto de tipo dessert');

    const { id, name, image, category, price } = dessert;

    const card = document.createElement('div');
    card.setAttribute('id', id);
    card.className = `dessert-card ${!!itemInCart ? 'selected' : ''}`

    const html = `
        <img src="${image}" alt="${name}">
        <div class="dessert-info">
            <p>${category}</p>
            <h3>${name}</h3>
            <p>$${price}</p>
        </div>
    `;
    const button = renderButton(dessert,itemInCart);
    card.innerHTML = html;
    card.appendChild(button)
    return card;
}


