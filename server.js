// server.mjs
import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

// Simple route
app.get('/', (req, res) => {
  res.send(`Hello from Worker ${process.pid}`);
});

// Start server
app.listen(PORT, () => {
  console.log(`Worker ${process.pid} is running on port ${PORT}`);
});
