const { Sequelize } = require('sequelize')

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './ventas.sqlite' // nombre del archivo de bd
})

module.exports = sequelize;