News App

A full-stack news application built with React for the frontend and Express.js for the backend. The app allows users to browse news articles based on different categories and perform searches to find articles matching specific keywords.
Features

    Category-based News: Browse news articles by selecting from various predefined categories.
    Search Functionality: Search for news articles that match specific keywords.
    Responsive Design: The application is fully responsive, ensuring a seamless experience on both desktop and mobile devices.

Technologies Used
Frontend

    React: A JavaScript library for building user interfaces.
    Axios: A promise-based HTTP client for making API requests.

Backend

    Express.js: A minimal and flexible Node.js web application framework.
    MongoDB: A NoSQL database for storing news articles.
    Mongoose: An Object Data Modeling (ODM) library for MongoDB and Node.js.

Getting Started
Prerequisites

    Node.js
    npm (Node Package Manager)
    MongoDB
    An account on newsapi.org to get an API key

Installation

    Clone the repository:

    bash

git clone https://github.com/yourusername/news-app.git
cd news-app

Install dependencies for both client and server:

bash

cd Client
npm install
cd ../Server
npm install

Set up MongoDB and News API:

    Sign in to newsapi.org and get an API key.
    Update the .env file in the Server directory with your MongoDB connection string and News API key:

    makefile

    NEWS_API_KEY=your_news_api_key
    MONGODB_URI=your_mongodb_connection_string

Initialize the database:
Run the script to fetch and store news data in the database:

bash

cd Server
node fetchAndStoreNews.js

Start the backend server:

bash

npm start

Start the frontend application:

bash

    cd ../Client
    npm start

The frontend application will be available at http://localhost:3000 and the backend server at http://localhost:5000.
Project Structure

csharp

NEWSAPP/
├── Client/                  # React frontend
│   ├── public/
│   └── src/
│       ├── components/
│       │   ├── Css/
│       │   │   └── App.css
│       │   ├── JS/
│       │   │   ├── App.js
│       │   │   ├── App.test.js
│       │   │   ├── index.js
│       │   │   ├── reportWebVitals.js
│       │   │   └── setupTests.js
│       │   └── logo.svg
│       ├── index.css
├── .gitignore
├── .env
├── package-lock.json
├── package.json
├── Server/                  # Express backend
│   ├── node_modules/
│   ├── .env
│   ├── fetchAndStoreNews.js
│   ├── package-lock.json
│   ├── package.json
│   └── server.js
└── README.md

Usage

    Browsing News: Select a category from the sidebar to view related news articles.
    Searching News: Use the search bar to find news articles containing the desired keyword.
    Responsive Layout: The app adapts to different screen sizes for optimal viewing on any device.

Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.
License

This project is licensed under the MIT License. See the LICENSE file for details.