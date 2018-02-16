
const express = require('express');
const app = express();
const cheerio = require ('cheerio');
const path = require('path');
const bodyParser =  require('body-parser');
const pokequery = require('./pokequery.js')
const userquery = require('./userquery.js')

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

app.delete('/pokemons/:id', async function (req, res) {
   console.log("Got a DELETE request for /pokemons/"+req.params.id);
   const result = await pokequery.deletePokeById(req.params.id);
   res.send(result);
})

app.post('/pokemons', async function (req, res) {
  console.log("Got a POST request for /pokemons")
  const result = await pokequery.addPoke(req.body);
  res.send(result);
});

app.patch('/pokemons/:id', async function (req, res) {
  console.log("Got a PATCH request for /pokemons/"+req.params.id);
  const result = await pokequery.patchPokeById(req.params.id,req.body);
  res.send(result);
});

// Vue en tableau
app.get('/view/pokemons', async function (req, res) {
  console.log("Got a GET request for /view/pokemons/");
  const pokemons = await pokequery.findAllPoke();
  let html ="<ul>";

  for(let poke of pokemons){
    html +="<li><a href=/pokemons/"+poke.id+">"+poke.name+"</a>";
  }html +="<ul>";

  res.send(html);
});

// PARTIE USER

app.get('/users', async function (req, res) {
   console.log("Got a GET request for /users");
   const users = await userquery.findAllUser()
   res.send(users);
});

app.get('/users/:id', async function (req, res) {
   console.log("Got a POST request for the /user/"+req.params.id);
   const user = await userquery.findUserById(req.params.id);
   res.send(user);
})

app.post('/users', async function (req, res) {
   console.log("Got a POST request for /users");
   const result = await userquery.addUser(req.body);
   res.send(result);
})

app.listen(3000, () => console.log('App is live on port 3000!'))
