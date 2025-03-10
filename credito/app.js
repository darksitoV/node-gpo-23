const express = require ('express')
const fs = require('fs') // file system (sistema de archivos)
const app = express()
const puerto = 3000

// configurar body-parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// crear servidor web
app.listen(puerto, () => {
    console.log('Servidor web iniciado')
})

// crear ruta
app.post('/credito', (req, res) => {
    const contenido = req.body;
    const { numeroCredito, claveCliente, nombreCliente, importe, pagoMensual, fechaInicio, fechaTermino } = contenido;
    const path = `./credito-${numeroCredito}.json`;

    const credito = {
        numeroCredito, claveCliente, nombreCliente, importe, pagoMensual, fechaInicio, fechaTermino
    };

    // crear el archivo JSON
    fs.writeFile(path, JSON.stringify(credito), (err) => {
        res.send('OK');
    })

})