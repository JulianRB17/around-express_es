const usersRoute = require("express").Router();
const fs = require("fs");
const path = require("path");

const usersPath = path.join(__dirname, "../data/users.json");

const findUser = function (users, id, res) {
  const user = JSON.parse(users).find((user) => user._id === id);

  if (!user) {
    res.json({ message: "ID de usuario no encontrado" });
    res.status(404);
    return;
  }

  res.json(id);
};

usersRoute.get("/", (req, res) => {
  fs.readFile(usersPath, { encoding: "utf8" }, (err, cards) => {
    if (err) console.log(err);
    res.json(cards);
  });
});

usersRoute.get("/:id", (req, res) => {
  const { id } = req.params;

  fs.readFile(usersPath, { encoding: "utf8" }, (err, users) => {
    if (err) console.log(err);
    findUser(users, id, res);
  });
});

module.exports = { usersRoute };
