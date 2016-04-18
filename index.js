var express = require('express');
var app = express();
var path = require('path');
var config = require('./config')


var postsRoute = require("./routes/posts.js");
app.use("/", postsRoute)


///2016/03/22/orquestra-de-camara-da-ulbra-abre-temporada-2016/
/*app.get(/\/[0-9]{4}(\/[0-9]{2}){2}\/(.*)/gi, function (req, res) {
 res.send('Hello World!');
 });*/

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function (err, req, res, next) {
		res.status(err.status || 500).send({
			message: err.message,
			error: err
		});
	});
}

// production enviroment error
app.use(function (err, req, res, next) {
	res.status(err.status || 500).render('error',{
		message: err.message,
		error: err
	});
});

var port = process.env.PORT || config.port || 3000;
app.listen(port, function () {
	console.log('Example app listening on port ' + port + '!');
})