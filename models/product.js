"use strict";

var moment = require("moment");

module.exports = (sequelize, DataTypes) => {
  //테이블명 define
  const product = sequelize.define(
    "Product",
    {
      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
      },
      seller: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
      imageUrl: {
        type: DataTypes.STRING(300),
        allowNull: true,
      },
      soldout: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      tableName: "product",
    }
  );

  return product;
};