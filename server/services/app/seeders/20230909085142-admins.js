'use strict';

const { query } = require('express');
const { hashPassword } = require('../helpers/bcryptHelper');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize)
  {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const admins = require('../datas/admin.json').map(x =>
    {
      x.password = hashPassword(x.password)
      x.createdAt = new Date();
      x.updatedAt = new Date();
      return x
    });
    await queryInterface.bulkInsert('Users', admins, {});
  },

  async down(queryInterface, Sequelize)
  {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});

  }
};
