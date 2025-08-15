// /server/models/Url.js
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
    // --- This is the corrected part ---
    unique: {
      name: 'unique_short_code_constraint',
      msg: 'The provided short code is already in use.',
    }
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt columns
});

module.exports = Url;