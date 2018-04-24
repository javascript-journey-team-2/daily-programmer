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
  },{
    getterMethods: {
      fullName() {
        return this.firstname + ' ' + this.lastname
      }
    },

    setterMethods: {
      fullName(value) {
        const names = value.split(' ');

        this.setDataValue('firstname', names.slice(0, -1).join(' '));
        this.setDataValue('lastname', names.slice(-1).join(' '));
      },
    }
  });

  User.associate = function(models) {
    models.Users.hasMany(models.Artikels);
  };

  return User;
};


