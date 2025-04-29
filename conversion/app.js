const express = require('express')
const bodyParser = require('body-parser')
const monedas = require('./monedas') // Importar el modelo de la bd
const app = express()
const puerto = 3000

app.use(bodyParser.json())

app.listen(puerto, () => {
    console.log('servicio iniciado')
})

app.post('/convertir', async (req, res) => {
    const { origen, destino, cantidad } = req.body;
    
    // obtener la información de la base de datos
    const data = await monedas.findOne({
        where: {
            origen, destino
        }
    });

    if (!data) {
        res.sendStatus(404)
    }

    const { valor } = data;
    const resultado = cantidad * valor;

    res.send({
        origen, destino, cantidad, resultado
    })

})

app.get('/monedas', async (req, res) => {
    const data = await monedas.findAll();
    res.send(data);
})