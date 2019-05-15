var app  = require('./bot-web');
require('dotenv').config({silent:true})
//require('./app')(app);

const port = process.env.PORT
app.get('/',function(req,res){
	res.send('error')
});
app.listen(port, function() {
  console.log('Client server listening on port: ',port);
});