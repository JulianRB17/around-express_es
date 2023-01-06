const mongoose = require("mongoose");
const Card = require("../models/card");

const serverError = function (res, err) {
  res.status(500).send({ message: "A ocurrido un error en el servidor" });
};
const error404 = function (res) {
  res.status(404).send({ message: "Tarjeta no encontrada" });
};
const error400 = function (res) {
  return res
    .status(400)
    .send({
      message:
        "Se pasaron datos inválidos a los métodos para crear un usuario/tarjeta o para actualizar el avatar/perfil de un usuario",
    });
};

const getCards = function (req, res) {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => serverError(res, err));
};

const deleteCard = function (req, res) {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === "CastError") error404(res);
      serverError(res, err);
    });
};

const createCard = function (req, res) {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === "ValidationError") error400(req, res);
      serverError(res, err);
    });
};

const likeCard = function (req, res) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === "CastError") error404(res);
      serverError(res, err);
    });
};

const unlikeCard = function (req, res) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === "CastError") error404(res);
      serverError(res, err);
    });
};

module.exports = { getCards, deleteCard, createCard, likeCard, unlikeCard };
