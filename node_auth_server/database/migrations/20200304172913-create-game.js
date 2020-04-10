'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Games', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            objectId: {
                type: Sequelize.STRING
            },
            awayName: {
                type: Sequelize.STRING
            },
            homeName: {
                type: Sequelize.STRING
            },
            group: {
                type: Sequelize.STRING
            },
            name: {
                type: Sequelize.STRING
            },
            sport: {
                type: Sequelize.STRING
            },
            country: {
                type: Sequelize.STRING
            },
            state: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: true,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: true,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Games');
    }
};
