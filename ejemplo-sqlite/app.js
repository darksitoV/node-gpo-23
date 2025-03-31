const clientes = require('./models/clientes')

const obtener = async () => {
    const data = await clientes.findAll();
    console.log('data:', JSON.stringify(data))
}

obtener();