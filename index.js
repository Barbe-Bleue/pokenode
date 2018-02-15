
const express = require('express');
const app = express();
const fetch = require ('node-fetch');
const cheerio = require ('cheerio');
const request = require ('request');
const path = require('path');
const bodyParser =  require('body-parser');
const functionsjs = require('./functions.js');
const pokequery = require('./pokequery.js')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res){
  res.sendFile(path.join(__dirname+'/view/index.html'));
});

app.get('/pokemons', function (req, res) {
  console.log("Got a GET request for /pokemons");
  Client.find() // TOUS LES Clients
    .where("id")
    .gt(0)
    .sort("id") // triés par id croissants
    .exec((err, clients) => res.send(clients));
});

app.get('/pokemons/:id', function (req, res) {
  console.log("Got a GET request for /pokemons/"+req.params.id);
  Client.find() // TOUS LES Clients
    .where("id")
    .eq(req.params.id)
    .exec((err, clients) => res.send(clients));
});

app.get('/view/pokemons', function (req, res) {
  console.log("Got a GET request for /view/pokemons/");
  Client.find()
    .where("id")
    .gt(0)
    .exec((err, clients) => {
    let html ="<ul>";
    for(let pokemon of clients){
      html +="<li><a href=/pokemons/"+pokemon.id+">"+pokemon.name+"</a>";
    }html +="<ul>";
    res.send(html);
  });
});

app.delete('/pokemons/:id', function (req, res) {
   console.log("Got a DELETE request for /pokemons/"+req.params.id);
   Client.remove()
    .where("id")
    .eq(req.params.id)
    .exec((err,clients) =>res.send("pokémon n° "+req.params.id+" a été supprimé !"))
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
