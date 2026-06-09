'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('score_statistics', {
      subject: {
        type: Sequelize.STRING(20),
        primaryKey: true,
        unique: true
      },

      gte8: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      gte6: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      gte4: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },

      lt4: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      }
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('score_statistics');
  }
};
