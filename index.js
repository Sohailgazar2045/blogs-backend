require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
let bodyParser = require("body-parser");
const blogRoute = require("./routes/BlogRoute");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Blogs API",
    version: "1.0.0",
    description: "CRUD for blogs",
  },
};

const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

app.use("/", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use(cors());
app.use(express.static("./public"));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Home API");
});

app.use("/blogs", blogRoute);

app.listen(process.env.PORT, () => {
  console.log("App is running on http://localhost:5000");
});
