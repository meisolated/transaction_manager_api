import sequelize from "../db.js"
import { DataTypes } from "sequelize"

export const Live = sequelize.define(
 "tbl_suppliers",
 {
  id: {
   type: DataTypes.INTEGER,
   primaryKey: true,
  },
  user_id: DataTypes.STRING,
  working_under_user_id: DataTypes.INTEGER,
  approved: DataTypes.STRING,
 },
 {
  timestamps: false,
 }
)
