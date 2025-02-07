const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 4040;

app.use(express.static('./server'));

app.listen(PORT, () =>{
  console.log(`ok! port on-line : ${PORT}`);
})