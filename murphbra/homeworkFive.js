var express = require('express');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 5461);
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/',function(req,res){
  var queryInput = [];
  for (var x in req.query){
    queryInput.push({'name':x, 'value':req.query[x]})
  }
  var input = {};
  input.dataList = queryInput;
  res.render('get-page', input);
});

app.post('/', function(req,res){
  var queryInput = [];
  for (var x in req.query){
    queryInput.push({'name':x, 'value':req.query[x]})
  }
  var input = {};
  input.dataList = queryInput;

  var bodyInput = [];
  for (var b in req.body){
    bodyInput.push({'name':b,'value':req.body[b]})
  }
  input.dataList2 = bodyInput;
  res.render("post-page", input)
})

app.use(function(req,res){
  res.status(404);
  res.render('404');
});
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});
app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});