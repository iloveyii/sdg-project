'use strict';
module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define('Game', {
    awayName: DataTypes.STRING,
    homeName: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    group: DataTypes.STRING,
    name: DataTypes.STRING,
    sport: DataTypes.STRING,
    country: DataTypes.STRING,
    state: DataTypes.STRING
  }, {
    sequelize,
    modelName: "Game"
  });

  Game.associate = function(models) {
    // 1-to-many with Login
    Game.belongsToMany(models.Login, {foreignKey: 'gameId', through: 'Poll'} )
  };
  return Game;
};
