const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Url = sequelize.define('Url', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  longUrl: {
    type: DataTypes.STRING(2048),
    allowNull: false,
  },
  shortCode: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  timestamps: true,
});

module.exports = Url;