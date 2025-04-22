import { DataTypes } from "sequelize";
import { sequelize } from "../db/postgres.js";

const User = sequelize.define(
  "User",
  {
    balance: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    timestamps: true,
  },
);

export default User;
