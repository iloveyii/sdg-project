'use strict';
module.exports = (sequelize, DataTypes) => {
  const Poll = sequelize.define('Poll', {
    gameId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false
    },
    loginId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false
    },
    checked: DataTypes.STRING
  }, {
    sequelize,
    modelName: "Polls"
  });
  Poll.associate = function(models) {
    // associations can be defined here
  };
  return Poll;
};
