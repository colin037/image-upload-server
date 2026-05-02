
require('dotenv').config();

const express = require('express');
const uploadRoute = require('./routes/upload');

const app = express();

app.use(express.json());

// Routes
app.use('/', uploadRoute);

app.get('/', (req, res) => {
  res.send(`Server running on port ${PORT}`);
});

// ✅ Improved Error Handler (IMPORTANT)
app.use((err, req, res, next) => {
  // 👇 This prints full error in terminal (CRITICAL for debugging)
  console.error("FULL ERROR:", err);

  // Validation errors
  if (err.message === 'Only JPG and PNG files are allowed') {
    return res.status(400).json({ error: err.message });
  }

  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({ error: 'File size exceeds 2MB limit' });
  }

  // AWS / unknown errors
  return res.status(500).json({
    error: err.message || 'Internal Server Error'
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
