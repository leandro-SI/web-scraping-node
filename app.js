const express = require('express');
const cors = require('cors');
const router = require('./src/router');

const app = express();

app.use(cors());
app.use(router);

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();
// });

app.listen(3000, () => {
    console.log('Servidor está funcionando...')
});

module.exports = app;
