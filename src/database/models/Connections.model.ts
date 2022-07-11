import sequelize from "../db.js"
import { DataTypes } from "sequelize"

export const Connections = sequelize.define(
    "tbl_connections",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        user_id: DataTypes.INTEGER,
        working_under_user_id: DataTypes.INTEGER,
        approved: DataTypes.STRING,
    },
    {
        timestamps: false,
    }
)
