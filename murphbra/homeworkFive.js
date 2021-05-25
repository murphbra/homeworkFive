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
  var qParams = [];
  for (var x in req.query){
    qParams.push({'name':x, 'value':req.query[x]})
  }
  var context = {};
  context.dataList = qParams;
  res.render('get-page', context);
});

app.post('/', function(req,res){
  var qParams = [];
  for (var x in req.query){
    qParams.push({'name':x, 'value':req.query[x]})
  }
  var context = {};
  context.dataList = qParams;

  //var bParams = [];
  //for (var b in req.body){
    //bParams.push({'name':b,'value':req.body[b]})
  //}
  //context.dataList2 = bParams;

  res.render("post-page", context)
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