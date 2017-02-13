var express = require('express');
var router = express.Router();
var brand = 'Bootstrap for Jade';
var users = {
  
'byvoid':{name:'Carbo',
      website:'http://www.byvoid.com'
}

};
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
  res.send('reg get');
  console.log('reg get');
});
router.post('/reg', function(req, res){
  res.send('reg post');
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



