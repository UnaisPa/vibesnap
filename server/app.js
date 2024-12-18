import express from "express";
import dotenv from "dotenv"
const app = express();

dotenv.config();
const port = process.env.PORT || 5000;

// Define a route
app.get('/', (req, res) => {
    res.send('The data');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
