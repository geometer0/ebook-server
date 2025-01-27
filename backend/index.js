const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const pdfdir = path.join(__dirname, 'pdfs')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    fs.readdir(pdfdir, (err, files) => {
        if (err) {
            res.status(500).json({error: err.message});
            return;
        }
        res.json({dir: pdfdir, pdfs: files});
    });
});

app.get('/pdfs/:filename', (req, res) => {
    const filepath = path.join(pdfdir,req.params.filename);
    res.sendFile(filepath);
});

app.get('/api/test', (req, res) => {
    res.json({ message: 'Hello from Express!' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});