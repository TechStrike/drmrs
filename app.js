
/**
 * Module dependencies.
 */
//we require dependencies to create a server
//express for routing urls and creating pages
//http for creating our http server
//we also require our routs folder when handling our request 
var express = require('express')
  , routes = require('./routes')
  , http = require('http');

var app = express();

app.configure(function(){
//use port 3000 for our localhost
  app.set('port', process.env.PORT || 3000);
//create a template view from the templates in views after our route is handled in ./routes
  app.set('views', __dirname + '/views');
//set jade for templating
  app.set('view engine', 'jade');
//make jade/express output nice html files
  app.locals.pretty = true;
//call the standard express favicon
  app.use(express.favicon());
//and the express event logger
  app.use(express.logger('dev'));
//used for parsing our request body according ot content type
  app.use(express.bodyParser());
//used for simulating other http methods besides get and post including DELETE and PUT
  app.use(express.methodOverride());
//routes to the proper listener
  app.use(app.router);
//set up our static file location
  app.use(express.static(__dirname + '/public'));
});
//show our error stack trace during dev
app.configure('development', function(){
  app.use(express.errorHandler());
});
//handle our index route defined in routes index.js
//the file will render our index page taken from the index.jade view which is structured in our layout.jade
app.get('/', routes.index);
//create our server using express, listen on our deignated port console to make sure everythings running fine
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
