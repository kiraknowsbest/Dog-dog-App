const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fallback = require('express-history-api-fallback')
const fileUpload = require('express-fileupload')
const dbModels = require('../database/Schema')
const bcrypt = require('bcryptjs');



const app = express();
const port = process.env.PORT || 3000;

const root = __dirname + '/../client/dist'


app.use(express.static(root));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(fileUpload())
app.use('/img', express.static(__dirname + '/img'))

app.post('/api/submitPost', function(req,res) {
	var post = new dbModels.DogPost (req.body)
	post.save(function(err) {
		if (err) {
			console.log('err: ', err)
			res.status(404).send(err)
		} else {
			res.status(200).send(req.body)
		}
	})
	console.log("got post ", req.body)
})

app.post('/UploardImg', function(req,res) {
	let file = req.files.image;
	console.log('file: ', file)
	file.name = file.name.replace(' ', '_')
	file.mv(`${__dirname}/img/${file.name}`, function (err) {
		if (err) {
			console.log('error: ', err)
		}
		res.json({file: `img/${file.name}`})
	})
})

app.post('/api/comment/:postId', function(req,res) {
	var id = req.params.postId;
	console.log("req.body",req.body)
	dbModels.DogPost.update({'_id' : id }, { $push: { comments: req.body }}, function(err,data) {
				if (err) {
					res.status(404).send(err)
				} else {
					res.status(200).send(req.body)
				}
			});

})

app.post('/api/viewUp/:postId', function(req,res) {
	var id = req.params.postId;
	let query = {_id: id};
	dbModels.DogPost.findOneAndUpdate(query, { $inc: {view: 1} }, function(err,data) {
		if (err) {
			res.status(404).send(err)
		} else {
			res.status(200).send(data)
		}
	})
})

app.get('/api/posts', function (req, res) {
	dbModels.DogPost.find({}, function (err, data) {
		// console.log('data: ', data)
		res.setHeader('Content-Type', 'application/json');
		res.status(200).send(JSON.stringify(data))
	})
})

app.get('/api/users', function (req, res) {
	dbModels.User.find({}, function (err, data) {
		console.log('data: ', data)
		res.setHeader('Content-Type', 'application/json');
		res.status(200).send(JSON.stringify(data))
	})
})

app.post('/api/login', function (req, res) {
	console.log("got the login data", req.body)
	dbModels.User.findOne({userName: req.body.username}, function (err, data) {
		if (err) {
			res.status(404).send(err)
		} else {
			console.log(data)
			var password = data.userPassword
			var match = bcrypt.compareSync(req.body.password, password);
			console.log("match",match)
			if (match) {
				res.status(200).send(data.userName)
			} else {
				res.status(404).send('fail')
			}
		}
	})
})

app.post('/api/signup', function (req, res) {
	console.log("got the login data", req.body)
	var password = req.body.password
	var salt = bcrypt.genSaltSync(10);
	var hash = bcrypt.hashSync(password, salt);
	const sampleUser = {
		userName: req.body.username,
		userPassword: hash,
		userPhoto: req.body.userphoto,
		listForSale: [],
		listForBought: [],
	}
	var newUser = new dbModels.User(sampleUser)
	newUser.save(function(err) {
		if (err) {
			res.status(400).send(err)
		} else {
			res.status(200).send('ok')
		}
	})
	// dbModels.User.findOne({userName: req.body.username}, function (err, data) {
	// 	if (err) {
	// 		res.status(404).send(err)
	// 	} else {
	// 		console.log(data)
	// 		var password = data.userPassword
	// 		var salt = bcrypt.genSaltSync(10);
	// 		var hash = bcrypt.hashSync(password, salt);
	// 		var match = bcrypt.compareSync(req.body.password, hash);
	// 		console.log("hash",hash)
	// 		if (match) {
	// 			res.status(200).send("pass!!!!!")
	// 		} else {
	// 			res.status(404).send('fail')
	// 		}
	// 	}
	// })
})

app.use(fallback('index.html', { root }))

app.listen(port, function () {
	console.log(`listening on port ${port}`)
});












