'use strict';
module.exports = function(sequelize, DataTypes) {
	var BahasaPemrograman = sequelize.define('BahasaPemrogramans', {
		name: DataTypes.STRING
	});

	BahasaPemrograman.associate = function(models) {
		models.BahasaPemrogramans.hasMany(models.Artikels);
	};
	return BahasaPemrograman;
};