import './style.css';
const BEARER_KEY = 'C6XjZHZY1fsf-sZFcE-d';
const BASE_URL = 'https://the-one-api.dev/v2';

const charactersList = document.querySelector('.characters_list-js');
const loadMoreBtn = document.querySelector('.loadMoreBtn-js');

let currentPage = 1;

function fetchCharacter(page = 1) {
  const param = new URLSearchParams({
    limit: 20,
  });

  const option = {
    method: 'GET',
    // body:{}, // - для GET не нужно
    headers: { Authorization: `Bearer ${BEARER_KEY}` },
  };

  return fetch(`${BASE_URL}/character?${param}&page=${page}`, option).then(
    (resp) => {
      if (!resp.ok) {
        throw new Error(resp.statusText);
      }
      return resp.json();
    },
  );
}

fetchCharacter()
  .then((data) => {
    console.log(data);
    const personage = data.docs
      .map((character) => createCharacterMarkup(character))
      .join('');
    charactersList.insertAdjacentHTML('beforeend', personage);

    if (data.page !== data.pages) {
      loadMoreBtn.hidden = false;
    }
  })
  .catch((err) => console.log(err.message));

const createCharacterMarkup = ({
  _id,
  name,
  race,
  birth,
  death,
  hair,
  height,
  gender,
  spouse,
}) => {
  return `
  <li data-id="${_id}">
    <h2>${name}</h2>
    <p><strong>Race:</strong> ${race}</p>
    ${birth ? `<p><strong>Birth:</strong> ${birth}</p>` : ''}
    ${death ? `<p><strong>Death:</strong> ${death}</p>` : ''}
    ${hair ? `<p><strong>Hair:</strong> ${hair}</p>` : ''}
    ${height ? `<p><strong>Height:</strong> ${height}</p>` : ''}
    <p><strong>Gender:</strong> ${gender}</p>
    <p><strong>Spouse:</strong> ${spouse}</p>
  </li>
`;
};

loadMoreBtn.addEventListener('click', (evt) => {
  currentPage += 1;
  fetchCharacter(currentPage)
    .then((data) => {
      console.log(data);
      const personage = data.docs
        .map((character) => createCharacterMarkup(character))
        .join('');
      charactersList.insertAdjacentHTML('beforeend', personage);
    })
    .catch((err) => console.log(err.message));
});
