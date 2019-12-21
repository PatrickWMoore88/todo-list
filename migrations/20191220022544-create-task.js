"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return (
      queryInterface
        .createTable("tasks", {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
          name: {
            type: Sequelize.STRING
          },
          completed: {
            type: Sequelize.BOOLEAN
          },
          user_id: {
            type: Sequelize.INTEGER
            // references: {
            //   model: {
            //     tableName: "users"
            //   },
            //   key: "id"
            // },
            // allowNull: false
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
          }
        })
        // Or This Can Be Used To Do The Same
        .then(function() {
          queryInterface.addConstraint("tasks", ["user_id"], {
            type: "FOREIGN KEY",
            name: "user_id_fk",
            references: {
              table: "users",
              field: "id"
            },
            onDelete: "cascade",
            onUpdate: "cascade"
          });
        })
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("tasks");
  }
};
