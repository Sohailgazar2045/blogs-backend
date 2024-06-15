const { DataTypes } = require("sequelize");
const sequelize = require("../db"); // Your Sequelize configuration

const Blog = sequelize.define(
  "Blog",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    showOnScreen: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true, // This will add createdAt and updatedAt fields
  }
);

// Blog.sync({ alter: true });

module.exports = Blog;
