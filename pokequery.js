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

module.exports.findAllPoke = async function(){
  return await Client.find()
  .where("id")
  .gt(0)
  .sort("id") // triés par id croissants
}

module.exports.findPokeById = async function(id) {
  const findOne = await this.isPokeExist(id);
  if(findOne){
    const onePoke = await Client.find()
    .where("id")
    .eq(id)
    return onePoke;
  }else
    return "Le pokémon n'existe pas !";
}

module.exports.findPokeByName = async function(name) {
  return await Client.find()
  .where("name")
  .eq(name)
}

module.exports.isPokeExist = async function(id) {
  return await Client.findOne()
  .where("id")
  .eq(id)

  const isExist = await this.isPokeExist(idPoke).then(async function(result) {
    // si le pokémon existe
    if(result != null){
      return true;
    }else{
      return false;
    }
  });
  return isExist;
}

module.exports.deletePokeById = async function(id) {
  // si le pokémon existe
  const del = await this.isPokeExist(id);
  if(del){
    Client.remove()
    .where("id")
    .eq(id)
    return "Le pokémon n°"+infoPoke.id+" a été supprimé !"
  }else
    return "Le pokémon n'existe pas !";
}

module.exports.addPoke = async function(infoPoke){
  let c = new Client();

  // Check si les champs correspondent au Schema
  for(let key in infoPoke ){
    if(functionsjs.getObjectKeyIndex(clientSchema.obj, key)){
      c.key = infoPoke[key];
      console.log(c.key);
    }
  } c.save();
  if(c.save()) return true;
}

module.exports.patchPokeById = async function(idPoke,infoPoke){
  const tryUpdate = await this.isPokeExist(idPoke);
  // si le pokémon existe
  if(tryUpdate){
    // check si les champs correspondent au Schema
    let problemo = checkInfoPokeWithSchema(infoPoke);
    if(!problemo){
      // si tout est en ordre on update
      const update = Client.updateOne({ id: idPoke },{$set: infoPoke})
      return "le pokemon n°"+idPoke+" a été modifié !";
    }else
      return "Un des champs n'est pas valide";
  }else
    return "Le pokémon n'existe pas !";
  return tryUpdate;
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
