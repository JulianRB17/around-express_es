const express = require("express");
const { cardsRoute } = require("./routes/cards");
const { usersRoute } = require("./routes/users");
const mongoose = require("mongoose");

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/aroundb");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.user = { _id: "63b7159944de4201bfd63e9d" };
  next();
});
app.use("/cards", cardsRoute);
app.use("/users", usersRoute);
app.use((req, res) => {
  res.status(404);
  res.json({ message: "Recurso solicitado no encontrado" });
});

app.listen(PORT, () => {
  console.log(PORT);
});
