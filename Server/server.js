require('dotenv').config();
const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const { exec } = require('child_process');

const app = express();
const port = 5000;



const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

// Middleware
const corsOptions = {
  origin: '*', // Allow all origins
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
};

app.use(cors(corsOptions)); // Apply CORS options
app.use(express.json());

client.connect().then(() => {
  console.log('Connected to MongoDB');
}).catch(error => {
  console.error('Error connecting to MongoDB:', error);
});

// Endpoint to fetch news
app.get('/api/news/:source/:category', async (req, res) => {
  try {
    const { source, category } = req.params;
    const dbName = source === 'allnews' ? 'everythingNews' : 'topheadlinesNews';
    const db = client.db(dbName);
    const collectionName = (source === 'allnews') ? category : category.toLowerCase();
    const collection = db.collection(collectionName); // Convert category to lowercase for topheadlinesNews

    console.log(`Fetching data from ${dbName} database, category: ${category.toLowerCase()}`);
    
    const data = await collection.find({}).toArray();
    res.json(data);
  } catch (error) {
    console.error(`Error fetching data from ${req.params.source}/${req.params.category}:`, error);
    res.status(500).send('Internal Server Error');
  }
});

// Endpoint to delete databases
app.get('/api/delete-databases', async (req, res) => {
  try {
    const everythingNewsDb = client.db('everythingNews');
    const topheadlinesNewsDb = client.db('topheadlinesNews');

    // Drop the databases
    await everythingNewsDb.dropDatabase();
    await topheadlinesNewsDb.dropDatabase();
    console.log('Databases deleted');

    res.send('Databases deleted successfully');
  } catch (error) {
    console.error('Error deleting databases:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Endpoint to run fetchAndStoreNews.js
// Endpoint to run fetchAndStoreNews.js
app.get('/api/repopulate-databases', (req, res) => {
  exec('node fetchAndStoreNews.js', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing script: ${error.message}`);
      res.status(500).send(`Error executing script: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Script stderr: ${stderr}`);
      res.status(500).send(`Script stderr: ${stderr}`);
      return;
    }
    console.log(`Script stdout: ${stdout}`);
    res.send('Databases repopulated successfully');
  });
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
