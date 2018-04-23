'use strict';

var crypto = require('crypto');

var secret = 'andaglos';
var passwordku = crypto.createHmac('sha256', secret)
.update('123456')
.digest('hex');

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example: */
      return queryInterface.bulkInsert('Users', [{
        username: 'admin',
        first_name: 'admin',
        last_name: 'daily-programming',
        password: passwordku,
        email: 'admin@gmail.com',
        alamat: 'Bandar Lampung',
        jabatan: 'Admin',
        createdAt : new Date(),
        updatedAt : new Date() 
      }], {});
    },

    down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example: */
      queryInterface.bulkDelete('Users', [{
        username :'admin'
      }])

    }
  };
