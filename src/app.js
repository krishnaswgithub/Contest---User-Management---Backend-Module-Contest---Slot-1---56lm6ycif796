// const express = require('express');
// const app = express();
// const router = require('../routes/userRoutes');

// app.use(express.json());

// app.use('/api/v1', router);

// module.exports = app;

const express = require('express');
const app = express();

// Sample array of products (replace with your actual product data)
const products = [
  { id: 1, name: 'Product 1', price: 50 },
  { id: 2, name: 'Product 2', price: 30 },
  // ... additional products
];

// Middleware to parse JSON in requests
app.use(express.json());

// Paginate Products Endpoint
app.get('/api/v1/products/paginate', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const paginatedProducts = products.slice(startIndex, endIndex);

  res.status(200).json(paginatedProducts);
});

// Sort Products Endpoint
app.get('/api/v1/products/sort', (req, res) => {
  const sortOrder = req.query.sort || 'asc';

  const sortedProducts = [...products];

  if (sortOrder === 'asc') {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === 'desc') {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  res.status(200).json(sortedProducts);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ status: 'error', message: 'Internal Server Error' });
});

module.exports = app;
