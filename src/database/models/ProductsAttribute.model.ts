import sequelize from "../db.js"
import { DataTypes } from "sequelize"

export const Live = sequelize.define(
 "tbl_products_attributes",
 {
  id: {
   type: DataTypes.INTEGER,
   primaryKey: true,
  },
  user_id: DataTypes.STRING,
  product_id: DataTypes.INTEGER,
  number: DataTypes.STRING,
  metric: DataTypes.STRING,
  cost_price: DataTypes.STRING,
  price: DataTypes.STRING,
 },
 {
  timestamps: false,
 }
)
