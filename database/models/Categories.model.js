import sequelize from "../db.js"
import { DataTypes } from "sequelize"

export const Live = sequelize.define(
    "tbl_categories",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        name: DataTypes.STRING,
        picture: DataTypes.STRING,
    },
    {
        timestamps: false,
    }
)
