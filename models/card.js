const mongoose = require("mongoose");

const urlValidator = function (v) {
  return /(http(s?)):\/\/(www\.)?([a-z0-9-]{1,})\.([a-z]{1,})\/?([a-zA-Z\._~:\/\?%#\[\]@\!$&'\(\)\*\+,;=]){0,}/.test(
    v
  );
};

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: urlValidator,
      message: (value) => `${value} no es una dirección válida`,
    },
  },
  owner: {
    type: mongoose.ObjectId,
    required: true,
  },
  likes: {
    type: [{ type: mongoose.ObjectId }],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("card", cardSchema);
