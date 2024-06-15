const { Sequelize } = require("sequelize");
// const sequelize = new Sequelize("blogs_test", "root", "Sohail@2045", {
//   host: "localhost",
//   dialect: "mysql",
// });

const sequelize = new Sequelize({
  dialect: "mysql",
  database: "techscope_db",
  username: "techscope-admin",
  password: "L8m(KF0+[~lr",
  host: "173.201.188.181",
});

// const sequelize = new Sequelize({
//   dialect: "mysql",
//   database: "mzblog_db",
//   username: "blogdbuser",
//   password: "OGdchc@Hh%XI",
//   host: "173.201.188.181",
// });

const dbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
dbConnection();
module.exports = sequelize;
