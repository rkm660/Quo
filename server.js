var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('quotes',['quotes']);
var bodyParser = require('body-parser');
var request = require("request");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/quotes', function(req,res){
	console.log("got get request");

	db.quotes.find(function(err,docs){
		console.log(docs);
		res.json(docs);

	});

});

app.get('/quotes/:q',function(req,res){

	var url = "http://pixabay.com/api/?username=rahulmatta2016&key=5e3ee08f59cdb50060a4&response_group=high_resolution&q=" + req.params.q;

	request({
		url: url,
		json: true
	}, function (error, response, body) {

		if (!error && response.statusCode === 200) {
			var imgArray = [];
			for (var i = 0; i < body['hits'].length; i++){
				var currentImage = body['hits'][i]['webformatURL'];
				console.log(currentImage);
				imgArray.push(currentImage);
			}
			res.json(imgArray);


		}
		else if(error){
			console.log(error);
		}
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