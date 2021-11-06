const sequelize = require("./utils/databaseUtils");

const fs = require("fs");
const { Type, Category, Pin } = require("./model");

const seedFilePath = "./data/seed.json";

sequelize.drop().then(() => {
    sequelize
        .sync()
        .then(async () => {
            console.log("Connected to database successfully!");
            let seed = JSON.parse(fs.readFileSync(seedFilePath));
            seed.pins.forEach((pin) => {
                Pin.create(pin, {
                    include: [
                        {
                            model: Type,
                            include: [Category],
                        },
                    ],
                });
            });
        })
        .catch((err) => {
            console.log("Unable to connect to database: ", err);
        });
});
