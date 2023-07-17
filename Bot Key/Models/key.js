const { Schema, model } = require('mongoose')

const userset = new Schema({
    username: { type: String },
    key: { type: String }
  });
  
module.exports = model("key", userset);