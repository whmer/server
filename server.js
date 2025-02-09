const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 4040;

app.use(express.static('./server'));

app.post('/save-data', (req, res) => {
  const ipInterno = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  const { userAgent, sistema, ipExterno, city } = req.body;
  
  const ok = { userAgent,sistema, ipExterno, ipInterno, city };
  console.log( userAgent, sistema, ipExterno, ipInterno, city);

  fs.readFile('mary5345345353500000ohhmary.json', 'utf8', (err, fileData) => {
    let jsonData = [];
    if (!err && fileData) {
      jsonData = JSON.parse(fileData);
    }

    jsonData.push(ok);

    fs.writeFile('mary5345345353500000ohhmary.json', JSON.stringify(jsonData, null, 2), (writeErr) => {
      if (writeErr) {
        console.error('realmente não entendo onde vamos chegar:', writeErr);
        res.status(500).send('eu não compreendo');
      } else {
        res.send('');
      }
    });
  });
});

app.get('/get-data', (req, res) => {
  fs.readFile('mary5345345353500000ohhmary.json', 'utf8', (err, data) => {
      if (err) {
          console.error('Erro ao ler o arquivo:', err);
          return res.status(500).send('Erro ao ler os dados do usuário');
      }
      res.json(JSON.parse(data)); // Envia o JSON com os dados do usuário
  });
});


app.listen(PORT, () =>{
  console.log(`ok! port on-line : ${PORT}`);
})