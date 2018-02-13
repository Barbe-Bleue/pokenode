const mongoose = require("mongoose");
const express = require('express');
const app = express();
const fetch = require ('node-fetch');
const cheerio = require ('cheerio');
const request = require ('request');

mongoose.connect("mongodb://localhost/test");

app.get('/', (req, res) =>
  res.send("Bienvenue sur notre Pokenode")
)

app.get('/pokemons', function (req, res) {
  console.log("Got a POST request for the homepage");
  let pokedex = [];
  fetch("http://www.pokemontrash.com/pokedex/liste-pokemon.php#gen1")
    .then(res => res.text())
    .then(html => cheerio.load(html))
    .then($ => {
      $("#pokedex-list table.pokedex:nth-child(14) tbody").each((index,element) => {
        $(element).children("tr").each((index,element2) =>{
          let type2 = "";
          let pokemon = $(element2).children("td");
          let id = $(element2).children("td:first-child").text();
          let name = pokemon.children("strong").children("a.name").text();
          let image = pokemon.children("img").attr("src");
          let type = pokemon.children("span.type1").text();

          if(typeof(pokemon.children("span.type2").text()) != "undefined"){
            type2 = pokemon.children("span.type2").text();
          }

          pokedex.push({
            "id":id,
            "name":name,
            "image":image,
            "type": type,
            "type2": type2
          })
        });
        res.send(pokedex);
      });
    });
})

app.get('/pokemons/:id', function (req, res) {
  console.log("Got a POST request for the homepage");
  let pokedex = [];
  request("https://pokeapi.co/api/v2/pokemon/"+req.params.id, function(err, response, json){
    let pokemon = JSON.parse(json);
    pokedex.push({
      "id": pokemon.id,
      "name": pokemon.name,
      "type": pokemon.types[0].type.name
    });
    res.send(pokedex);
  });
})

app.delete('/pokemon/:id', function (req, res) {
   console.log("Got a DELETE request for /del_user");
   res.send('Hello DELETE');
})

// PARTIE USER

app.get('/users', function (req, res) {
   console.log("Got a GET request for /users");
   res.send('Liste des utilisateurs');
})

app.get('/users/:id', function (req, res) {
   console.log("Got a POST request for the homepage");
   res.send('Affiche l utilisateur n°' + req.params.id);
})

app.listen(3000, () => console.log('App is live on port 3000!'))
