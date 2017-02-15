var express = require('express');
var router = express.Router();
var brand = 'Bootstrap for Jade';
var users = {

'byvoid':{name:'Carbo',
      website:'http://www.byvoid.com'
}

};
/* testMongo */
router.get('/userlist', function(req, res){
  var db = req.db;
  var collection = db.get('usercollection');
  collection.find({},{},function(e,docs){
    res.render('userlist', {
      "userlist" : docs
    });
  });
});
router.get('/newuser', function(req, res){
  res.render('newuser',{title:'Add New User'});
});
router.post('/adduser', function(req, res){
  var db = req.db;
  var userName = req.body.username;
  var userEmail = req.body.useremail;
  var collection = db.get('usercollection');
  collection.insert({
    "username":userName,
    "email":userEmail
  },function(err, doc){
    if(err){
      res.send("there was a problem adding the information to the database. ");
    }
    else{
      res.location("userlist");
      res.redirect("userlist");
    }
  });
});
/* microblog */
router.get('/u/:user', function(req, res){
  res.send('user');
  console.log('user');
});
router.post('/post', function(req, res){
  res.send('post');
  console.log('post');
});
router.get('/reg', function(req, res){
  //res.send('reg get');
  res.render('reg',{
    title:'user register',
  });
  console.log('reg get');
});
router.post('/reg', function(req, res){
  //res.send('reg post');
  //check repaet password
  if(req.body['password-repeat']!= req.body['password']){
    req.flash('error','different password');
    return res.redirect('/reg');
  }else{
    res.send('reg post');
  }

  var newUser = new User({
    name: req.body.username,
    password: password,
  });

  User.get(newUser.name, function(err, user){
    if(user)
      err = 'Username already exists.';
    if(err){
      req.flash('error', err);
      return res.redirect('/reg');
    }

    newUser.save(function(err){
      if(err){
        req.flash('error', err);
        return res.redirect('req');
      }
      req.session.user = newUser;
      req.flash('success', 'register success');
      res.redirect('/');
    });
  });
  console.log('reg post');
});
router.get('/login', function(req, res){
  res.send('login get');
  console.log('reg get');
});
router.post('/login', function(req, res){
  res.send('login post');
  console.log('reg post');
});
router.get('/logout', function(req, res){
  res.send('logout');
  console.log('logout get');
});
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});
router.get('/home', function(req, res){
  res.render('home', { title: 'Home', id: 'home', brand: brand })
});
router.get('/about', function(req, res){
  res.render('about', { title: 'About', id: 'about', brand: brand})
});
router.get('/list', function(req, res){
  res.render('list',{title: 'List',
                     items:[2014,'Hello','World','Node.js']
  });
});
router.get('/hello', function(req,res){
  res.send('Hello Taiwan');
});
router.all('/user/:username',function(req, res, next){
  if (users[req.params.username]){
    next();
  }else{
    next(new Error(req.params.username + ' does not exist.'));
  }
});
router.get('/user/:username', function(req, res){
  res.send(JSON.stringify(users[req.params.username]));
});
router.put('/user/:username', function(req, res){
  res.send('Done');
});

module.exports = router;
