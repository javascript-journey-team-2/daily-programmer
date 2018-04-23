'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Artikels', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      jenis_bahasan: {
        type: Sequelize.STRING
      },
      keterangan: {
        type: Sequelize.TEXT
      },
      BahasaPemrogramanId: {
        type: Sequelize.INTEGER, 
        onDelete: "CASCADE", 
        allowNull: false, 
        references: { 
          model: 'BahasaPemrogramans', 
          key: 'id' 
        }
      },
      UserId: {
        type: Sequelize.INTEGER, 
        onDelete: "CASCADE", 
        allowNull: false, 
        references: { 
          model: 'Users', 
          key: 'id' 
        } 
      },
      sumber_artikel: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Artikels');
  }
};