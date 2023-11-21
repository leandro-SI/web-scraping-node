const express = require('express');
const router = require('./src/router');

const app = express();

app.use(router);

app.listen(3000, () => {
    console.log('Servidor está funcionando...')
});

module.exports = app;
