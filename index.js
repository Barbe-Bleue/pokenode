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
   let pokemon;
   request("https://pokeapi.co/api/v2/pokemon/?limit=151", function(err, response, json){
     pokedex = JSON.parse(json).results;
     for(let i in pokedex){
       pokemon += pokedex[i].name+"<br>";
     }console.log(pokemon);
     res.send('Liste de tous les pokémons \n'+pokemon);
   });
})

app.get('/pokemons/:id', function (req, res) {
   console.log("Got a POST request for the homepage");
   res.send('Affiche le pokémon n°' + req.params.id);
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
