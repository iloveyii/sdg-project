'use strict';
module.exports = (sequelize, DataTypes) => {
  const Login = sequelize.define('Login', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: "Login"
  });
  Login.associate = function(models) {
    // 1-to-many with Game
    Login.belongsToMany(models.Game, {foreignKey: 'loginId', through: 'Poll'} )
  };
  return Login;
};
