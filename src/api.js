import axios from 'axios';

const API_KEY = "3d12c1cb173649199da45a8fee965277"
const API_URL = 'https://newsapi.org/v2/top-headlines';

export const getNewsArticles = async () => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        apiKey: API_KEY,
        country: 'us', 
      },
   
    });
    console.log(response.data.articles);
    return response.data.articles;
  } catch (error) {
    throw error;
  }
};
