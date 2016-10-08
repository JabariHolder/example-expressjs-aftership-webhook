"use strict";

/* Setup */
var Security = require('./classes/Security');
var WebHook = require('./classes/WebHook');
var MessengerBot = require('./classes/MessengerBot');

/* Secure Endpoint */
var security = new Security();
security.setup();

/* Start App */
var hook = new WebHook(security);
hook.post(function(req, res, headers, body) {
	hook.ifttt(res);
});

hook.get();
