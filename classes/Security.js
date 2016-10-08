"use strict";

var ip = require("ip");

/**
 * Security Class
 */
class Security {

	construct() {

	}

	setup() {
		this.env = this.getEnv();
	}

	getEnv() {

		var ip_address = ip.address();
		var env = "";
		console.log(ip_address);
		if(ip_address == "10.0.0.6") {
			env = "local";
		} else if(ip_address == "72.10.51.150") {
			env = "prod";
		} else {
			process.exit();
		}

		this.env = env;
		return env;

	}

	validation(headers) {

		var valid = this;
		this.headers = headers;

		var types = {

			prod : function() {

				var headers = valid.headers;

				if(	headers["host"] !== "undefined" && 
					headers["host"] == 'secure.integralwebdesign.co.uk:3000' &&
					headers["content-length"] !== "undefined"
					//headers["user-agent"].indexOf("Python-urllib/2.7") > -1
				) return true;

			},

			local : function() {

				var headers = valid.headers;

				if(	headers["host"] !== "undefined" && 
					headers["host"] == '127.0.0.1:3000' &&
					headers["content-length"] !== "undefined" &&
					headers["user-agent"].indexOf("Mozilla/5.0") > -1
				) return true;

			}

		}

		var result = types[this.env]();
		if(!result) process.exit();

	}
	
}

module.exports = Security;