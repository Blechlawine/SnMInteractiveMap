const sequelize = require("./utils/databaseUtils");

const fs = require("fs");
const { Type, Category, Pin } = require("./model");

const seedFilePath = process.argv[2] || "./data/seed.json";

sequelize.drop().then(() => {
    sequelize
        .sync()
        .then(async () => {
            console.log("Connected to database successfully!");
            let seed = JSON.parse(fs.readFileSync(seedFilePath));
            if (seed.pins) {
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
            }
            if (seed.categories) {
                seed.categories.forEach(cat => {
                    Category.create(cat, {
                        include: [Type],
                    });
                });
            }
            if (seed.types) {
                seed.types.forEach((type) => {
                    Type.create(type, {
                        include: [
                            Pin,
                            Category,
                        ],
                    });
                });
            }
        })
        .catch((err) => {
            console.log("Unable to connect to database: ", err);
        });
});
