

import { getImagesByQuery } from './js/pixabay-api.js';
import { createGallery, clearGallery, showLoader, hideLoader } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const searchForm = document.querySelector('.form');
const searchInput = searchForm.querySelector('input[name="search-text"]');

searchForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const query = searchInput.value.trim();
    if (!query) return;
  
    clearGallery();
    showLoader();
  
    getImagesByQuery(query)
      .then(data => {
        if (!data.hits || data.hits.length === 0) {
          iziToast.error({  
            message: `Sorry, there are no images matching your search ${query}. Please try again!`,
          position: 'topRight',
          timeout: 5000,
          //backgroundColor: '#EF4040',
          //messageColor: '#FAFAFB',
          
          });
          return;
        }
        createGallery(data.hits);
      })
      .catch(error => {
        iziToast.error({ 
          message: error.message,
          position: 'topRight',
          timeout: 5000,
          backgroundColor: '#EF4040',
          messageColor: '#FAFAFB',
          class: 'error-toast'
        });
      })
      .finally(() => {
        hideLoader();
        searchForm.reset();
      });
  });

  