import '../style.css';
import '../styles/loadMore.css';
import { createCharacterMarkup } from '../utils/createCharacterMarkup.js';
import { fetchCharacter } from '../utils/fetchCharacter.js';

const charactersList = document.querySelector('.characters_list-js');
const loadMoreBtn = document.querySelector('.loadMoreBtn-js');

function showLoadMoreBtn() {
  loadMoreBtn.classList.remove('is-hidden');
}

function hideLoadMoreBtn() {
  loadMoreBtn.classList.add('is-hidden');
}

let currentPage = 1;
let totalPages = null;

async function renderCharacters() {
  try {
    const data = await fetchCharacter(currentPage);
    console.log("🚀 ~ renderCharacters ~ data:", data);
    totalPages ??= data.pages; //Присвой значение справа, только если переменная слева равна null или undefined

    const markup = data.docs
      .map((character) => createCharacterMarkup(character))
      .join('');

    charactersList.insertAdjacentHTML('beforeend', markup);

    if (currentPage < totalPages) {
      showLoadMoreBtn();
    }else {
      hideLoadMoreBtn();
    }
  } catch (err) {
    console.log(err.message);
  }
}

renderCharacters();

loadMoreBtn.addEventListener('click', async () => {
  loadMoreBtn.disabled = true; //защита от повторного клика
  currentPage += 1;

  await renderCharacters(currentPage);

  loadMoreBtn.disabled = false;
});
