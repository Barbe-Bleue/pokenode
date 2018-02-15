
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

app.get('/pokemons', async function  (req, res) {
  console.log("Got a GET request for /pokemons");
  const pokemons = await pokequery.findAllPoke()
  res.send(pokemons);
});

app.get('/pokemons/:id', async function (req, res) {
  console.log("Got a GET request for /pokemons/"+req.params.id);
  const pokemon = await pokequery.findPokeById(req.params.id);
  res.send(pokemon);
});

app.get('/view/pokemons', async function (req, res) {
  console.log("Got a GET request for /view/pokemons/");
  const pokemons = await pokequery.findAllPoke();
  let html ="<ul>";

  for(let poke of pokemons){
    html +="<li><a href=/pokemons/"+poke.id+">"+poke.name+"</a>";
  }html +="<ul>";

  res.send(html);
});

app.delete('/pokemons/:id', async function (req, res) {
   console.log("Got a DELETE request for /pokemons/"+req.params.id);
   const result = await pokequery.deletePokeById(req.params.id);
   if(result) res.send("pokémon n° "+req.params.id+" a été supprimé !");
})

app.post('/pokemons', async function (req, res){
  console.log("Got a POST request for /pokemons")
  const result = await pokequery.addPoke(req.body);
  if(result) res.send("le pokémon "+req.body.name+" a été ajouté !");
});


// PARTIE USER

app.get('/users', async function (req, res) {
   console.log("Got a GET request for /users");
   res.send('Liste des utilisateurs');
});

app.get('/users/:id', function (req, res) {
   console.log("Got a POST request for the homepage");
   res.send('Affiche l utilisateur n°' + req.params.id);
})

app.listen(3000, () => console.log('App is live on port 3000!'))
