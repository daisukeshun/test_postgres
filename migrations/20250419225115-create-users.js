import { DataTypes } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
export default {
  up: async ({ context: queryInterface }) => {
    console.log("up");
    await queryInterface.createTable("Users", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      balance: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
    });

    await queryInterface.bulkInsert("Users", [
      {
        balance: 10000,
      },
    ]);
  },

  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable("Users");
  },
};
