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

form.addEventListener('submit', event => {
  event.preventDefault();

  gallery.innerHTML = '';

  const data = new FormData(form);

  const value = data.get('search');

  loader.style.display = 'block';

  searchImages(value)
    .then(data => renderImages(data.hits, gallery))
    .then(() => {
      lightbox.refresh();
      if (gallery.children.length === 0) {
        iziToast.error({
          title: 'Error',
          message:
            'Sorry, there are no images matching your search query. Please, try again!',
          position: 'topRight',
        });
      }
    })
    .catch(error => {
      iziToast.error({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please, try again!',
        position: 'topRight',
      });
      console.error(
        'There has been a problem with your fetch operation:',
        error
      );
    })
    .finally(() => {
      loader.style.display = 'none';
    });
});
