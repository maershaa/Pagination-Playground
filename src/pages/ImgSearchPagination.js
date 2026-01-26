import '../style.css';
import '../styles/ImgSearch.css';

import { createPhotoMarkup } from '../utils/createPhotoMarkup.js';
import { fetchPhotos } from '../utils/fetchPhotos.js';

import { Fancybox } from '@fancyapps/ui/dist/fancybox/';
import '@fancyapps/ui/dist/fancybox/fancybox.css';

const searchForm = document.querySelector('#search-form');
const galleryContainer = document.querySelector('.gallery');
const pagesContainer = document.querySelector('.pagination-js');

const PHOTOS_PER_PAGE = 40;
const MAX_QUERY_LENGTH = 100;
const MAX_VISIBLE_PAGES = 10;

let currentPage = 1;
let totalPages = 0;
let currentQuery = '';

searchForm.addEventListener('submit', onSearchFormSubmit);
pagesContainer.addEventListener('click', onPageNumberClick);

function onSearchFormSubmit(evt) {
  evt.preventDefault();

  const searchQuery = evt.target.searchQuery.value.trim();

  if (!searchQuery) return;

  if (searchQuery.length > MAX_QUERY_LENGTH) {
    alert('Это значение не может превышать 100 символов');
    return;
  }

  currentQuery = searchQuery;
  currentPage = 1;

  clearGallery();
  clearPagination();

  renderPhotos();
}

async function renderPhotos() {
  try {
    const data = await fetchPhotos(currentQuery, currentPage);
    console.log('🚀 ~ renderPhotos ~ data:', data);
    const photos = data.hits;

    if (!photos.length) {
      clearGallery();
      clearPagination();
      alert(
        'Sorry, there are no images matching your search query. Please try again.',
      );
      return;
    }

    totalPages = Math.ceil(data.totalHits / PHOTOS_PER_PAGE);

    const markup = photos.map((photo) => createPhotoMarkup(photo));
    galleryContainer.insertAdjacentHTML('beforeend', markup.join(''));

    renderPagination();

    console.log('currentPage:', currentPage);
  } catch (error) {
    console.log(error.message);
  }
}

function renderPagination() {
  // Строка для накопления HTML-разметки пагинации
  let markup = '';

  // Половина от максимального количества видимых страниц
  // Нужна, чтобы текущая страница была примерно по центру
  const half = Math.floor(MAX_VISIBLE_PAGES / 2);

  // Предварительно считаем диапазон вокруг текущей страницы
  let startPage = currentPage - half;
  let endPage = currentPage + half;

  // Если вышли за левую границу (меньше 1)
  // сдвигаем диапазон вправо
  if (startPage < 1) {
    startPage = 1;
    endPage = Math.min(totalPages, MAX_VISIBLE_PAGES);
  }

  // Если вышли за правую границу (больше totalPages)
  // сдвигаем диапазон влево
  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, totalPages - MAX_VISIBLE_PAGES + 1);
  }

  // Генерируем ссылки страниц в рассчитанном диапазоне
  for (let i = startPage; i <= endPage; i += 1) {
    markup += `
      <a href="#" class="${i === currentPage ? 'active' : ''}">
        ${i}
      </a>
    `;
  }

  // Обновляем DOM: каждый раз рендерим пагинацию заново
  pagesContainer.innerHTML = markup;
}

function onPageNumberClick(evt) {
  evt.preventDefault();

  const link = evt.target.closest('a');
  if (!link) return;

  const page = Number(link.textContent);
  if (page === currentPage) return;

  currentPage = page;
  clearGallery();

  renderPhotos();
}

function clearGallery() {
  galleryContainer.innerHTML = '';
}

function clearPagination() {
  pagesContainer.innerHTML = '';
}

// Для прсомотра галлереи используем библиотеку
galleryContainer.addEventListener('click', onImgClick);
function onImgClick(evt) {
  Fancybox.bind('[data-fancybox="gallery"]', {
    Carousel: {
      formatCaption: (carouselRef, slide) => {
        return `${slide.index + 1} of ${carouselRef.getSlides().length}<br /> ${
          slide.caption || ''
        }`;
      },
    },
  });
}
