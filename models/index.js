require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config.json');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: dbConfig.dialect,
    dialectModule: require('mysql2'),
    logging: console.log,
    port: process.env.DB_PORT
  }
);

const db = {};

// Import Models
const User = require('./user')(sequelize, Sequelize.DataTypes);
const InventoryItem = require('./inventoryitem')(sequelize, Sequelize.DataTypes);
const Peminjaman = require('./peminjaman')(sequelize, Sequelize.DataTypes);
const HistoryPeminjaman = require('./history_peminjaman')(sequelize, Sequelize.DataTypes);
const Notifikasi = require('./notifikasi')(sequelize, Sequelize.DataTypes);

// Define Associations
User.hasMany(Peminjaman, { foreignKey: 'id_user' });
InventoryItem.hasMany(Peminjaman, { foreignKey: 'id_inventory' });
Peminjaman.belongsTo(User, { foreignKey: 'id_user' });
Peminjaman.belongsTo(InventoryItem, { foreignKey: 'id_inventory' });

// Add models to db object
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.User = User;
db.InventoryItem = InventoryItem;
db.Peminjaman = Peminjaman;
db.HistoryPeminjaman = HistoryPeminjaman;
db.Notifikasi = Notifikasi;

// Test connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = db;
