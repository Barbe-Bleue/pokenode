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
  return await Client.find()
  .where("id")
  .eq(id)
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
}

module.exports.deletePokeById = async function(id) {
  return await Client.remove()
  .where("id")
  .eq(id)
}

module.exports.addPoke = async function(infoPoke){
  let c = new Client();

  // Check si les champs  correspondent au Schema
  for(let key in infoPoke ){
    if(functionsjs.getObjectKeyIndex(clientSchema.obj, key)){
      c.key = infoPoke[key];
      console.log(c.key);
    }
  } c.save();
  if(c.save()) return true;
}

module.exports.patchPokeById = async function(idPoke,infoPoke){
  const tryUpdate = await this.isPokeExist(idPoke).then(async function(result) {
    if(result != null){
      let  problemo = false;
      for(let key in infoPoke ){
        if(!functionsjs.getObjectKeyIndex(clientSchema.obj, key)){
          problemo = true;
          return "Un des champs n'est pas valide";
        }
      }
      if(!problemo){
        const update = Client.updateOne({ id: idPoke },{$set: infoPoke})
          return "le pokemon n°"+idPoke+" a été modifié !";
      }
    }else{
      return "Le pokémon n'existe pas !";
    }
  });
  return tryUpdate;
}
