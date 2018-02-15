const fetch = require ('node-fetch');
const cheerio = require ('cheerio');
const addZeroToId = require('./functions.js');
const getEvolution = require('./evolution.js');


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
      let idImage = addZeroToId(id);
      let image = "http://www.pokemontrash.com/pokedex/images/sugimori/"+idImage+".png";
      let type = pokemon.children("span.type1").text();

      if(typeof(pokemon.children("span.type2").text()) != "undefined"){
        type2 = pokemon.children("span.type2").text();
      }
      pokedex.push({
        "id":id,
        "name":name,
        "thumbails": thumbails,
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
    console.log(pokemon);
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
  console.log(liste[0]);
  return liste;
}
