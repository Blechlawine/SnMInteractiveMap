const { DataTypes } = require("sequelize");

module.exports = {
    up: ({ context: queryInterface }) => {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.addColumn(
                    "pins",
                    "status",
                    {
                        type: DataTypes.ENUM,
                        defaultValue: "submitted",
                        values: ["submitted", "published"],
                    },
                    { transaction: t }
                ),
                queryInterface.addColumn(
                    "types",
                    "status",
                    {
                        type: DataTypes.ENUM,
                        defaultValue: "submitted",
                        values: ["submitted", "published"],
                    },
                    { transaction: t }
                ),
                queryInterface.addColumn(
                    "categories",
                    "status",
                    {
                        type: DataTypes.ENUM,
                        defaultValue: "submitted",
                        values: ["submitted", "published"],
                    },
                    { transaction: t }
                ),
            ]);
        });
    },
    down: ({ context: queryInterface }) => {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.removeColumn("pins", "status", { transaction: t }),
                queryInterface.removeColumn("types", "status", { transaction: t }),
                queryInterface.removeColumn("categories", "status", { transaction: t }),
            ]);
        });
    },
};
