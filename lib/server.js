var express = require('express');
var app = express();
var server = app.listen(7027);
var handlebars = require("express3-handlebars");

console.log('listening on port 7027');
if (app.get('env') === 'development') {
  app.use(express.logger('dev'));
}
app.use(require('./middleware/error')(server));
app.use(express.compress());
app.use(express.favicon("favicon.ico")); 
app.use(require('./middleware/cors'));

app.use(express.static('public'));
app.engine('hbs', handlebars({defaultLayout: 'main',extname: '.hbs'}));
app.set('view engine', 'hbs');
app.set('views','views');
app.use(require("./routes/tile"));
app.use(require("./routes/map"));
app.use(require("./routes/misc"));