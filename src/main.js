import './style.css';
import {createCharacterMarkup} from './utils/createCharacterMarkup.js'



const charactersList = document.querySelector('.characters_list-js');
const loadMoreBtn = document.querySelector('.loadMoreBtn-js');

// let currentPage = 1;


// fetchCharacter()
//   .then((data) => {
//     console.log(data);
//     const personage = data.docs
//       .map((character) => createCharacterMarkup(character))
//       .join('');
//     charactersList.insertAdjacentHTML('beforeend', personage);

//     if (data.page !== data.pages) {
//       loadMoreBtn.hidden = false;
//     }
//   })
//   .catch((err) => console.log(err.message));




