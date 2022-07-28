const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    Phone: {type: DataTypes.STRING},
    FIO: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: 'USER'}
})
const Declarations = sequelize.define('declaration', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, unique: true},
    image: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING},
    price: {type: DataTypes.INTEGER, allowNull: false},
})
const City = sequelize.define('city', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})
const typeOrend = sequelize.define('typeOrend', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})
const DeclarationInfo = sequelize.define('declarationInfo', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
})

User.hasMany(Declarations)  // від связі від до
Declarations.belongsTo(User)  // в іншу сторону

City.hasOne(Declarations)
Declarations.belongsTo(City)

typeOrend.hasOne(Declarations)
Declarations.belongsTo(typeOrend)

Declarations.hasMany(DeclarationInfo, {as: 'info'});
DeclarationInfo.belongsTo(Declarations)



module.exports = {
    User,
    Declarations,
    City,
    typeOrend,
    DeclarationInfo
}