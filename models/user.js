"use strict";
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      name: DataTypes.STRING,
      password: DataTypes.STRING
    },
    {}
  );
  user.associate = function(models) {
    // associations can be defined here
    user.hasMany(models.task, {
      as: "tasks",
      foreignKey: "user_id"
    });
  };
  return user;
};
