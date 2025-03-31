const { DataTypes } = require('sequelize')
const sequelize = require('../conexion')

// crear el modelo con sequelize
const clientes = sequelize.define('clientes', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING
    },
    correo: {
        type: DataTypes.STRING
    },
    saldo: {
        type: DataTypes.DOUBLE
    }
}, {
    timestamps: false // no mapear createdAt y updatedAt
})

module.exports = clientes;
