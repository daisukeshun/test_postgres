/*
Тестовое задание для Back-End разработчиков.
Задание состоит из двух частей. К выполнению второй можно приступать только после
успешного выполнения первой части.
Задание 1. Создать простое webApp.

[*] Создать простое webApp, используя Node.js (Express, JavaScript), PostgresQL
(Sequelize ORM).

[*] При запуске приложение должно создать в базе данных таблицу “users” с
помощью миграции и добавить в неё один пользовательский аккаунт, на котором
будет лишь одно поле “balance” со значением 10000. Для совершения миграций,
управляемых приложением, можно использовать библиотеку “Umzug”.

[*] Написать route для обновления баланса пользователя, как в большую, так и в
меньшую сторону, принимающего параметры userId и amount.

[*] Важным условием является то, что баланс пользователя не может быть
отрицательным.

[*] Изменение баланса должно производиться в реальном времени, без
использования очередей и отложенных задач.
Данное задание будет тестироваться отправкой 10000 запросов в один момент на
попытку снять с баланса пользователя по 2 единицы. Успешно должно отработать 5000
запросов, вторая их половина должна получить адекватную ошибку о том, что средств
на балансе недостаточно.
*/
import express from "express";
import dotenv from "dotenv";
dotenv.config();

import userRoutes from "./routes/user.routes.js";
import errorHandler from "./middlewares/errorHandler.js";
import { sequelize } from "./db/postgres.js";

const app = express();

app.use(express.json());
app.use(userRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.get("/", (_, res) => res.end("Server is on"));

sequelize
  .authenticate()
  .then(() => {
    console.log("DB connected");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch(console.error);

export default app;
