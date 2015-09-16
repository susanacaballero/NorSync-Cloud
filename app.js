/**
 * Created by Susana Caballero on 9/10/2015.
 */
var express = require('express');
var bodyParser = require('body-parser');
var logging = require('./logging/logging');
//var multer = require('multer');

//creo la aplicacion
var app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//app.use(multer()); // for parsing multipart/form-data

//configuro el puerto
app.set('port', process.env.PORT || 3000);

//Creo e inicio el servidor
var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.port);
});

// this middleware will be executed for every request to the app
app.use(function (req, res, next) {
    console.log(req);
    logging.log (req, function(res){console.log('Se logueó: '+res)});
    next();
});

app.get('/',function(req, res){
    res.send('Hola Mundo!!!')
});

app.get('/users/:userName',function(req, res){
    var name = req.params.userName;
    res.send('Hola '+name+'!!!')
});

app.post('/users',function (req, res){
   var name=req.params.userName;
    res.send('Hola '+name+'!!!')
});

