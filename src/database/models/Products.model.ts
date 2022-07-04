import sequelize from "../db.js"
import { DataTypes } from "sequelize"

export const Live = sequelize.define(
 "tbl_products",
 {
  id: {
   type: DataTypes.INTEGER,
   primaryKey: true,
  },
  user_id: DataTypes.STRING,
  name: DataTypes.STRING,
  picture: DataTypes.STRING,
  description: DataTypes.STRING,
  qr_code: DataTypes.STRING,
  category: DataTypes.STRING,
  supplier: DataTypes.STRING,
 },
 {
  timestamps: false,
 }
)
