
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
  let html ="<style>.plante{background-color:#9bcc50;}";
  //html +="@import url('https://fonts.googleapis.com/css?family=Acme');";
  //html +="body{font-family: 'Acme', sans-serif;";
  html +=".feu{background-color: #fd7d24;color:white}";
  html +=".eau{background-color: #4592c4;color:white}";
  html +=".insecte{background-color: #729f3f;color:white}";
  html +=".normal{background-color: #a4acaf;}";
  html +=".poison{background-color: #b97fc9; color:white;}";
  html +=".Électrik{background-color: #eed535;}";
  html +=".sol{background:linear-gradient(180deg, #f7de3f 50%, #ab9842 50%);}";
  html +=".combat{background-color: #d56723; color:white;}";
  html +=".vol{background:linear-gradient(180deg, #3dc7ef 50%, #bdb9b8 50%)}";
  html +=".psy{background-color: #f366b9; color:white;}"
  html +=".fée{background-color: #fdb9e9}";
  html +=".roche{background-color:#a38c21; color;white;}";
  html +=".spectre{background-color:#7b62a3;color:white;}";
  html +=".glace{background-color:51c4e7;}";
  html +=".dragon{background:linear-gradient(180deg, #53a4cf 50%, #f16e57 50%);color:white;}";
  html +=".acier{background-color:#9eb7b8;}"
  html +="</style>"
  html +="<table border=5>";
  html +="<th>N°</th><th>Nom</th><th>Type</th><th>Type2</th><th>Icone</th><th>Image</th><th colspan=6>Evolutions</th>"
  for(let poke of pokemons){
    html +="<tr><td>"+poke.id+"</td>";
    html +="<td><a href=/pokemons/"+poke.id+">"+poke.name+"</a></td>";
    html +="<td class="+poke.type+">"+poke.type+"</td>";
    html +="<td class="+poke.type2+">"+poke.type2+"</td>";
    html +="<td><img src="+poke.thumbnails+"></td>";
    html +="<td><a href="+poke.image+">Image</a></td>";
    html +"<td>";
    for(evol of poke.evolution){
      console.log(evol.evolutionName);
      html +="<td>"+evol.evolutionName+"</td><td> "+evol.evolutionLvl+"</td>";
    }
    html += "</td>"
    html +="</tr>"
  }html +="</table>";

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
