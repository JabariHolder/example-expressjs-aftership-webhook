"use strict";

var JsonDB = require('node-json-db');
var express = require('express');
var bodyParser = require('body-parser');
var querystring = require('querystring');
var request = require('request');
var http = require('http');
var fs = require("fs");
var ip = require("ip");
var app = express();
var port = 3000;
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

/**
 * WebHooks Class
 */
class WebHook {

	constructor(security) {
		
		this.db = new JsonDB("WebHook", true, false);
		this.enabled = 0;
		this.security = security;
		this.server = http.createServer(app);
		this.server.listen(port);
		console.log('Server started on port %s', this.server.address().port);
	}
	
	status() {
		
		var data = this.db.getData("/");
		
		if(!Object.keys(data).length) {
			console.log("DB NO DATA");
			this.db.push("/status",0);
			this.enabled = 0;
			return this.enbaled;
		}
		
		this.enbaled = parseInt(data["status"]);
		return this.enbaled;
	}

	post(callback) {
		
		var webHook = this;
		var security = this.security;
		
		app.post('/api/camera', function(req, res) {
			
		    var body = req.body;
			var headers = req.headers;

			security.validation(headers);
			
			if(!webHook.status()) {
				 res.json({error: "Nope."});
				 return false;
			}
			
			if(typeof callback === "function") callback(req, res, headers, body);

		});

	}
	
	get(callback) {
		
		var security = this.security;
		var webHook = this;
		
		app.get('/api/camera', function(req, res) {
			
			var result = null;
		    var body = req.body;
			var headers = req.headers;

			security.validation(headers);	
			if(!req.query["status"]) process.exit();
			
			webHook.db.push("/status", parseInt(req.query["status"]));
			
		    if(typeof callback === "function") {
			    callback(result);
			} else {
				res.json({
				    success : "JSON Saved."
				});
			}
			
		});
		
	}
	
	ajax(url, data, res) {

		request.post(url, data, function (error, response, body) {
		        if (!error && response.statusCode == 200) {
					res.json({
					    message: body
					});
		        } else {
		        	console.log(error);
		        }
		});
		
	}
	
	ifttt(res) {
		
		var url = "https://maker.ifttt.com/trigger/camera_motion/with/key/-cecf3czRQYpDH5u75Em3";
		var data = querystring.stringify({
			"value1":"1",
			"value2":"2",
			"value3":"3"
		});
		
		this.ajax(url, data, res);
		
	}

}

module.exports = WebHook;