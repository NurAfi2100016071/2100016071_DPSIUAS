module.exports = (sequelize, DataTypes) => {
    const Notifikasi = sequelize.define('Notifikasi', {
      id_notifikasi: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id_user'
        }
      },
      id_peminjaman: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'peminjaman',
          key: 'id_peminjaman'
        }
      },
      pesan: {
        type: DataTypes.STRING,
        allowNull: false
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      tableName: 'notifikasi',
      timestamps: false
    });
  
    Notifikasi.associate = function(models) {
      Notifikasi.belongsTo(models.User, { foreignKey: 'id_user', as: 'users' });
      Notifikasi.belongsTo(models.Peminjaman, { foreignKey: 'id_peminjaman', as: 'peminjaman' });
    };
  
    return Notifikasi;
  };
  