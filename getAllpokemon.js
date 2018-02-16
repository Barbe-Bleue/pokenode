const fetch = require ('node-fetch');
const cheerio = require ('cheerio');
const functionsjs = require('./functions.js');
const mongoose = require("mongoose");

function getPokemon(){
  let pokedex = [];
  let finalPokedex = [];
  const final = fetch("http://www.pokemontrash.com/pokedex/liste-pokemon.php")
  .then(res => res.text())
  .then(html => cheerio.load(html))
  .then($ => {
    $("#pokedex-list table.pokedex:last-child tbody tr").each((index,element) => {
      let type2 = "";
      let pokemon = $(element).children("td");
      let id = $(element).children("td:first-child").text();
      let name = pokemon.children("strong").children("a.name").text();
      let thumbails = "http://www.pokemontrash.com/pokedex/"+pokemon.children("img").attr("src");
      let idImage = functionsjs.addZeroToId(id);
      let image = "http://www.pokemontrash.com/pokedex/images/sugimori/"+idImage+".png";
      let type = pokemon.children("span.type1").text();

      if(typeof(pokemon.children("span.type2").text()) != "undefined"){
        type2 = pokemon.children("span.type2").text();
      }
      pokedex.push({
        "id":id,
        "name":name,
        "thumbnails": thumbails,
        "image":image,
        "type": type,
        "type2": type2
      })
    });
    return getEvols(pokedex);
  });
  return final;
}
module.exports = getPokemon;
async function getEvols(pokedex){
  const liste = [];
  for(let pokemon of pokedex){
    const evolutions = await fetch("http://www.pokemontrash.com/pokedex/"+pokemon.id+"-"+pokemon.name+".html")
    .then(res => res.text())
    .then(html => cheerio.load(html))
    .then($ => {
      const listEvol = [];
      $("div#Stages div").each((index,element) => {
        evolutionName = $(element).children("a").text();
        if($(element).children("span.evolution-trigger").text().match(/\d/g) != null){
          evolutionLvl = $(element).children("span.evolution-trigger")
          .text()
          .match(/\d/g)
          .join("");
        }else {
          evolutionLvl = "1";
        }
        const evolution = {
          evolutionLvl,
          evolutionName
        };
        listEvol.push(evolution);
      });
      return listEvol;
    });
    const newPoke = {
      ...pokemon,
      evolutions
    };
    liste.push(newPoke);
  }
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

  // CREER UN DOCUMENT
  for(let pok of liste){
    let c = new Client({
      id: pok.id,
      name: pok.name,
      thumbnails: pok.thumbnails,
      image: pok.image,
      type: pok.type,
      type2: pok.type2,
      evolution: pok.evolutions
    });
    // SAVE
    c.save();
    console.log(pok.name," ajouté !");
  }

  return liste;
}
