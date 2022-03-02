const sequelize = require("./utils/databaseUtils");
const { Umzug, SequelizeStorage } = require("umzug");

const umzug = new Umzug({
    migrations: {
        glob: "./src/model/migrations/*.js",
    },
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize }),
    logger: console,
});

(async () => {
    // Checks migrations and run them if they are not already applied. To keep
    // track of the executed migrations, a table (and sequelize model) called SequelizeMeta
    // will be automatically created (if it doesn't exist already) and parsed.
    await umzug.up();
})();
