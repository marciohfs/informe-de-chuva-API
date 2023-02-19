const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

//imports
const personRoutes = require('./src/routes/rotas.js');

//settings
app.set('port', 5001);

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//routes
app.use(personRoutes);

//run
app.listen(app.get('port'), () => {
    console.log('Server on Port 5001')
})

//Erros
app.use((req, res, next) => {
    const error = new Error('Não encontrado!');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.json({
        error: {
            "mensagem": error.message
        }
    });
});

//Mantem a API on mesmo se der erro
process.on('uncaughtException', function (err) {
    console.log('Uncaught Exception: ', err);
});

setTimeout(function () {
    console.log('Server ON');
}, 500);

// Intentionally cause an exception, but don't catch it.
// nonexistentFunc();
// console.log('This will not run.');

//Fecha API se der erro
// process.on('uncaughtException', err => {
//     console.log(`Uncaught Exception: ${err.message}`)
//     process.exit()
// })