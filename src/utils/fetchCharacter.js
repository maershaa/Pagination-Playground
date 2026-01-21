const BEARER_KEY = 'C6XjZHZY1fsf-sZFcE-d';
const BASE_URL = 'https://the-one-api.dev/v2';


async function fetchCharacter(page = 1) {
  const params = new URLSearchParams({ //URLSearchParams само автоматически подставит &
    limit: 20,
    page
  });

  const options = {
    method: 'GET', //по умолчанию 'GET'. можно не прописывать
    // body:{}, // - для GET не нужно
    headers: { Authorization: `Bearer ${BEARER_KEY}` },
  };

  const response = await fetch(`${BASE_URL}/character?${params}`, options)
  
if (!response.ok) {
  throw new Error(response.statusText);
}

return response.json();
}

export{fetchCharacter}