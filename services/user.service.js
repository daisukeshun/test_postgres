import { sequelize } from "../db/postgres.js";
import { Op } from "sequelize";
import { User } from "../models/index.js";

export const updateBalance = async (userId, amount) => {
  const updatedRows = await User.update(
    //Мне больше нравятся SQL-запросы вместо использования ORM, но если уж добавили sequelize то использовать попробуем по-максимуму
    { balance: sequelize.literal(`balance + ${amount}`) },
    {
      where: {
        id: userId,
        // Проверка, чтобы баланс не стал отрицательным
        balance: {
          [amount < 0 ? Op.gte : Op.ne]: null, // чтобы при пополнении не ограничивать
        },
      },
      // фильтр по балансу с учётом суммы
      returning: true,
      individualHooks: false,
      // важно: кастомное условие
      where: {
        id: userId,
        balance: {
          [Op.gte]: -amount,
        },
      },
    },
  );
  const [count, _] = updatedRows;
  if (count === 0) throw new Error("Insufficient funds or user not found");
};
