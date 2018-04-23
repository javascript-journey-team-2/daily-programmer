'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('Users', {
    username: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    alamat: DataTypes.STRING,
    jabatan: DataTypes.STRING
  });

  User.associate = function(models) {
    models.Users.hasMany(models.Artikels);
  };

  return User;
};


