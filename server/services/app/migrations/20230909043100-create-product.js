'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize)
  {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notEmpty: {
            msg: "Product name is required!"
          }
        }
      },
      slug: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notEmpty: {
            msg: "Slug is required!"
          }
        }
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notEmpty: {
            msg: "Description is required!"
          }
        }
      },
      price: {
        allowNull: false,
        type: Sequelize.INTEGER,
        validate: {
          min: {
            msg: "Minimum price is 100000",
            args: 100000
          }
        }
      },
      userMongoId: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notEmpty: {
            msg: "MongoID is required!"
          }
        }
      },
      mainImg: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notEmpty: {
            msg: "Main image is required!"
          }
        }
      },
      CategoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Categories",
          key: "id"
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      AuthorId: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Products');
  }
};