const User = require("../models/user");

const error400 = function (res) {
  return res.status(400).send({
    message: "Se pasaron datos inválidos",
  });
};
const error404 = function (res) {
  res
    .status(404)
    .send({ message: "No se ha encontrado ningún usuario con ese ID" });
};
const serverError = function (res, err) {
  res.status(500).send({ message: "A ocurrido un error en el servidor" });
};

const getUsers = function (req, res) {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => serverError(res, err));
};

const getUser = function (req, res) {
  User.findById(req.params.userId)
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === "CastError") error404(res);
      serverError(res, err);
    });
};

const createUser = function (req, res) {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") error400(res);
      serverError(res, err);
    });
};

const updateUser = function (req, res) {
  const { name, about } = req.body;
  const userId = req.user._id;
  if (!name || !about) {
    const typeError = new Error("typeError");
    typeError.status(400);
    throw typeError;
  }
  User.findById(userId)
    .then((user) => {
      user.name = name;
      user.about = about;
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === "TypeError") error400(res);
      serverError(res, err);
    });
};

const updateAvatar = function (req, res) {
  const { avatar } = req.body;
  const userId = req.user._id;

  User.findById(userId)
    .then((user) => {
      if (!avatar) {
        const typeError = new Error("typeError");
        typeError.status(400);
        throw typeError;
      }
      user.avatar = avatar;
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === "TypeError") error400(res);
      serverError(res, err);
    });
};

module.exports = { getUser, getUsers, createUser, updateUser, updateAvatar };
