'use strict';
var Slack = require('slack-node');

var webhookUri = "https://hooks.slack.com/services/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";

var slack = new Slack();
slack.setWebhook(webhookUri);


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

  Artikel.afterCreate((artikel, options) => {

   var Users = sequelize.define('Users', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING
  },{
    getterMethods: {
      fullName() {
        return this.first_name + ' ' + this.last_name
      }
    },

    setterMethods: {
      fullName(value) {
        const names = value.split(' ');

        this.setDataValue('first_name', names.slice(0, -1).join(' '));
        this.setDataValue('last_name', names.slice(-1).join(' '));
      },
    }
  });

   var BahasaPemrogramans = sequelize.define('BahasaPemrogramans', {
    name: DataTypes.STRING
  });

   Artikel.findOne({ 
     where: {
      id: artikel.id
    },
    include: [ Users, BahasaPemrogramans]
  }).then(artikels => {

    console.log(JSON.stringify(artikels))
    slack.webhook({
      text: `${artikels.User.fullName} Menambahkan sebuah artikel ${artikels.BahasaPemrograman.name} mengenai ${artikels.jenis_bahasan} , silakan cek disini ${artikels.sumber_artikel}`
    }, function(err, response) {
      console.log(response);
    });

  });

});
  return Artikel;
};