var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('quotes',['quotes']);
var bodyParser = require('body-parser');
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/quotes', function(req,res){
console.log("got get request");

	db.quotes.find(function(err,docs){
		console.log(docs);
		res.json(docs);

	});

});

app.post('/quotes',function(req,res){
	console.log(req.body);
	db.quotes.insert(req.body,function(err,doc){
		res.json(doc);
	});
});


app.delete('/quotes/:id',function(req,res){

	var id = req.params.id;
	console.log(id);
	db.quotes.remove({_id:mongojs.ObjectId(id)},function(err,doc){
		res.json(doc);
	});
});

app.get('/quotes/:id',function(req,res){
	var id = req.params.id;
		console.log("in server get");

	console.log(id);
	db.quotes.findOne({_id:mongojs.ObjectId(id)},function(err,doc){
		console.log("in findone");
		res.json(doc);
	});
});

app.put('/quotes/:id',function(req,res){
	console.log("in server update");
	var id = req.params.id;
	console.log(req.body.quote);
	db.quotes.findAndModify({query:{_id: mongojs.ObjectId(id)},
							update: {$set: {quote: req.body.quote}}, new: true},function(err,docs){
						res.json(docs);
			});
});


app.listen(3000);
console.log("Connected...");