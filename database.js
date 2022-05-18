const Sequelize = require("sequelize");
const fs = require("fs");

const sequelize = new Sequelize(
  process.env.DB_SCHEMA || "postgres",
  process.env.DB_USER || "postgres",
  process.env.DB_PASSWORD || "",
  {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        rejectUnauthorized: true,
        require: true,
        ca: [fs.readFileSync("./ca-certificate.crt")]
      }
    }
  }
);

const Person = sequelize.define("Person", {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: true
  }
});

module.exports = {
  sequelize: sequelize,
  Person: Person
};
