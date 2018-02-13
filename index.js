const express = require('express')
const app = express()

app.get('/', (req, res) =>
  res.send("Bienvenue sur notre Pokenode")
)

// This responds a POST request for the homepage
app.post('/', function (req, res) {
   console.log("Got a POST request for the homepage");
   res.send('Hello POST');
})

// This responds a DELETE request for the /del_user page.
app.delete('/del_user', function (req, res) {
   console.log("Got a DELETE request for /del_user");
   res.send('Hello DELETE');
})

// This responds a GET request for the /users page.
app.get('/users', function (req, res) {
   console.log("Got a GET request for /users");
   res.send('Page Listing');
})
app.listen(3000, () => console.log('App is live on port 3000!'))
