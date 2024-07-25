module.exports = (sequelize, DataTypes) => {
    const InventoryItem = sequelize.define('InventoryItem', {
      id_inventory: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nama_barang: {
        type: DataTypes.STRING,
        allowNull: false
      },
      ketersediaan: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      detail: {
        type: DataTypes.STRING,
        allowNull: true
      }
    }, {
      tableName: 'inventoryitem'
    });
    return InventoryItem;
  };
  