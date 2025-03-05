const express = require('express');
const fs = require('fs'); // Interactuar con file system (fs)
const app = express();
const puerto = 3000;
const path = './clientes.json'; // archivo de datos (json)

// configurar body-parser (para utilizar req.body)
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// crear servidor web
app.listen(puerto, () => {
    console.log('Servidor web iniciado ...');
});

// --- rutas ---
app.get('/clientes', (req, res) => {

    fs.readFile(path, (err, data) => { // leer el archivo de datos
        // el contenido del archivo se guarda en "data"
        if (err) { // si hay error
            res.sendStatus(500);
        }
        const clientes = JSON.parse(data); // convertir data a JSON
        res.send(clientes);
    });

});

app.post('/clientes', (req, res) => {

    const contenido = req.body;

    fs.readFile(path, (err, data) => {
        const clientes = JSON.parse(data);
        clientes.push(contenido); // se agrega el contenido al array

        fs.writeFile(path, JSON.stringify(clientes), (err) => { // escribir en el archivo
            if (err) {
                res.sendStatus(500);
            }
            res.send(contenido);
        });

    })

    

});


/*
    notepad.pw/fic23
*/