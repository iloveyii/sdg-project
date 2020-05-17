'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Polls', {
      gameId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: false
      },
      loginId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: false
      },
      checked: Sequelize.STRING,
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Polls');
  }
};
