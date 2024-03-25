import axios from 'axios';

axios.defaults.baseURL = 'https://api.unsplash.com';
const accessKey = 'FjEiOy4Ip3d7VQ6fJCKqVBYfnhjcLEd4B1dNou22WyA';

export async function fetchPhotos(searchQuery, page = 1) {
  const response = await axios.get('/search/photos', {
    headers: {
      Authorization: `Client-ID ${accessKey}`,
    },
    params: {
      query: searchQuery,
      per_page: 30,
      page,
    },
  });

  console.log(page);

  return response.data;
}
