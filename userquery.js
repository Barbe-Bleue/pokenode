const mongoose = require("mongoose");
const functionsjs = require("./functions.js");
mongoose.connect("mongodb://localhost/pokedex");

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  pokemonsCapture: Array
});

const Client = mongoose.model("users", userSchema);

module.exports.findAllUser = async function(){
  return await Client.find()
  .sort("_id") // triés par id croissants
}

module.exports.findUserById = async function(id) {
    const oneUser = await Client.findOne()
      .where("_id")
      .eq(id)
    if(oneUser)
      return oneUser;
    else
      return "Le user n'existe pas !";
}
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

module.exports.addUser = async function(infoUser){
  // si le user existe
  const ajout = await this.isUserExist(infoUser.email);
  if(!ajout){
    // Check si les champs correspondent au Schema
    let problemo = checkInfoUserWithSchema(infoUser);
    if(!problemo){
      new Client(infoUser).save();
      return "Le user "+infoUser.name+" a été ajouté !";
    }else
      return "Le champs "+problemo+" n'est pas valide !";
  }else
    return "Le user existe déjà !";
  return ajout;
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
