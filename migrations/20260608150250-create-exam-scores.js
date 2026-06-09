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
    await queryInterface.createTable('exam_scores', {
      sbd: {
        type: Sequelize.STRING(20),
        primaryKey: true,
        unique: true
      },

      toan: {
        type: Sequelize.DECIMAL(4, 2),
        allowNull: true,
        validate: {
          min: 0,
          max: 10
        }
      },
      ngu_van: {
        type: Sequelize.DECIMAL(4, 2),
        allowNull: true,
        validate: {
          min: 0,
          max: 10
        }
      },
      ngoai_ngu: {
        type: Sequelize.DECIMAL(4, 2),
        allowNull: true,
        validate: {
          min: 0,
          max: 10
        }
      },

      vat_li: {
        type: Sequelize.DECIMAL(4, 2),
        allowNull: true,
        validate: {
          min: 0,
          max: 10
        }
      },
      hoa_hoc: {
        type: Sequelize.DECIMAL(4, 2),
        allowNull: true,
        validate: {
          min: 0,
          max: 10
        }
      },
      sinh_hoc: {
        type: Sequelize.DECIMAL(4, 2),
        allowNull: true,
        validate: {
          min: 0,
          max: 10
        }
      },

      lich_su: {
        type: Sequelize.DECIMAL(4, 2),
        allowNull: true,
        validate: {
          min: 0,
          max: 10
        }
      },
      dia_li: {
        type: Sequelize.DECIMAL(4, 2),
        allowNull: true,
        validate: {
          min: 0,
          max: 10
        }
      },
      gdcd: {
        type: Sequelize.DECIMAL(4, 2),
        allowNull: true,
        validate: {
          min: 0,
          max: 10
        }
      },

      ma_ngoai_ngu: {
        type: Sequelize.STRING(10),
        allowNull: true
      },

      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('exam_scores');
  }
};
