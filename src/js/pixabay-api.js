import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '51926469-17331259ac3d6722fcf98d7c3';

export function getImagesByQuery(query) {
return axios.get(BASE_URL, {
params: {
key: API_KEY,
q: query,
image_type: 'photo',
orientation: 'horizontal',
safesearch: true,
},
})
.then(response => response.data);
}





