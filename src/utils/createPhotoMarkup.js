function createPhotoMarkup(photo) {
  const {
    id,
    webformatURL = '#',
    largeImageURL = '#',
    tags = 'No description',
    likes = 0,
    views = 0,
    comments = 0,
    downloads = 0,
  } = photo;
  const caption = tags.split(',')[0].trim();
  return `
  <div class="photo-card" data-id="${id}">
      <a  href="${largeImageURL}"  data-fancybox="gallery" data-caption="${caption}">
      <img src="${webformatURL}" alt="${tags}" loading="lazy" />
      </a>
  <div class="info">
   <div class="info-item">
  <span class="label">Likes</span>
  <span class="value">${likes}</span>
</div>

<div class="info-item">
  <span class="label">Views</span>
  <span class="value">${views}</span>
</div>

<div class="info-item">
  <span class="label">Comments</span>
  <span class="value">${comments}</span>
</div>

<div class="info-item">
  <span class="label">Downloads</span>
  <span class="value">${downloads}</span>
</div>

  </div>
</div>`;
}

export { createPhotoMarkup };
