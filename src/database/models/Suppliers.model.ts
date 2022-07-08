import sequelize from "../db.js"
import { DataTypes } from "sequelize"

export const Suppliers = sequelize.define(
    "tbl_suppliers",
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
