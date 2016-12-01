var express = require('express');
var app = express();

//import static stuff
app.use(express.static('../build'));

// Starts the server on port 3000!
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
