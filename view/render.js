module.exports.renderHtml = function(pokemons){
  let html ="<style>.plante{background-color:#9bcc50;}";

  //html +="@import url('https://fonts.googleapis.com/css?family=Acme');";
  //html +="body{font-family: 'Acme', sans-serif;";
  //html +="body{background:url('http://www.gamesreviews.com/wp-content/uploads/2016/07/PokemonGo.jpg') no-repeat center center fixed;background-size: cover;color:white;}";
  html +="a:link{color:#12375e;text-decoration: none;}";
  html +="a:hover{color:#0c243e;text-decoration: underline;}";
  html +="a:active{color:#1e5692;}";
  html +="td{font-size:x-large;}";
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
  html +="<table width=100%>";
  html +="<th>N°</th><th>Nom</th><th>Type</th><th>Type2</th>";
  html +="<th>Icone</th><th colspan=6>Evolutions</th>";
  for(let poke of pokemons){
    html +="<tr class="+poke.type+"><td>"+poke.id+"</td>";
    html +="<td align=center><a href=/pokemons/"+poke.id+">";
    html +="<b>"+poke.name+"</a></td>";
    html +="<td align=center class="+poke.type+">"+poke.type+"</td>";
    html +="<td align=center class="+poke.type2+">"+poke.type2+"</td>";
    html +="<td align=center><a href="+poke.image+">";
    html +="<img src="+poke.thumbnails+" width=100%></a></td>";
    html +"<td>";
    for(evol of poke.evolution){
      html +="<td align=center>"+evol.evolutionName+"</td>";
      html +="<td align=center> "+evol.evolutionLvl+"</td>";
    }
    html += "</td>"
    html +="</tr>"
  }html +="</table>";
  return html;
}
