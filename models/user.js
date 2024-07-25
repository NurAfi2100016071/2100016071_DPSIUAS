module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id_user: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['admin', 'user']] // Memastikan role hanya bisa 'admin' atau 'user'
      }
    }
  }, {
    tableName: 'users' // sesuaikan dengan referensi dalam model `Peminjaman`
  });

  return User;
};
