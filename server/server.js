const path = require('path');
const express = require('express');
const compression = require('compression');

const port = process.env.PORT || 3000;
const publicPath = path.resolve(__dirname, '..', 'dist');

const app = express();
app.use(compression());
app.use(express.static(publicPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
