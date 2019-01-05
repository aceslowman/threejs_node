const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

app.get('/', function(request,response){
  response.sendFile('index.html');
}).listen(PORT);
