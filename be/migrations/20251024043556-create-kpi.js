'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('kpi', {
      kpi_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      kpi_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      monthly_cumulative_calculation_type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      content_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'content',
          key: 'content_id'
        }
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('kpi');
  }
};
