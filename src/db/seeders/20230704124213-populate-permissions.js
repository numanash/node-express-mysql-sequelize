/* eslint-disable no-unused-vars */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('permissions', [
      { name: 'admin', createdAt: new Date(), updatedAt: new Date() },
      { name: 'user', createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('permissions', null, {});
  },
};
