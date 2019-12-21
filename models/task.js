"use strict";
module.exports = (sequelize, DataTypes) => {
  const task = sequelize.define(
    "task",
    {
      name: DataTypes.STRING,
      completed: DataTypes.BOOLEAN,
      user_id: DataTypes.INTEGER
    },
    {}
  );
  task.associate = function(models) {
    // associations can be defined here
  };
  return task;
};
