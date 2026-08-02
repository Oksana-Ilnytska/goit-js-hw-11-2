

import { getImagesByQuery } from './js/pixabay-api.js';
import { createGallery, clearGallery, showLoader, hideLoader, showLoadMoreButton, hideLoadMoreButton} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const searchForm = document.querySelector('.form');
const searchInput = searchForm.querySelector('input[name="search-text"]');
const loadMoreBtn = document.querySelector('.load-more');

let page = 1;
let currentQuery = '';
let totalPages = 0;



searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const query = searchInput.value.trim();
    
    if (!query) return;
    currentQuery = query;
    page = 1;

    clearGallery();
    hideLoadMoreButton();
    showLoader();
  
    try { const data = await getImagesByQuery(currentQuery, page);
      
      
        if (!data.hits || data.hits.length === 0) {
          
          iziToast.error({  
            message: `Sorry, there are no images matching your search ${query}. Please try again!`,
          position: 'topRight',
          timeout: 5000,
          backgroundColor: '#EF4040',
          messageColor: '#FAFAFB', 
          });
          return;
        }
        totalPages = Math.ceil(data.totalHits / 15);
        createGallery(data.hits);
        if (page >= totalPages) {
        showLoadMoreButton();
        
        iziToast.info({
          message: "We're sorry, but you've reached the end of search results.",
          position: 'topright',
          timeout: 5000,
        });
      } else { 
        showLoadMoreButton();
      }
      } catch(error) {
        iziToast.error({ 
          message: error.message,
          position: 'topRight',
          timeout: 5000,
          backgroundColor: '#EF4040',
          messageColor: '#FAFAFB',
          class: 'error-toast'
        });
      }
      finally {
        hideLoader();
        searchForm.reset();
      }
  });

  loadMoreBtn.addEventListener("click", async () => {
    showLoader();

    try {
      page+=1;
    const data = await getImagesByQuery(currentQuery, page);
    createGallery(data.hits); 
    const card = document.querySelector('.gallery.item');
    if (card) {
      const cardHeight = card.getBoundingClientRect().height;

      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }

    if (page >= totalPages) {
      hideLoadMoreButton();

      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topright',
        timeout: 5000,
      });
    }
    }catch(error) {
      iziToast.error({ 
        message: error.message,
        position: 'topRight',
        timeout: 5000,
        backgroundColor: '#EF4040',
        messageColor: '#FAFAFB',
        class: 'error-toast'
      });
    }
    finally {
      hideLoader();
    }
  });

  

  

  