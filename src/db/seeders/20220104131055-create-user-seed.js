/* eslint-disable no-unused-vars */
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const uuid = uuidv4();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        uuid,
        username: 'numanash',
        first_name: 'Numan',
        last_name: 'Ashiq',
        email: 'admin@numanash.com',
        status: 1,
        email_verified: 1,
        password: bcrypt.hashSync('backobhai', 8),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  },
};
