const express = require('express');
const { getApp } = require('./app');

const app = express();

app.disable('x-powered-by');

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/blob.svg', getApp);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`BlobCDN listening at http://localhost:${port}`);
});
