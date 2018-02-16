const mongoose = require("mongoose");
const functionsjs = require("./functions.js");
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

module.exports.isPokeExist = async function(id) {
  return await Client.findOne()
  .where("id")
  .eq(id)

  const isExist = await this.isPokeExist(id).then(async function(result) {
    // si le pokémon existe
    if(result != null){
      return true;
    }else{
      return false;
    }
  });
  return isExist;
}

module.exports.findAllPoke = async function(res){
  const allPoke = await Client.find()
  .sort("_id") // triés par id croissants
  if(allPoke)
    res.json(allPoke);
  else
    res.status(404).json("Aucun pokémons :");
}

module.exports.findPokeById = async function(id,res) {
  const onePoke = await Client.find()
    .where("id")
    .eq(id)
  if(onePoke)
    res.json(onePoke);
  else
    res.status(404).json("Le pokémon n'existe pas !");
}

module.exports.findPokeByName = async function(name,res) {
  const onePoke = await Client.find()
  .where("name")
  .eq(name)
  if(onePoke)
    res.json(onePoke);
  else
    res.status(404).json("Le pokémon n'existe pas !");
}

module.exports.deletePokeById = async function(id,res) {
  // si le pokémon existe
  const del = await this.isPokeExist(id);
  if(del){
    await Client.remove()
    .where("id")
    .eq(id)
    res.json("Le pokémon n°"+id+" a été supprimé !");
  }else
    res.status(404).json("Le pokémon n'existe pas !");
}

module.exports.addPoke = async function(infoPoke,res){
  // si le pokémon existe
  const ajout = await this.isPokeExist(infoPoke.id);
  if(!ajout){
    // Check si les champs correspondent au Schema
    let problemo = checkInfoPokeWithSchema(infoPoke);
    if(!problemo){
      new Client(infoPoke).save();
      res.json("le pokémon "+infoPoke.name+" a été ajouté !");
    }else
      res.status(400).json("Le champs "+problemo+" n'est pas valide !");
  }else
    res.status(400).json("Le pokémon existe déjà !");
}

module.exports.patchPokeById = async function(idPoke,infoPoke,res){
  const update = await this.isPokeExist(idPoke);
  // si le pokémon existe
  if(update){
    // check si les champs correspondent au Schema
    let problemo = checkInfoPokeWithSchema(infoPoke);
    if(!problemo){
      // si tout est en ordre on update
      await Client.updateOne({ id: idPoke },{$set: infoPoke})
      res.json("le pokemon n°"+idPoke+" a été modifié !");
    }else
      res.status(400).json("Le champ "+problemo+" n'est pas valide !");
  }else
    res.status(404).json("Le pokémon n'existe pas !");
}

function checkInfoPokeWithSchema(infoPoke){
  for(let key in infoPoke ){
    // check si les champs correspondent au Schema
    if(!functionsjs.getObjectKeyIndex(clientSchema.obj, key)){
      // un des champs ne correspond pas au Schema
      return key;
    }
  } return false
}
