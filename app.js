var dotenv = require('dotenv').config({silent: true});

var middleware = require('botkit-middleware-watson')({
    username: process.env.CONVERSATION_USERNAME,
    password: process.env.CONVERSATION_PASSWORD,
    workspace_id: process.env.WORKSPACE_ID,
    version_date: '2016-09-20'
});
var services = require('./services');

module.exports = function(app) {
    if (process.env.USE_FACEBOOK) {
    	/*
        var Facebook = require('./bot-facebook')(middleware);
        Facebook.controller.middleware.receive.use(middleware.receive);
        Facebook.controller.createWebhookEndpoints(app, Facebook.bot);
        console.log('Facebook bot is live');
       */
    }
    //middleware.before = services.beforeConversation;
    middleware.after = services.afterConversation;
};
