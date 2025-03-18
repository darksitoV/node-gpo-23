const express = require('express')
const app = express()
const puerto = 3000

// servidor web
app.listen(puerto, () => {
    console.log('servidor web iniciado ...')
})

// rutas
app.get('/sueldo/:tipo/:dias', (req, res) => {

    const { tipo, dias } = req.params; 

    // validaciones
    if (tipo < 1 || tipo > 3) { // bad request - tipo incorrecto
        res.sendStatus(400);
    }
    if (dias < 0 || dias > 28) { // bad request - dias incorrectos
        res.sendStatus(400);
    }

    let sueldoDiario, sueldoMensual, bonoMensual;
    
    switch(parseInt(tipo)) { // forzar a que tipo sea int
        case 1:
            sueldoDiario = 300;
            bonoMensual = 3000;
        break;
        case 2:
            sueldoDiario = 450;
            bonoMensual = 2700;
        break;
        case 3:
            sueldoDiario = 500;
            bonoMensual = 500;
        break;
    }

    if (dias < 25) { //quitar el bono en caso de no trabajar al menos 25 días 
        bonoMensual = 0;
    }

    // calcular el sueldo mensual
    sueldoMensual = sueldoDiario * dias + bonoMensual;

    // preparar los datos a regresar
    const data = {
        tipo,
        dias,
        sueldoDiario, 
        bonoMensual,
        sueldoMensual
    }

    res.send(data)
})