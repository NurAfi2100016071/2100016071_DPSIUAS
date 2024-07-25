module.exports = (sequelize, DataTypes) => {
  const Peminjaman = sequelize.define('Peminjaman', {
    id_peminjaman: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_user: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users', // sesuaikan dengan nama tabel dalam model `User`
        key: 'id_user'
      }
    },
    id_inventory: {
      type: DataTypes.INTEGER,
      references: {
        model: 'inventoryitem', // sesuaikan dengan nama tabel dalam model `InventoryItem`
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
    }
  }, {
    tableName: 'peminjaman'
  });
  return Peminjaman;
};
