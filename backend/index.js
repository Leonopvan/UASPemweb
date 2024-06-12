const express = require('express');
const app = express();
const port = 5000;

const news = [
    {
        title: "Berita 1",
        category: "Teknologi",
        summary: "Ringkasan berita 1",
        keywords: ["tech", "AI"]
    },
    {
        title: "Berita 2",
        category: "Olahraga",
        summary: "Ringkasan berita 2",
        keywords: ["sport", "football"]
    }
];

app.get('/news', (req, res) => {
    res.json(news);
});

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
