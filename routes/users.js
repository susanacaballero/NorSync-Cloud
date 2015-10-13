var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/*
 router.get('/users/:userName',function(req, res){
 var name = req.params.userName;
 res.send('Hola '+name+'!!!')
 });

 router.post('/users',function (req, res){
 var name=req.params.userName;
 res.send('Hola '+name+'!!!')
 });

 */

module.exports = router;
