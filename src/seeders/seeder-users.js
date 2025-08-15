/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'Cam',
        lastName: 'Nguyen',
        password: '123456',
        email: 'admin@gmail.com',
        address: 'VN',
        gender:'1',
        typeRole: 'ROLE',
        keyROLE: 'R1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    // Xóa dữ liệu khi rollback
    return queryInterface.bulkDelete('Users', null, {});
  }
};
