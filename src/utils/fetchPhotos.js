const PIXABAY_BASE_URL = 'https://pixabay.com/api/';
const PIXABAY_API_KEY = '54316467-1c8c04d8c56deb65224177ffe';

async function fetchPhotos(search_query, page) {
  const param = new URLSearchParams({
    key: PIXABAY_API_KEY,
    q: `${search_query}`,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page, //по умолчанию 1
    per_page: 42, //по умолчанию 20
  });

  const response = await fetch(`${PIXABAY_BASE_URL}?${param}`);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}
export { fetchPhotos };

// https://pixabay.com/api/
// key;+ id
