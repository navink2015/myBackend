"use strict";
module.exports = (sequelize, DataTypes) => {
  const ProfileModel = sequelize.define(
    "Profile",
    {
      profileId:DataTypes.INTEGER,
      name: DataTypes.STRING,
      lastName: DataTypes.STRING,
      age:DataTypes.INTEGER,
      address:DataTypes.STRING,
      linkedInId:DataTypes.STRING,
      gitHubId: DataTypes.STRING,
    },
    {}
  );
  ProfileModel.associate = function (models) {
    // associations can be defined here
  };
  return ProfileModel;
};
