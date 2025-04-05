export const renderImages = (images, container) => {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<li class="photo-card">
          <a href="${largeImageURL}" class="photo-link">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" />
            <div class="info">
            <p class="info-item">
              <span>Likes</span><span class="info-value">${likes}</span>
            </p>
            <p class="info-item">
              <span>Views</span><span class="info-value">${views}</span>
            </p>
            <p class="info-item">
              <span>Comments</span><span class="info-value">${comments}</span>
            </p>
            <p class="info-item">
              <span>Downloads</span><span class="info-value">${downloads}</span>
            </p>
          </div>
          </a>
        </li>`
    )
    .join('');

  container.insertAdjacentHTML('beforeend', markup);
};
