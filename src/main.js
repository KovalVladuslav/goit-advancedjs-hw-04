import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { searchImages } from './js/pixabay-api.js';
import { renderImages } from './js/render-functions.js';

const lightbox = new SimpleLightbox('.gallery a', { captionDelay: 250 });

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');

let page = 1;
let query = '';

form.addEventListener('submit', async event => {
  event.preventDefault();

  gallery.innerHTML = '';
  page = 1;
  loadMoreBtn.style.display = 'none';
  const formData = new FormData(form);
  query = formData.get('search').trim();

  if (query === '') {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search query.',
      position: 'topRight',
    });
    return;
  }

  await loadImages();
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  await loadImages();
});

async function loadImages() {
  loader.style.display = 'block';

  try {
    const data = await searchImages(query, page);

    if (data.hits.length === 0 && page === 1) {
      throw new Error(
        'Sorry, there are no images matching your search query. Please, try again!'
      );
    }

    renderImages(data.hits, gallery);

    lightbox.refresh();

    if (data.hits.length > 0) {
      loadMoreBtn.style.display = 'block';
    } else {
      loadMoreBtn.style.display = 'none';
    }

    if (page > 1) {
      smoothScroll();
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: error.message,
      position: 'topRight',
    });
  } finally {
    loader.style.display = 'none';
  }
}

function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery li')
    .getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
