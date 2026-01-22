import '../style.css';
import '../styles/classicPagination.css';

import { fetchCharacter } from '../utils/fetchCharacter.js';
import { createCharacterMarkup } from '../utils/createCharacterMarkup.js';

const charactersList = document.querySelector('.characters_list-js');
const paginationEl = document.querySelector('.pagination');
const pagesContainer = paginationEl.querySelector('.pages');

let currentPage = 1;
let totalPages;
let totalCharacters;

async function renderCharacters() {
  try {
    const data = await fetchCharacter(currentPage);
    console.log("🚀 ~ renderCharacters ~ currentPage:", currentPage);
    totalPages = data.pages;
    totalCharacters = data.total;
    // console.log("🚀 ~ renderCharacters ~ data:", data);
    // console.log("currentPage:", currentPage);

    const markup = data.docs.map((character) =>
      createCharacterMarkup(character),
    );
    charactersList.innerHTML = markup.join('');
    renderPagination();
  } catch (error) {
    console.log(error.message);
  }
}

renderCharacters();

function renderPagination() {
  const visiblePages = 1; // сколько страниц показываем слева и справа
  let pagesMarkup = '';

  const startPage = Math.max(2, currentPage - visiblePages);
  const endPage = Math.min(totalPages - 1, currentPage + visiblePages);

  // Prev / Next
  const prevBtn = paginationEl.firstElementChild;
  const nextBtn = paginationEl.lastElementChild;

  prevBtn.classList.toggle('disabled', currentPage === 1);
  nextBtn.classList.toggle('disabled', currentPage === totalPages);

  // Первая страница
  pagesMarkup += `<a href="#" class="${currentPage === 1 ? 'active' : ''}">1</a>`;

  // Многоточие слева
  if (startPage > 2) {
    pagesMarkup += `<span class="dots">...</span>`;
  }

  // Центральные страницы
  for (let i = startPage; i <= endPage; i++) {
    pagesMarkup += `<a href="#" class="${i === currentPage ? 'active' : ''}">${i}</a>`;
  }

  // Многоточие справа
  if (endPage < totalPages - 1) {
    pagesMarkup += `<span class="dots">...</span>`;
  }

  // Последняя страница
  if (totalPages > 1) {
    pagesMarkup += `<a href="#" class="${currentPage === totalPages ? 'active' : ''}">${totalPages}</a>`;
  }

  pagesContainer.innerHTML = pagesMarkup;
}



paginationEl.addEventListener('click', onPaginationClick);

function onPaginationClick(evt) {
  evt.preventDefault();
  const target = evt.target;
  console.log("🚀 ~ onPaginationClick ~ evt.target.textContent:", evt.target.textContent);

  if (target.classList.contains('disabled')) return;

  // Проверяем, на что пользователь кликнул
  if (target.classList.contains('prev')) {
    // Кликнули на кнопку "Prev" (назад)
    if (currentPage > 1) {
      // Если мы не на первой странице
      currentPage = currentPage - 1; // Переходим на предыдущую страницу
    }
  } else if (target.classList.contains('next')) {
    // Кликнули на кнопку "Next" (вперёд)
    if (currentPage < totalPages) {
      // Если мы не на последней странице
      currentPage = currentPage + 1; // Переходим на следующую страницу
    }
  } else if (!isNaN(target.textContent)) {
    // Кликнули на цифру страницы
    currentPage = Number(target.textContent); // Устанавливаем currentPage на выбранную цифру
  } else {
    // Кликнули куда-то не на кнопки страниц и не на Prev/Next — ничего не делаем
    return;
  }

  renderCharacters();
}
