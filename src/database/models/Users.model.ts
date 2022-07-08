import sequelize from "../db.js"
import { DataTypes } from "sequelize"

export const User = sequelize.define(
    "tbl_users",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        name: DataTypes.STRING,
        phone: DataTypes.INTEGER,
        password: DataTypes.STRING,
        approved: DataTypes.BOOLEAN,
        logged_in: DataTypes.BOOLEAN,
    },
    {
        timestamps: false,
    }
)
