var express = require('express');
var router = express.Router();
var config = require('../config');
var util = require('../lib/util')

var treet = require('treet');

var WP = require('wordpress-rest-api');
var wp = new WP({endpoint: config.apiEndpoint});

/* GET posts listing. */
router.get('/', function (req, res, next) {
	res.send('respond with a resource');
});

router.get('/teste', function (req, res, next) {
	res.send('respoawd aw dnd with a resource');
});

router.get('/:year([0-9]{4})/:month([0-9]{2})/:day([0-9]{2})/:title(*)', function (req, res, next) {
	var requestParameters = {
		year: req.params.year,
		month: req.params.month,
		day: req.params.day,
		name: req.params.title
	};
	wp.posts()
		.filter(requestParameters).then(util.parsePosts).then(function (data) {
			// if there is no post with requested parameters, return a 404
			if (data.length === 0) {
				next({
					status: 404,
					message: "Not Found",
					requestParameters: requestParameters
				});
				return;
			} else if (data.length === 1) {
				res.render('post/single', {
					post: data[0],
					title: util.buildTitle(data[0].title.rendered)
				});
			} else
				res.render('post/list', {posts: data});
		}).catch(function (err) {
			// handle error
			console.log(err);
		});

	//console.log(req.params);
	//res.send('This is a post');
});

module.exports = router;
