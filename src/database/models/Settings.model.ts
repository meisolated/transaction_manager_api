import sequelize from "../db.js"
import { DataTypes } from "sequelize"

export const Settings = sequelize.define(
    "tbl_settings",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        name: DataTypes.STRING,
        value: DataTypes.STRING,
    },
    {
        timestamps: false,
    }
)
