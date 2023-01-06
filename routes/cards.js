const cardsRoute = require("express").Router();
const {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  unlikeCard,
} = require("../controllers/cards");

cardsRoute.get("/", (req, res) => getCards(req, res));
cardsRoute.post("/", (req, res) => createCard(req, res));
cardsRoute.delete("/:cardId", (req, res) => deleteCard(req, res));
cardsRoute.put("/:cardId/likes", (req, res) => likeCard(req, res));
cardsRoute.delete("/:cardId/likes", (req, res) => unlikeCard(req, res));

module.exports = { cardsRoute };
