import firebaseConfig from './config/firebaseconfig.js';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



