const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/api/alimentos', (req, res) => {
  const caminhoArquivo = path.join(__dirname, '..', 'public', 'alimentos.json');

  console.log('Pasta atual:', process.cwd());
  console.log('Caminho do arquivo:', caminhoArquivo);
  console.log('Arquivo existe?', fs.existsSync(caminhoArquivo));

  fs.readFile(caminhoArquivo, 'utf8', (err, data) => {
    if (err) {
      console.error('Erro real:', err);
      res.status(500).json({
        error: 'Erro ao ler o arquivo de alimentos',
        caminho: caminhoArquivo,
        existe: fs.existsSync(caminhoArquivo),
        detalhe: err.message
      });
      return;
    }

    try {
      res.json(JSON.parse(data));
    } catch (parseError) {
      res.status(500).json({
        error: 'Erro de formato no alimentos.json',
        detalhe: parseError.message
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
