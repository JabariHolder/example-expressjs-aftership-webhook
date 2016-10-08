"use strict";
const http = require('http')
const Bot = require('messenger-bot')


class MessengerBot {

	constructor() {

		this.bot = new Bot({
		  token: 'EAAPPln4zbxwBAOaRU9rjDPJGEtSMifFG2ZBHuqUCCYTEQevpwApL2Gwz4xfRRqCssspy1mX3eZCgEACj4YLAtCsrQcdz19DqWVNZB31dNUcgrmg6fDJRd1l0XD3j27oxP0adHIDPhNC2FZCeb8qqbMFsZC7Jxl1CgwMpVNjYZAjwZDZD',
		  app_secret: '933f02dd2fa455e9199c76594ec3ab85',
		  verify: 'VERIFY_TOKEN'
		})

	}

	listen() {

		this.bot.on('error', (err) => {
		  console.log(err.message)
		})

		this.bot.on('message', (payload, reply) => {
		  let text = payload.message.text

		  bot.getProfile(payload.sender.id, (err, profile) => {
		    if (err) throw err

		    reply({ text }, (err) => {
		      if (err) throw err

		      console.log(`Echoed back to ${profile.first_name} ${profile.last_name}: ${text}`)
		    })
		  })
		})

		http.createServer(this.bot.middleware()).listen(3000)
		console.log('Echo bot server running at port 3000.')


	}

	send(recipient, message, callback) {

		this.bot.sendMessage(recipient, message, callback);

	}

}

module.exports = MessengerBot;