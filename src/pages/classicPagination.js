import '../style.css'
import '../styles/classicPagination.css'

import {fetchCharacter} from '../utils/fetchCharacter.js'
import {createCharacterMarkup} from '../utils/createCharacterMarkup.js'

const charactersList = document.querySelector('.characters_list-js')

let currentPage = 1

async function renderCharacters(){
  try {
    const data = await fetchCharacter(currentPage)
    console.log("🚀 ~ renderCharacters ~ data:", data);
  const markup = data.docs.map(character=> createCharacterMarkup(character))
charactersList.insertAdjacentElement('beforeend', markup)
  } catch (error) {
    console.log(error.message)
  }
}

renderCharacters()