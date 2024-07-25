module.exports = (sequelize, DataTypes) => {
    const HistoryPeminjaman = sequelize.define('HistoryPeminjaman', {
      id_history: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      id_peminjaman: {
        type: DataTypes.INTEGER,
        references: {
          model: 'peminjaman',
          key: 'id_peminjaman'
        }
      },
      id_user: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id_user'
        }
      },
      id_inventory: {
        type: DataTypes.INTEGER,
        references: {
          model: 'inventoryitem',
          key: 'id_inventory'
        }
      },
      waktu_peminjaman: {
        type: DataTypes.DATE,
        allowNull: false
      },
      waktu_pengembalian: {
        type: DataTypes.DATE,
        allowNull: true
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      tableName: 'history_peminjaman'
    });
    return HistoryPeminjaman;
  };
  