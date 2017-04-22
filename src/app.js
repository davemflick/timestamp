'use strict';

var express = require('express');

var app = express();

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');


app.get("/", (req, res)=>{
	res.render("body")
})

app.get("/:unix:date", (req, res)=>{
	//Months to convert to from number form
	var months = ["January", "February", "March", "April", "May", "June",
				"July", "August", "September", "October", "November", "December"];
	//Combine the two params for one full paramater
	req.params.unix += req.params.date;
	// req.params.date = req.params.unix;
	//Determine date input, if valid parse into day, month, year
	let dateInput = req.params.unix;
	let date = new Date(dateInput);
	
	if(date == "Invalid Date"){
		date = new Date(Number(dateInput) * 1000);
		if(date == "Invalid Date"){
			req.params.unix = null;
			req.params.date = null;
		} else {
			let year = date.getFullYear();
			let month = date.getMonth();
			let day = date.getDate();
			req.params.unix = Number(dateInput);
			req.params.date = `${months[month]} ${day}, ${year}`;
		}
	} else {
		let year = date.getFullYear();
		let month = date.getMonth();
		let day = date.getDate();
		req.params.unix = date.getTime()/1000;
		req.params.date = `${months[month]} ${day}, ${year}`;
	}
	res.send(req.params)
})

app.listen(process.env.PORT || 3000, ()=> {
	console.log("The frontend server is running on port 3000");
});

