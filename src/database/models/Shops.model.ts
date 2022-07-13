import sequelize from "../db.js"
import { DataTypes } from "sequelize"

export const Shops = sequelize.define(
    "tbl_shops",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        user_id: DataTypes.STRING,
        shop_id: DataTypes.STRING,
        name: DataTypes.STRING,
        address: DataTypes.STRING,
        phone: DataTypes.STRING,
        picture: DataTypes.STRING,
        qr_code: DataTypes.STRING,
    },
    {
        timestamps: false,
    }
)
