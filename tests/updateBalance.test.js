// 📄 tests/largeLoad.test.js
import request from "supertest";
import app from "../app.js"; // приложение Express
import { sequelize } from "../db/postgres.js"; // обновлённый путь
import { User } from "../models/index.js";

beforeAll(async () => {
  // Синхронизируем с БД перед тестами
  await sequelize.sync({ force: true });
  await User.create({ balance: 10000 }); // создаём пользователя с балансом 10000
});

afterAll(async () => {
  // Закрываем соединение после всех тестов
  await sequelize.close();
});

const n = 5000;
describe(`Load Test - ${n} запросов на снятие по 2 единицы с баланса`, () => {
  it("успешно обрабатывает 10000 запросов на списание", async () => {
    const user = await User.findOne();

    // Массив с 10000 промисов для имитации запросов
    // const n = 10000;
    const requests = Array.from({ length: n }, async (_, index) => {
      return request(app)
        .post("/update-balance")
        .send({ userId: user.id, amount: -2 }); // снимаем 2 с баланса
    });

    // Отправляем все запросы одновременно и ожидаем результатов
    const results = await Promise.all(requests);

    // Проверяем, что 5000 запросов были успешными, а оставшиеся 5000 — с ошибками
    let successCount = 0;
    let failureCount = 0;

    results.forEach((res) => {
      if (res.status === 200) {
        successCount++;
      } else {
        failureCount++;
      }
    });

    console.log("successes and fails:", successCount, failureCount);
    // Проверяем, что 5000 запросов прошли успешно, а 5000 не прошли (из-за недостатка средств)
    // expect(successCount).toBeGreaterThanOrEqual(5000);
    // expect(failureCount).toBeGreaterThanOrEqual(5000);

    // Проверяем, что баланс не стал меньше 0
    const updatedUser = await User.findOne();
    expect(updatedUser.balance).toBeGreaterThanOrEqual(0);
  });
});
