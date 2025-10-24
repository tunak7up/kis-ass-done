'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('detail', {
      detail_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      detail_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      detail_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      kpi_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'kpi',
          key: 'kpi_id'
        }
      },
      route_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'route',
          key: 'route_id'
        }
      },
      detail_value: {
        type: Sequelize.FLOAT,
        allowNull: false
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('detail');
  }
};
