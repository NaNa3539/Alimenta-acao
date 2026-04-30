const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/api/alimentos', (req, res) => {
  const caminhoArquivo = path.join(__dirname, '..', 'public', 'alimentos.json');

  fs.readFile(caminhoArquivo, 'utf8', (err, data) => {
    if (err) {
      console.error('Erro ao ler alimentos.json:', err);
      res.status(500).json({ error: 'Erro ao ler o arquivo de alimentos' });
      return;
    }

    try {
      res.json(JSON.parse(data));
    } catch (parseError) {
      console.error('Erro no JSON:', parseError);
      res.status(500).json({ error: 'Erro de formato no alimentos.json' });
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
