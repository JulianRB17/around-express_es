const mongoose = require("mongoose");

const urlValidator = function (v) {
  return /(http(s?)):\/\/(www\.)?([a-z0-9-]{1,})\.([a-z]{1,})\/?([a-zA-Z\._~:\/\?%#\[\]@\!$&'\(\)\*\+,;=]){0,}/.test(
    v
  );
};

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: urlValidator,
      message: (value) => `${value} no es una dirección válida`,
    },
  },
});

module.exports = mongoose.model("user", userSchema);
