const cardsRoute = require("express").Router();
const fs = require("fs");
const path = require("path");

cardsRoute.get("/", (req, res) => {
  fs.readFile(
    path.join(__dirname, "../data/cards.json"),
    { encoding: "utf8" },
    (err, cards) => {
      if (err) console.log(err);
      res.json(cards);
    }
  );
});

module.exports = { cardsRoute };
