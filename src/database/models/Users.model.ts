import sequelize from "../db.js"
import { DataTypes } from "sequelize"

export const Live = sequelize.define(
 "tbl_suppliers",
 {
  id: {
   type: DataTypes.INTEGER,
   primaryKey: true,
  },
  name: DataTypes.STRING,
  phone: DataTypes.INTEGER,
  password: DataTypes.STRING,
  approved: DataTypes.STRING,
 },
 {
  timestamps: false,
 }
)
