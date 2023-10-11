'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize)
  {
    await queryInterface.createTable('Images', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ProductId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Products',
          key: "id"
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      imgUrl: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notEmpty: {
            msg: "Image URL is required!"
          }
        }
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
  async down(queryInterface, Sequelize)
  {
    await queryInterface.dropTable('Images');
  }
};