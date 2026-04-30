const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.static('public'));

// fornecer alimentos em JSON
app.get('/api/alimentos', (req, res) => {
  fs.readFile('public/alimentos.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao ler o arquivo de alimentos' });
      return;
    }
    res.json(JSON.parse(data));
  });
});

// Inicia servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
