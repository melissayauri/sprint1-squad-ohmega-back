W={}
W.config = {
	local:{
		src:'//localhost:4000'
	},
	dev: {
		src:'//ohmega-assistant-dev.mybluemix.net'
	},
	prd:{
		src:'//ohmega-assistant-prd.mybluemix.net'
	}
}
W.chat = document.getElementById('kiara-conversation');
W.chat.style ='display:none;'
if (!W.chat) {
	console.error('No existe elemento "kiara-conversation"');
}
W.env = W.chat.getAttribute('env')
W.user = W.chat.getAttribute('user')
W.open = false
W.toggleChat = function(){
	if (W.open) { //cerrar
		W.chat.style = ''
		W.chat.classList.remove('w-bounceInUp')
		W.chat.classList.add('w-bounceOutDown')
		setTimeout(function(){
			W.chat.style = 'display:none;'
		}, 1000)
	}else{ //abrir
		W.chat.style = ''
		W.chat.classList.remove('w-bounceOutDown')
		W.chat.classList.add('w-bounceInUp')
		setTimeout(function(){
			W.chat.style = 'display:inherit;'
		}, 1000)
	}
	W.open = !W.open
}
W.triggers = document.getElementsByClassName(W.chat.getAttribute('trigger'))
for (i = 0; i < W.triggers.length; i++) {
    W.triggers[i].addEventListener('click', function () {
    	W.toggleChat();
    })
}
W.chat.className = "w-animated cuerpochat"
W.chat.innerHTML='\
	<div class="cabecerachat">\
      <img src="https://ohmega-assistant-dev.mybluemix.net/img/logo.png" class="displaychat" />\
      <div class="IANombre">CANVIA</div>\
      <img src="https://ohmega-assistant-dev.mybluemix.net/img/close.png" class="botonclosechat" />\
  </div>\
  <div class="cuerporespuesta scrollbar" id="scrollkiara">\
  </div>\
  <input type="text" id="mensajechat" class="enviarmensajekiara">'
W.chat.querySelector('.cabecerachat').addEventListener('click',function(){
	W.toggleChat();
})
W.input=W.chat.querySelector('#mensajechat')
W.body=W.chat.querySelector('#scrollkiara')
W.utils = {
	getTime: function(date=null){
		if (!date) {
			date = new Date();
		}
		if (typeof date !== 'object') {
			console.error('Variable "date" no es un objecto!');
		}
		function addZero(i) {
		    if (i < 10) {
		        i = "0" + i;
		    }
		    return i;
		}
		return addZero(date.getHours()) + ":" + addZero(date.getMinutes());
	}
}
W.DOM = {
	userMessage: function(content){
		let el = document.createElement('DIV')
		//let time = document.createElement('DIV')
		let message = document.createElement('DIV')

		el.className = 'cuerpopregunta'
		//time.className = 'horapregunta'
		message.className = 'respuestausuarioch'
		
		//time.appendChild(document.createTextNode(W.utils.getTime()))
		message.appendChild(document.createTextNode(content))

		el.append(message)

		return el
	},
	separator: function(){
		let sep = document.createElement('DIV')
		sep.className ='separacionchat'
		return sep
	},
	kiaraMessage: function(content){
		let el = document.createElement('DIV')
		let kiara = document.createElement('DIV')
		//let time = document.createElement('SPAN')
		let message = document.createElement('DIV')

		el.className = 'el'
		//time.className = 'horach'
		message.className = 'respuestakiara'
		//kiara.className = 'kiara'
		
		//time.appendChild(document.createTextNode(W.utils.getTime()))
		/*
		kiara.append(
			document.createTextNode('Canvia'),
			time
		)	
		*/
		message.innerHTML=content

		el.append(kiara,message)

		return el
	},
	AVMessageWithQuickReplies: (content,quickReplies) => {
		let elem = document.createElement('div')
		let message = W.DOM.kiaraMessage(content)

		let optionsQR = document.createElement('div')
		optionsQR.className = 'quickReplies'
		let optionsQRScroll = document.createElement('div')
		optionsQRScroll.className = 'quickRepliesScroll'
		optionsQRScroll.append(optionsQR)
		console.log(quickReplies)
		quickReplies.forEach((e) => {
			let option = document.createElement('div')
			option.className = 'replyOption'
			option.innerHTML = e.title
			optionsQR.append(option)
		})

		elem.append(message,optionsQRScroll)
		return elem
	}
}
W.context = {"username":W.user}
W.sendOptionMessage = (e) => {
	W.body.querySelectorAll('.quickRepliesScroll').forEach((e) => e.remove())
	W.sendMessage(e.target ? e.target.innerHTML : e.toUpperCase())
}

W.sendMessage = function(message){
	W.body.append(W.DOM.userMessage(message))
	W.body.scrollTop = W.body.scrollHeight;
	W.api(message,function(data){
		W.context = data.context
		console.log(data)
		let i = 0
		switch(data.output.action){
			case 'ACTION_show_quick_replies':{
				while(i < data.output.text.length){
					if(i === (data.output.text.length - 1)){
						W.receiveQuickReplies(data.output.text[i++],data.output.quick_replies)
					}else{
						W.receiveMessage(data.output.text[i++])
					}
				}
				W.context = data.context
				break
			}
			default: {
				if(Array.isArray(data.output.text)){
					W.receiveMessage(data.output.text.join('<br><br>'));
				}else{
					W.receiveMessage(data.output.text);
				}
			}
		}
		
	})
}
W.receiveMessage = function(message){
	W.body.append(W.DOM.kiaraMessage(message))	
	W.body.scrollTop = W.body.scrollHeight;
	$('.bxslider').bxSlider({
		pager:true,
		infiniteLoop: false,
		minSlides:2,
		hideControlOnEnd:true,
		nextText: '<i class="fa fa-chevron-right" aria-hidden="true"></i>',
		prevText: '<i class="fa fa-chevron-left" aria-hidden="true"></i>'
	});
}

/**Quick Replies */
W.receiveQuickReplies = (message,elements) => {
	console.log('elements: '+elements)
	W.body.append(W.DOM.AVMessageWithQuickReplies(message,elements))
	W.body.scrollTop = W.body.scrollHeight
	W.body.querySelectorAll('.replyOption').forEach((a) => {
		a.addEventListener('click',() => W.sendOptionMessage(event))
	})
}
/**/

W.input.addEventListener('keydown', function(e){
	if (e.key==='Enter') {
		W.sendMessage(e.target.value)
		e.target.value = ''
	}
})

W.api = function(message='',callback){
	let x = new XMLHttpRequest();
  x.open('POST', W.config[W.env].src + '/api/message', true);
  x.setRequestHeader('Content-type', 'application/json');
  x.setRequestHeader('Authorization', W.chat.getAttribute('key'));
  x.onreadystatechange = function() {
    if (x.readyState === 4 && x.status === 200 && x.responseText) {
      callback(JSON.parse(x.responseText))
    }
  };
  x.send(JSON.stringify({input:{text:message},context:W.context}));
}
W.api('',function(data){
	if(Array.isArray(data.output.text)){
		W.body.append(W.DOM.kiaraMessage(data.output.text.join('<br><br>')));
	}else{
		W.body.append(W.DOM.kiaraMessage(data.output.text));
	}
})