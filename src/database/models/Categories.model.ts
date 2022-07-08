import sequelize from "../db.js"
import { DataTypes } from "sequelize"

export const Categories = sequelize.define(
    "tbl_categories",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        user_id: DataTypes.STRING,
        name: DataTypes.STRING,
        picture: DataTypes.STRING,
    },
    {
        timestamps: false,
    }
)
