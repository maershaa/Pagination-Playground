import '../style.css';
import '../styles/infiniteScroll.css';
import { createCharacterMarkup } from '../utils/createCharacterMarkup.js';
import { fetchCharacter } from '../utils/fetchCharacter.js';

const charactersList = document.querySelector('.characters_list-js');
const target = document.querySelector('.js-guard');

let currentPage = 1;
let totalPages;

const options = {
  root: null,
  rootMargin: '300px',
  // scrollMargin: "0px",
  threshold: 1.0,
};
const observer = new IntersectionObserver(onLoad, options);

async function onLoad(entries, observer) {
 entries.forEach(async (entry) => {
    if (entry.isIntersecting) {
      currentPage += 1;
      await renderCharacters();
    }
  });
}

async function renderCharacters() {
  try {
    const data = await fetchCharacter(currentPage);
    totalPages = data.pages;
    const markup = data.docs.map((character) =>
      createCharacterMarkup(character),
    );
    charactersList.insertAdjacentHTML('beforeend', markup.join(''));

    observer.observe(target); //! Начинает наблюдение за элементом target.
// target — это служебный (пустой) div, расположенный сразу после списка отображаемых данных.
// Когда этот элемент попадает в область видимости (viewport),
// IntersectionObserver срабатывает и инициирует подгрузку следующей порции данных.

 if (currentPage >= totalPages) { 
  observer.unobserve(target);//! Останавливает наблюдение именно за этим элементом target.
// Используется, когда дальнейшая подгрузка данных не требуется
// (например, достигнута последняя страница),
// чтобы предотвратить лишние срабатывания observer и дополнительные запросы.
}
  } catch (error) {
    console.log(error.message);
  }
}

renderCharacters();
