const express = require("express");
const app = express();
const PORT = 5000 || process.env.PORT;
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const todoapp = require("./routers/index");
const user = require("./routers/auth/index");
const checkAuth = require("./middleware/checkAuth");

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));

const db = require("knex")({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "",
    database: ""
  }
});

app.post("/signin", (req, res) => {
  user.signin(req, res, db);
});
app.post("/signup", (req, res) => {
  user.signup(req, res, db);
});
app.post("/app", checkAuth, (req, res) => {
  todoapp.addTodo(req, res, db);
});
app.get("/app", (req, res) => {
  todoapp.getTodos(req, res, db);
});
app.delete("/app/:id", checkAuth, (req, res) => {
  todoapp.deleteTodo(req, res, db);
});
app.put("/app", checkAuth, (req, res) => {
  todoapp.changeTodo(req, res, db);
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
