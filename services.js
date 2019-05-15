var request = require('request');
var utils = require('./utils');
const sql = require('./postgres.js');
const db = new sql();
var Log = require('./models/Log.js');

var checkDigit = function(num, callback) {
	var numStr = num + '';
	var digit = '678901123456'.substr(11-((numStr.substr(0,1)*3+numStr.substr(1,1)*2+numStr.substr(2,1)*7+numStr.substr(3,1)*6+numStr.substr(4,1)*5+numStr.substr(5,1)*4+numStr.substr(6,1)*3+numStr.substr(7,1)*2) % 11),1)
	return callback(parseInt(digit));
}
function toInt(n){ return Math.round(Number(n)); };

module.exports = {
    beforeConversation: function(payload, callback) {
    	
  		callback(null, payload);
    },
    afterConversation: function(message, conversationResponse, callback) {
    	var log = new Log(db);
			//log.bot_id = parseInt(process.env.BOT_ID);
		console.log(conversationResponse);
		try {
			if (true) {
				console.log("Log: Saving Log");
				//log.user_id = conversationResponse.context.user_id;
				log.conversation_id = conversationResponse.context.conversation_id;
				//log.categoria = conversationResponse.context.categoria;
				//log.subcategoria = conversationResponse.context.subcategoria;


				if (conversationResponse.input.text) {
					log.user_text = conversationResponse.input.text;
				} else {
					log.user_text = "None";
				}
				if (conversationResponse.output.text) {
					if (log.user_text == 'None'){
                		log.watson_response = 'Slider de Inicio';
                	} else {
                      if (Array.isArray(conversationResponse.output.text)) {
                          log.watson_response = conversationResponse.output.text.join(' ');
                      } else {
                          log.watson_response = conversationResponse.output.text;
                      }
                	}
         
				} else {
					log.watson_response = "None";
				}
				if (conversationResponse.intents[0]) {
					log.intent = conversationResponse.intents[0].intent;
					log.confidence = conversationResponse.intents[0].confidence;
				} else {
					log.intent = "None";
					log.confidence = '0.00';
				}
		    	log.save();
	    	}
	    	callback(null, conversationResponse);
		} catch(e) {
			console.log('Log: Error Saving Log');
			console.log(e);
    		callback(null, conversationResponse);
		}
    }
};
