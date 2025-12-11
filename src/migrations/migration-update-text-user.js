// export default {
//     up: async (queryInterface, Sequelize) => {
//         await queryInterface.changeColumn('Users', 'image', {
//             type: Sequelize.BLOB('long'),
//             allowNull: true,
//         });
//     },

//     down: async (queryInterface, Sequelize) => {
//         await queryInterface.changeColumn('Users', 'image', {
//             type: Sequelize.STRING,
//             allowNull: true,
//         });
//     }
// };
export default {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn('Users', 'image', {
            type: Sequelize.TEXT('long'),
            allowNull: true,
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn('Users', 'image', {
            type: Sequelize.BLOB('long'), //
            allowNull: true,
        });
    }
};


