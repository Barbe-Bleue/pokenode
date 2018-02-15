const mongoose = require("mongoose");
const express = require('express');
const app = express();
const fetch = require ('node-fetch');
const cheerio = require ('cheerio');
const request = require ('request');
const path = require('path');

mongoose.connect("mongodb://localhost/pokedex");

const pokemonSchema = mongoose.Schema({
  id: Number,
  name: String,
  thumbnails: String,
  image: String,
  type: String,
  type2: String,
  evolution: Array
});

const Client = mongoose.model("pokemon", pokemonSchema);

app.get('/', function (req, res){
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/pokemons', function (req, res) {
  Client.find() // TOUS LES Clients
    .where("id")
    .gt(0)
    .exec((err, clients) => res.send(clients));
});

app.get('/pokemons/:id', function (req, res) {
  console.log(req.params.id);
  Client.find() // TOUS LES Clients
    .where("id")
    .eq(req.params.id)
    .exec((err, clients) => res.send(clients));
})
app.get('/liste', function (req, res) {
  Client.find()
    .where("id")
    .gt(0)
    .exec((err, clients) => {
    let html ="<ul>";
    for(let pokemon of clients){
      html +="<li><a href=pokemons/"+pokemon.id+">"+pokemon.name+"</a>";
    }html +="<ul>";
    res.send(html);
  });
});
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
