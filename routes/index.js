var express = require('express');
var router = express.Router();

User = require("../models/user.js");

var sess;

router.get('/',function(req, res){
    res.render('index.html');
});

router.post("/register",function(req,res){
  User.findByEmail(req.body.user_email, function(err, user){
    if (!(user === null)) {
      res.json({"error" : true, "message" : "This email is already present"});
    } else {
      User.register({username:req.body.user_name, password:req.body.user_password, email:req.body.user_email}, function(err, user){
        if(user === null) {
          res.json({"error" : true , "message" : "Error while adding user."});
        } else {
          res.json({"error" : false, "message" : "Registered successfully."});
        }
      });
    }
  });
});


router.post('/login',function(req,res){
  sess=req.session;
//In this we are assigning email to sess.email variable.
//email comes from HTML page.
  sess.email=req.body.email;
  //res.end('done')
  User.login(req.body.user_email, req.body.user_password, function(err, user) {
      if (err) {
          res.json({"error": "true", "message": "Database error occured"});
      } else {
          if (!user) {
              res.json({
                  "error": "true",
                  "message": "Login failed ! Please register"
              });
          } else {
              sess.username = user.data.username;
              res.json({"error": false, "message": "Login success."});
          }
      }
  });
});

router.get('/logout',function(req,res){

  req.session.destroy(function(err){
    if(err){
      console.log(err);
    }
    else
    {
      res.redirect('/');
    }
  });

});

router.get('/home',function(req,res){
    if(req.session.username) {
        res.render("home.html",{ email : req.session.username});
    } else {
        res.redirect("/");
    }
});


module.exports = router;
