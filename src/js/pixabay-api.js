import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const URL = 'https://pixabay.com/api/';
const apiKey = '49657036-4525f6d8cdebe924870a85f3e';

export const searchImages = value => {
  const params = new URLSearchParams({
    key: apiKey,
    q: value,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  return fetch(`${URL}?${params}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
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
    });
};
