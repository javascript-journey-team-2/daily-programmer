'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:   */
      return queryInterface.bulkInsert('BahasaPemrogramans', [{
        name: 'Javascript',
        createdAt : new Date(),
        updatedAt : new Date() 
      },{
        name: 'PHP',
        createdAt : new Date(),
        updatedAt : new Date()
      },{
        name: 'Java',
        createdAt : new Date(),
        updatedAt : new Date() 
      },{
       name: 'Ruby',
       createdAt : new Date(),
       updatedAt : new Date() 
     }], {});

    },

    down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
      */
      queryInterface.bulkDelete('BahasaPemrogramans', [{
        name :'Javascript'
      },{
        name : 'PHP'
      },{
        name : 'Java'
      },{
        name : 'Ruby'
      }])
    }
  };
