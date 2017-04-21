'use strict';

var express = require('express');

var app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

app.get("/", (req, res)=>{
	res.render("body")
})

app.get("/:time?", (req, res)=>{
	var time = req.params.time;
	if(time === undefined){
		res.status(503);
		res.render('time', {Unix: null, Natural: null});
	}
	res.render("body")
})

app.listen(3000, ()=> {
	console.log("The frontend server is running on port 3000");
});