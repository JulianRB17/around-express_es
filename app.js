const express = require("express");
const { cardsRoute } = require("./routes/cards");
const { usersRoute } = require("./routes/users");

const { PORT = 3000 } = process.env;
const app = express();

app.use("/cards", cardsRoute);
app.use("/users", usersRoute);
app.use((req, res) => {
  res.status(404);
  res.json({ message: "Recurso solicitado no encontrado" });
});

app.listen(PORT, () => {
  console.log(PORT);
});
