// "use strict";

module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn("User", "firstName", Sequelize.STRING),
      queryInterface.addColumn("User", "lastName", Sequelize.STRING),
      queryInterface.addColumn("User", "profilePic", {
        type: Sequelize.STRING,
        validate: {
          isURL: true,
        },
      }),
    ]);
  },
  down: function (queryInterface, Sequelize) {
    // logic for reverting the changes
  },
};
