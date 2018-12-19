const express = require('express');
const bodyParser = require('body-parser');
const csvdata = require('csvdata');
const fs = require('fs');

const dataFolder = "./data/";

const app = express();
const port =  5000;


// Configure server
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// OVERVIEW GET API : 
// Used to load overview data for a specified year
app.get('/api/overview/*', (req, res) => {
	const year = req.params[0];
	if(year){
		const file = dataFolder + year + "/" + year + "-totals.csv";
		if(fs.existsSync(file)){
			csvdata.load(file, {objName: 'period'}).then(
				function(result) {
					let data = {};
					Object.keys(result).map(function(period,_){
						Object.keys(result[period]).map(function(tag,_){
							if(tag != "period"){
								data[period+"."+tag] = result[period][tag];
							}
						});
					});
					res.status(200);
					res.json(data);
				},
				function(err){
					console.log(err)
					res.status(500);
					res.json({"error":err});
				}
			);
		}else{
			res.status(204).end();
		}
	}else{
		res.status(400);
		res.json({error:"Year not provided in request"});		
	}
});

// OVERVIEW POST API : 
// Used to save overview data for a specified year
app.post('/api/overview/*', (req, res) => {
	const year = req.params[0];
	if(year){
		const data = req.body.data;
		if(data){

			let headers = ["period"];
			let body = {};
			
			Object.keys(data).map(function(key,i){
				let [period, tag] = key.split(".");
				if(!body[period.toString()]) body[period.toString()] = { period:period };
				body[period.toString()][tag] = data[key];
				if(headers.indexOf(tag) == -1) headers.push(tag);
			});

			Object.keys(body).map(function(period,i){
				headers.map(function(header,_){
					if(!body[period][header]) body[period][header] = 0;
				});				
			});			

			let header_string = "";
			headers.map(function(header,_){
				if(header_string != "") header_string += ",";
				header_string += header;
			});			

			const directory = dataFolder + year + "/";
			const file = directory + year + "-totals.csv";
			
			if(!fs.existsSync(directory)) fs.mkdirSync(directory);
			if(!fs.existsSync(file)) fs.closeSync(fs.openSync(file, 'w'));

			csvdata.write(file, body, {header:header_string}).then(
				function(result) {
					res.status(204).end();
				},
				function(err){
					console.log(err)
					res.status(500);
					res.json({"error":err});
				}
			);

		}else{
			res.status(400);
			res.json({error:"Data not provided in request"});	
		}
	}else{
		res.status(400);
		res.json({error:"Year not provided in request"});		
	}
});

// TRANSACTION GET API : 
// Used to load transaction data for a specified period
app.get('/api/transactions/*', (req, res) => {
	const period = req.params[0];
	if(period){
		const year = period.substring(0,4);
		if(year){
			const file = dataFolder + year + "/" + period + "-transactions.csv";
			if(fs.existsSync(file)){
				csvdata.load(file, {objName: 'id'}).then(
					function(result) {
						res.status(200);
						res.json(result);
					},
					function(err){
						console.log(err)
						res.status(500);
						res.json({"error":err});
					}
				);
			}else{
				res.status(204).end();
			}
		}else{
			res.status(400);
			res.json({error:"Invalid period provided"});		
		}
	}else{
		res.status(400);
		res.json({error:"Period not provided in request"});		
	}
});

// TRANSACTIONS POST API : 
// Used to save transaction data for a specified period
app.post('/api/transactions/*', (req, res) => {
	const period = req.params[0];
	if(period){
		const year = period.substring(0,4);
		if(year){
			const data = req.body.data;
			if(data){

				let headers = ["period"];
				let body = data;

				let header_string = "id,category,subcategory,amount,date,provider,group,details";

				const directory = dataFolder + year + "/";
				const file = directory + period + "-transactions.csv";
				
				if(!fs.existsSync(directory)) fs.mkdirSync(directory);
				if(fs.existsSync(file)) fs.closeSync(fs.openSync(file, 'w'));

				csvdata.write(file, body, {header:header_string}).then(
					function(result) {
						res.status(204).end();
					},
					function(err){
						console.log(err)
						res.status(500);
						res.json({"error":err});
					}
				);

			}else{
				res.status(400);
				res.json({error:"Data not provided in request"});	
			}
		}else{
			res.status(400);
			res.json({error:"Invalid period provided"});		
		}
	}else{
		res.status(400);
		res.json({error:"Period not provided in request"});		
	}
});


// Start server
app.listen(port, () => console.log(`Server started on port ${port}`));