"use strict";
module.exports = (sequelize, DataTypes) => {
  const UserModel = sequelize.define(
    "Users",
    {
      username: DataTypes.STRING,
      mobile:DataTypes.INTEGER,
      email:DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {}
  );
  UserModel.associate = function (models) {
    // associations can be defined here
  };
  return UserModel;
};
