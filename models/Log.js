const Promise = require('promise');
const moment = require('moment');

module.exports = class Log {

	constructor(db){
		this.db = db;
		this.bot_id = "";
		this.user_id = "";
		this.conversation_id="";
		this.user_text = "";
		this.watson_response = "";
		this.intent = "";
		this.confidence = "";
		this.created_at = moment().format('YYYY-MM-DD HH:mm:ss');
	}

	save(){
		var slf = this;
		if (slf.conversation_id && slf.watson_response && slf.intent && slf.confidence && slf.created_at) {
			slf.db.insert('canvia_bot.logs',{
				'conversation_id': slf.conversation_id,
				'user_text': slf.user_text,
				'watson_response': slf.watson_response,
				'intent': slf.intent,
				'confidence': slf.confidence,
				'created_at': slf.created_at,
			});
		}
	}
}
