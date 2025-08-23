const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  age: {
    type: Number,
    required: true,
    min: 0,
    max: 120
  },
  cpf: {
    type: String,
    required: true,
    unique: true,
    match: /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/,
    trim: true
  },
  name: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  income: {
    type: Number,
    required: true,
    min: 2999
  },
  location: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  }
});

module.exports = mongoose.model('Usuario', serviceSchema);