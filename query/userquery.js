const mongoose = require("mongoose");
const functionsjs = require("./functions.js");
const bcrypt =  require("bcrypt-nodejs");
mongoose.connect("mongodb://localhost/pokedex");

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  pokemonsCapture: Array
});

const Client = mongoose.model("users", userSchema);

module.exports.isUserExist = async function(email) {
  return await Client.findOne()
  .where("email")
  .eq(email)

  const isExist = await this.isUserExist(email).then(async function(result) {
    // si le user existe
    if(result != null){
      return true;
    }else{
      return false;
    }
  });
  return isExist;
}

module.exports.findUserById = async function(id,res) {
  const oneUser = await Client.findOne()
    .where("_id")
    .eq(id)
  if(oneUser)
    res.json(oneUser);
  else
    res.status(404).json("Le user n'existe pas !");
}

module.exports.findAllUser = async function(res){
  const allUser = await Client.find()
    .sort("_id") // triés par id croissants
  if(allUser)
    res.json(allUser);
  else
    res.status(400).json("Aucun users !");
}

module.exports.addUser = async function(infoUser,res){
  // si le user existe
  const ajout = await this.isUserExist(infoUser.email);
  if(!ajout){
    // Check si les champs correspondent au Schema
    let problemo = checkInfoUserWithSchema(infoUser);
    if(!problemo){
      infoUser.password = bcrypt.hashSync(infoUser.password, 10)
      new Client(infoUser).save();
      res.json("Le user "+infoUser.name+" a été ajouté !");
    }else
      res.status(200).json("Le champs "+problemo+" n'est pas valide !");
  }else
    res.status(200).json("Le user existe déjà !");
}

function checkInfoUserWithSchema(infoUser){
  for(let key in infoUser ){
    // check si les champs correspondent au Schema
    if(!functionsjs.getObjectKeyIndex(userSchema.obj, key)){
      // un des champs ne correspond pas au Schema
      return key;
    }
  } return false
}
