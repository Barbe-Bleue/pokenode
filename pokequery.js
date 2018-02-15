const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/pokedex");

const clientSchema = mongoose.Schema({
  id: Number,
  name: String,
  thumbnails: String,
  image: String,
  type: String,
  type2: String,
  evolution: Array
});

const Client = mongoose.model("pokemon", clientSchema);

module.exports.findAllPoke = async function(){
  return await Client.find()
  .where("id")
  .gt(0)
  .sort("id") // triés par id croissants
}
module.exports.findPokeById = function(id) {
  Client.find()
  .where("id")
  .eq(id)
  .exec((err, clients) => {return (clients)});
}

module.exports.findPokeByName = function(name) {
  Client.find()
  .where("name")
  .eq(name)
  .exec((err, clients) => {return (clients)});
}

module.exports.isPokeExist = function(id) {
  Client.find()
  .where("id")
  .eq(id)
  .exec((err, clients) => {return true});
}
