const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()
const puerto = 3000
const secretKey = 'secret'

app.use(express.json()) // alternativa a body parser

app.listen(puerto, () => {
    console.log('servicio iniciado')
})

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username == 'admin' && password == '123') { // generar el token
        const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
        res.send(token);
    } else {
        res.send(404);
    }
})

function verifyToken(req, res, next) { // middleware
    const header = req.header("Authorization") || "";
    const token = header.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Token no proporcionado" });
    }
     
    try {
        const payload = jwt.verify(token, secretKey);
        req.username = payload.username;
        next();
    } catch (error) {
        return res.status(403).json({ message: "Token no valido" });
    }
}

app.get('/clientes', verifyToken, (req, res) => {
    res.send({
        id: 1,
        nombre: 'Juan Perez'
    })
})