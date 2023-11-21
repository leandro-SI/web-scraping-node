const express = require('express');
const cors = require('cors');
const router = require('./src/router');
const app = express();
const port = 3000;

app.use(cors());
app.use(router);

app.listen(port, () => {
    console.log('Servidor está funcionando...')
});

module.exports = app;
