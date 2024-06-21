import Service from "@/service/service";
import { Pokemon } from "@/model/model";
import logo from "/public/img/logo.png";

class View {

    // Метод для меню в будущем с логотипом в левой части
    renderHeader(): void {
        const header = document.createElement('header');
        const logoImg = document.createElement('div');
        logoImg.innerHTML = `<img src="${logo}" alt="logo"/>`;
        logoImg.classList.add('logo');
        header.appendChild(logoImg);

        const root = document.getElementById('root');
        root?.insertAdjacentElement('afterbegin', header);
    }

    private root: HTMLElement | null;

    constructor() {
        this.root = document.getElementById('root');
    }

    private createCard(data: Pokemon): HTMLElement {
        const card = document.createElement('div');
        card.classList.add('card');

        const cardDescription = document.createElement('div');
        cardDescription.classList.add('cardDescription');
        cardDescription.innerHTML = `<h2>${data.name[0].toUpperCase() + data.name.slice(1)}</h2><h3>#${Service.generateId(data.id)}</h3>`;

        const catchButton = this.createCatchButton(data);

        card.appendChild(document.createElement('img')).setAttribute('src', data.avatar);
        card.appendChild(cardDescription);
        card.appendChild(catchButton);

        return card;
    }

    private createCatchButton(data: Pokemon): HTMLButtonElement {
        const catchButton = document.createElement('button');
        const caughtText = document.createElement('p');
        caughtText.textContent = data.status ? 'Catched' : 'Catch!';
        catchButton.appendChild(caughtText);

        if (data.status) {
            catchButton.disabled = true;
        } else {
            catchButton.addEventListener('click', () => {
                this.toggleCatchButton(catchButton, data);
                Service.toggleCatchStatus(data);
            });
        }

        return catchButton;
    }

    private toggleCatchButton(catchButton: HTMLButtonElement, data: Pokemon): void {
        const caughtText = catchButton.querySelector('p');
        if (caughtText) {
            caughtText.textContent = 'Catched';
        }
        catchButton.disabled = true;
        data.status = true;
    }

    endView(): void {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.style.display = 'none';
        }

        const endMessage = document.getElementById('end-message');
        if (endMessage) {
            endMessage.style.display = 'block';
            endMessage.innerHTML = 'No more Pokemon data to load.';
        }
    }

    userView(): void {
        document.addEventListener('scroll', Service.handlePagination);

        Service.fetchPokemonData().then((data: Pokemon[]) => {
            const cards = document.createElement('div');
            cards.classList.add('cards');

            data.forEach((pokemon) => {
                const card = this.createCard(pokemon);
                cards.appendChild(card);
            });

            if (this.root) {
                this.root.insertAdjacentElement('beforeend', cards);
            }
        });
    }
}

export default new View();