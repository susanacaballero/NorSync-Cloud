/**
 * Created by Susana Caballero on 9/10/2015.
 */
var express = require('express');
var redis =	require('redis');
var session = require('express-session');
var redisStore      =	  require('connect-redis')(session);
var bodyParser      =	  require('body-parser');
var cookieParser    =	  require('cookie-parser');
var logging = require('./logging/logging');
var client     =   redis.createClient();
//Routes
var index = require ("./routes/index");
var users = require ("./routes/users");

//creo la aplicacion
var app = express();

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

app.use(session({secret: 'ssshhhhh',
    store: new redisStore({ host: 'localhost', port: 6379, client: client,ttl :  260}),
    resave: false,
    saveUninitialized: true}));

// es necesario parsear la cookie porque la utiliza como key en Redis
app.use(cookieParser());

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//configuro el puerto
app.set('port', process.env.PORT || 3000);

//Creo e inicio el servidor
var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.port);
});

// this middleware will be executed for every request to the app
app.use(function (req, res, next) {
    logging.log (req, function(res){console.log('Se logueó: '+res)});
    next();
});

app.use("/",index);
app.use("/users/",users);


