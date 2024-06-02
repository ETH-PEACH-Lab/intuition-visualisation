const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the "slides-website" directory
app.use(express.static(path.join(__dirname, 'slides-website')));

// Serve static files from the "slides" directory
app.use('/slides', express.static(path.join(__dirname, 'slides')));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
