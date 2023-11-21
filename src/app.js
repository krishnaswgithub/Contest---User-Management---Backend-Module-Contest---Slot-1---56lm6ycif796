// const express = require('express');
// const app = express();
// const router = require('../routes/userRoutes');

// app.use(express.json());

// app.use('/api/v1', router);

// module.exports = app;

const express = require('express');
const app = express();
const router = require('../routes/userRoutes');

app.use(express.json());

// Use the user routes
app.use('/api/v1', router);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ status: 'error', message: 'Internal Server Error' });
});

module.exports = app;
