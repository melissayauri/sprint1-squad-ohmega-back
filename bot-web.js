var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var dotenv = require('dotenv').config({silent: true});

app.use( express.static( './public' ) );
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
//CONVERSATION CALL

var Conversation = require('watson-developer-cloud/assistant/v1');
var conversation = new Conversation({
  version: process.env.CONVERSATION_VERSION,
  iam_apikey: process.env.CONVERSATION_APIKEY,
  url: process.env.CONVERSATION_URL
});


var jsonParser = bodyParser.json();

var Promise = require('bluebird');
var services = require('./services');
var utils = require('./utils');
Promise.promisifyAll(services);

var errorMsg = 'Disculpa pero por motivos técnicos no he podido responder tu consulta. Por favor intenta nuevamente.';

var processWatsonResponse = function (conversation, payload, res, req) {
    services.beforeConversation(payload, function(status, newPayload) {
        conversation.message(newPayload, function(err, data) {       
            if (err) {
              console.log("Error en Watson: ",err);
              var payload = {
                workspace_id: process.env.WORKSPACE_ID,
                output: { text: errorMsg }
              };
              return res.json(payload);
            }
            services.afterConversation(req.body.input, data, function(status, payload) {
              console.log("payload: ",JSON.stringify(payload));
              if (payload.output.action === 'ACTION_show_carrousel') {
                    payload.output.carrousel = utils.parseGenericToHTML(payload.output.text, payload.output.elements);
                    return res.json(payload);
                  }else{
                return res.json(payload);
              }
            });
        });
    });
}

app.post('/api/message', jsonParser, function (req, res) {



    utils.verifyCredentialsWeb(req, res, process.env.WORKSPACE_ID);
    var payload = {
        workspace_id: process.env.WORKSPACE_ID,
        context: req.body.context || {},
        input: req.body.input || {}
    };

    return processWatsonResponse(conversation, payload, res, req);
    console.log("Connection Closed");
});

module.exports = app;
