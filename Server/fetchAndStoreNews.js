require('dotenv').config();
const mongoose = require('mongoose');
const axios = require('axios');


const mongoURI = process.env.MONGODB_URI;
const newsApiKey = process.env.NEWS_API_KEY;

// Connect to MongoDB
mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // Exit with failure code
  });

// Define Mongoose schemas
const articleSchema = new mongoose.Schema({
  source: {
    id: String,
    name: String
  },
  author: String,
  title: String,
  description: String,
  url: String,
  urlToImage: String,
  publishedAt: Date,
  content: String
}, { strict: false });

const fetchAndStoreNews = async (url, dbName, collectionName) => {
  try {
    const response = await axios.get(url);
    const articles = response.data.articles;
    
    // Connect to the specified database and collection
    const db = mongoose.connection.useDb(dbName);
    const collection = db.collection(collectionName);

    // Filter articles where title, content, and urlToImage are not null
    const validArticles = articles.filter(article =>
      article.title && article.content && article.urlToImage
    );

    // Store valid articles in the specified collection
    if (validArticles.length > 0) {
      await collection.insertMany(validArticles);
      console.log(`Data for "${collectionName}" successfully imported into ${dbName}/${collectionName}.`);
    } else {
      console.log(`No valid articles found for category "${collectionName}".`);
    }
  } catch (error) {
    console.error(`Error fetching or storing data for "${collectionName}":`, error);
    throw error; // Rethrow the error to handle it in the run function
  }
};

const fetchEverythingNews = async () => {
  const queries = ['keyword', 'Entertainment', 'Cricket', 'Technology', 'Health', 'Science'];
  const promises = queries.map(query => {
    const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${newsApiKey}`;
    return fetchAndStoreNews(url, 'everythingNews', query);
  });
  return Promise.all(promises);
};

const fetchTopHeadlinesNews = async () => {
  const categories = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  const promises = categories.map(category => {
    const url = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${newsApiKey}`;
    return fetchAndStoreNews(url, 'topheadlinesNews', category);
  });
  return Promise.all(promises);
};

// Run the functions and exit with appropriate code
const run = async () => {
  try {
    await fetchEverythingNews();
    await fetchTopHeadlinesNews();
    console.log('All news data fetched and stored successfully.');
    process.exit(0); // Exit with success code
  } catch (error) {
    console.error('Error fetching and storing news data:', error);
    process.exit(1); // Exit with failure code
  }
};

run();
