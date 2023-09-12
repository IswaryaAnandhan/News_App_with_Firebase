import axios from 'axios';

const API_KEY = "process.env.REACT_APP_NEWS_API_KEY"
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
