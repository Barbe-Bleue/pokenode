
const express = require('express');
const app = express();
const cheerio = require ('cheerio');
const path = require('path');
const bodyParser =  require('body-parser');
const pokequery = require('./query/pokequery.js')
const userquery = require('./query/userquery.js')
const render = require('./view/render.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res){
  res.sendFile(path.join(__dirname+'/view/index.html'));
});

app.get('/pokemons', async function  (req, res) {
  console.log("Got a GET request for /pokemons");
  pokequery.findAllPoke(res)
});

app.get('/pokemons/:id', async function (req, res) {
  console.log("Got a GET request for /pokemons/"+req.params.id);
  pokequery.findPokeById(req.params.id, res);
});

app.delete('/pokemons/:id', async function (req, res) {
   console.log("Got a DELETE request for /pokemons/"+req.params.id);
  pokequery.deletePokeById(req.params.id, res);
})

app.post('/pokemons', async function (req, res) {
  console.log("Got a POST request for /pokemons")
  pokequery.addPoke(req.body, res);
});

app.patch('/pokemons/:id', async function (req, res) {
  console.log("Got a PATCH request for /pokemons/"+req.params.id);
  pokequery.patchPokeById(req.params.id,req.body, res);
});

// Vue en tableau
app.get('/view/pokemons', async function (req, res) {
  console.log("Got a GET request for /view/pokemons/");
  const pokemons = await pokequery.findAllPoke(res);
  render.renderHtml(pokemons,res);
});

// PARTIE USER
app.get('/users', async function (req, res) {
  console.log("Got a GET request for /users");
  userquery.findAllUser(res)
});

app.get('/users/:id', async function (req, res) {
  console.log("Got a POST request for the /user/"+req.params.id);
  userquery.findUserById(req.params.id,res);
});

app.post('/users', async function (req, res) {
  console.log("Got a POST request for /users");
  userquery.addUser(req.body,res);
});

app.post('/login', async function (req, res) {
  console.log("Got a POST request for /login");
  userquery.login(req.body,res);
});

app.listen(3000, () => console.log('App is live on port 3000!'))
