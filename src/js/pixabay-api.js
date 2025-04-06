import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import axios from 'axios';

const URL = 'https://pixabay.com/api/';
const apiKey = '49657036-4525f6d8cdebe924870a85f3e';

export const searchImages = async (value, page) => {
  const params = new URLSearchParams({
    key: apiKey,
    q: value,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15,
    page,
  });

  try {
    const { data, status } = await axios.get(`${URL}?${params}`);

    if (status !== 200) {
      throw new Error('Network response was not ok');
    }

    return data;
  } catch (error) {
    throw new Error(
      'There has been a problem with your fetch operation:',
      error
    );
  }
};
