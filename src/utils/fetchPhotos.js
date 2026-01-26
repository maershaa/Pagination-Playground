const PIXABAY_BASE_URL = 'https://pixabay.com/api/';
const PIXABAY_API_KEY = '54316467-1c8c04d8c56deb65224177ffe';

import axios from 'axios';

async function fetchPhotos(search_query, page) {
  try {
    const response = await axios.get(`${PIXABAY_BASE_URL}`, {
      params: {
        key: PIXABAY_API_KEY,
        q: search_query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page, //по умолчанию 1
        per_page: 42, //по умолчанию 20
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('Axios error:', error.message);
  }
}
export { fetchPhotos };
