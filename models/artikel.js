'use strict';
module.exports = function(sequelize, DataTypes) {
  var Artikel = sequelize.define('Artikels', {
    jenis_bahasan: DataTypes.STRING,
    keterangan: DataTypes.TEXT,
    BahasaPemrogramanId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    sumber_artikel: DataTypes.STRING
  });

  Artikel.associate = function (models) {
    // relasi dengan user
    models.Artikels.belongsTo(models.Users, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
    //relasi dengan Bahasa Pemrograman
    models.Artikels.belongsTo(models.BahasaPemrogramans, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Artikel;
};