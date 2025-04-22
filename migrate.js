import { Umzug, SequelizeStorage } from "umzug";
import { sequelize } from "./db/postgres.js";
import { pathToFileURL } from "url";

const runMigrations = async () => {
  const umzug = new Umzug({
    migrations: {
      glob: "migrations/*.js",
      resolve: ({ name, path }) => {
        //чтобы JS modules работали
        return {
          name,
          up: async (params) => {
            const mod = await import(pathToFileURL(path).href);
            return mod.default.up(params);
          },
          down: async (params) => {
            const mod = await import(pathToFileURL(path).href);
            return mod.default.down(params);
          },
        };
      },
    },

    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize }),
    //по-хорошему, не использовать консоль, так как в node она довольно медленная, но пока оставлю так
    // logger: console,
    logger: { info: (a) => "" },
  });
  await umzug.up();
};

runMigrations().then(() => {
  console.log("Migrations complete");
  process.exit();
});
