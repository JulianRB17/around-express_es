const usersRoute = require("express").Router();
const {
  getUser,
  getUsers,
  createUser,
  updateUser,
  updateAvatar,
} = require("../controllers/users");

usersRoute.get("/", (req, res) => getUsers(req, res));
usersRoute.get("/:userId", (req, res) => getUser(req, res));
usersRoute.post("/", (req, res) => createUser(req, res));
usersRoute.patch("/me", (req, res) => updateUser(req, res));
usersRoute.patch("/me/avatar", (req, res) => updateAvatar(req, res));

module.exports = { usersRoute };
