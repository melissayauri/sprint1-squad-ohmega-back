W={}
W.config = {
	local:{
		src:'http://localhost:4000'
	},
	dev: {
		src:'//ohmega-assistant-dev.mybluemix.net'
	},
	prd:{
		src:'//ohmega-assistant-prd.mybluemix.net'
	}
}
W.chat = document.getElementById('kiara-conversation');
W.chat.style ='display:block;'
//W.chat.style ='display:none;'
if (!W.chat) {
	console.error('No existe elemento de conversación');
}
W.env = W.chat.getAttribute('env')
W.user = W.chat.getAttribute('user')
W.open = true
//W.open = false
W.chat.classList.remove('w-bounceOutDown')
W.chat.classList.add('w-bounceInUp')
W.agent = false
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
//W.chat.className = "w-animated cuerpochat"
W.chat.innerHTML='\
<div class="row">\
<div class="col s12">\
		<div  class=" block-background ">\
<div class="chat-header">\
<div class="icon-canvia">\
		<img class="responsive-img" src="http://svvscorp.com/img/ohmega/logo-canvia.png" alt="canvia-header">\
</div>\
<div class="triangulo-equilatero-bottom ">\
</div>\
<div class="icons-header">\
		<span >\
				<i class="material-icons"> remove</i>\
		</span>\
		<span class="">\
				<i class="material-icons">close</i></span>\</div>\
</div>\
	<div class="chatbot__overview">\
	<ul class="chatlist" id="scrollkiara">\
	<div class="cont-logo">\
	<img class="responsive-img hide-on-med-and-up" src="http://svvscorp.com/img/ohmega/fondo-naranja-3x.png" alt="backg-deg">\
	<img class="responsive-img hide-on-med-and-up" src="http://svvscorp.com/img/ohmega/logo-canvia.png" alt="logo-canvia">\
	</div>\
	</ul>\
	</div>\
	<div class="bottom" id="bottom">\
<input class="input" id="mensajechat" placeholder="Escribe aquí...">\
<i id="send" class="material-icons">send</i>\
</div>\
	</div>\
	</div>\
	</div>\
	'
W.chat.querySelector('.chat-header').addEventListener('click',function(){
	W.toggleChat();
})
W.input=W.chat.querySelector('#bottom')
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
		//let el = document.createElement('DIV')
		//let time = document.createElement('DIV')
		let message = document.createElement('li')

		//el.className = 'cuerpopregunta'
		//time.className = 'horapregunta'
		message.className = 'userInput'
		
		//time.appendChild(document.createTextNode(W.utils.getTime()))
		message.appendChild(document.createTextNode(content))

		//el.append(message)

		return message
	},
	separator: function(){
		let sep = document.createElement('DIV')
		sep.className ='separacionchat'
		sep.innerHTML =
			`
				<img class="responsive-img separator-img" src="http://svvscorp.com/img/ohmega/group-6-3x.png" alt="imagen" />
			`

		return sep
	},
	separatorFinal: function(){
		let sep = document.createElement('DIV')
		sep.className ='separacionchat'
		sep.innerHTML =
			`
				<img class="responsive-img separator-img" src="http://svvscorp.com/img/ohmega/logo-canvia.png" alt="imagen" />
			`

		return sep
	},
	indicator: function(){
		let indicator = document.createElement('DIV')
		indicator.className ='indicator bot__output-1'
		/*indicator.innerHTML =`
		<div class="cont-typing">
		<div class="typing">
			<span></span>
			<span></span>
			<span></span>
		</div>
	</div>`*/
	indicator.innerHTML =`

		<div class="typing">
			<span></span>
			<span></span>
			<span></span>
		</div>`
	/*indicator.innerHTML='typing'*/
		return indicator
	},
	kiaraMessage: function(content){
		//let el = document.createElement('DIV')
		//let kiara = document.createElement('DIV')
		//let time = document.createElement('SPAN')
		let message = document.createElement('li')

		//el.className = 'el'
		//time.className = 'horach'
		message.className = 'bot__output-1 bot__output--standard'
		//kiara.className = 'kiara'
		
		//time.appendChild(document.createTextNode(W.utils.getTime()))
		/*
		kiara.append(
			document.createTextNode('Canvia'),
			time
		)	
		*/
		message.innerHTML=content

		//el.append(kiara,message)

		return message
	},
	AVMessageWithQuickReplies: (content,quickReplies) => {
		let elem = document.createElement('div')
		let message = W.DOM.kiaraMessage(content)

		let optionsFinal = document.createElement('div')
		let optionsQR = document.createElement('div')
		optionsQR.className = 'slides'
		optionsQR.append(optionsFinal)
		let optionsQRScroll = document.createElement('div')
		/*optionsQRScroll.className = 'quick_replies'*/
		optionsQRScroll.append(optionsQR)
		console.log(quickReplies)
		quickReplies.forEach((e) => {
			let option = document.createElement('button')
			option.className = 'btn btn-replies'
			let textButton = document.createElement('p')
			textButton.className = 'buttonText'
			option.appendChild(textButton);
			textButton.innerHTML = e.title
			optionsFinal.append(option)
		})

		elem.append(optionsQRScroll)
		return optionsQRScroll
	},
	AVMessageWithCarrousel: (content) => {
		let message = document.createElement('div')
		message.innerHTML=content
		return message
	},
	AVMessageWithImage: (url) => {
		let elem = document.createElement('div')
		let image = document.createElement('div')
		image.className = 'imageWatson'
		image.innerHTML =
			`
				<img class="responsive-img " src="${url}" alt="imagen" />
			`
		elem.append(image)
		return elem
	},
	AVMessageWithVideo: (url,height,width) => {
		let elem = document.createElement('div')
		//let message = W.DOM.kiaraMessage(content)

		let urlEncoded = encodeURIComponent(url)
		let video = document.createElement('div')
		video.className = 'iframeVideo'
		video.innerHTML =
			`<iframe
				src="${url}"
				height="${height}"
				width="${width}"
				style="border:none;overflow:hidden"
				scrolling="no"
				frameborder="0"
				allowTransparency="true"
				allowFullScreen="true"
			>
			</iframe>`

		elem.append(video)
		return elem
	}
}
W.context = {"username":W.user}

W.sendOptionMessage = (e) => {
	let valor = 	e.target;
	let valueButton = e.target.innerHTML;
	//let valor3 = document.getElementsByClassName('buttonText').innerHTML
	//console.log(valueButton);
	valueButton = valueButton.replace(/<[^>]+>/g,'');
	//console.log(valueButton);
	/*valor = valor.replace(/<[^>]+>/g,'');*/
	//W.body.querySelectorAll('.quickRepliesScroll').forEach((e) => e.remove())
	//W.sendMessage(e.target ? e.target.innerHTML : e.toUpperCase())
	W.sendMessage(valueButton? valueButton : e.toUpperCase())
}

W.sendMessage = function(message){
	W.body.append(W.DOM.userMessage(message))
	W.body.scrollTop = W.body.scrollHeight;
	if(!W.agent){
		W.api(message,function(data){
			W.context = data.context
			console.log(data)

			if(!data.output.active_input){
				W.input.style ='display:none;'
			}

			if(data.output.feedback){
				W.printSeparatorBot();
			}

			let i = 0
			var delay = 1
			switch(data.output.action){
				case 'ACTION_transfer_agent':{
					delay = 1000
					while(i < data.output.text.length){
							setTimeout(function(y) {W.receiveMessage(y)},delay,data.output.text[i])
							i++
							delay = delay + 2500;
					}
					setTimeout(function() {W.printSeparatorAgent()},delay)
					delay = delay + 2500;
					W.context = data.context
					W.agent = true
					setTimeout(function() {W.input.style ='display:flex;'},delay)
					delay = delay + 2500;
					setTimeout(function() {W.printTypeIndicator()},delay)
					//W.input.style ='display:flex;';
					sendToFireBase(message)
					break;
				}
				case 'ACTION_show_quick_replies':{
					delay = 1000
					while(i < data.output.text.length){
						if(i === (data.output.text.length - 2)){
							if(data.output.url_video){
								setTimeout(function(y) {W.receiveMessage(y)},delay,data.output.text[i])
								i++
								delay = delay + 2500;
								setTimeout(function(y,w,z) {W.receiveVideo(y,w,z)},delay,data.output.url_video,200,200)
								delay = delay + 2500;
							}else{
								setTimeout(function(y) {W.receiveMessage(y)},delay,data.output.text[i])
								i++
								delay = delay + 2500;
							}
						}else if(i === (data.output.text.length - 1)){
							setTimeout(function(y) {W.receiveMessage(y)},delay,data.output.text[i])
							i++
							delay = delay + 2500;
							setTimeout(function(y,z) {W.receiveQuickReplies(y,z)},delay,data.output.text[i],data.output.quick_replies)
							delay = delay + 2500;
						}else{
							setTimeout(function(y) {W.receiveMessage(y)},delay,data.output.text[i])
							i++
							delay = delay + 2500;
						}
					}
					W.context = data.context
					break
				}
				case 'ACTION_show_carrousel':{
					delay = 1000
					while(i < data.output.text.length){
						if(i === (data.output.text.length - 1)){
							setTimeout(function(y) {W.receiveMessage(y)},delay,data.output.text[i])
							i++
							delay = delay + 2500;
							setTimeout(function(y) {W.receiveCarrousel(y)},delay,data.output.carrousel)
							delay = delay + 2500;
						}else{
							setTimeout(function(y) {W.receiveMessage(y)},delay,data.output.text[i])
							i++
							delay = delay + 2500;
						}
					}
					W.context = data.context
					break
				}
				default: {
					delay = 1000;
					if(Array.isArray(data.output.text)){
						while(i < data.output.text.length){
							console.log("contador",i);
							setTimeout(function(y) {
								W.receiveMessage(y)
							},delay,data.output.text[i])
							i++
							delay = delay + 2500
						}
						//W.receiveMessage(data.output.text.join('<br><br>'));
					}else{
						setTimeout(function(y) {W.receiveMessage(y)},delay,data.output.text)
						delay = delay + 2500
					}
					W.context = data.context
				}
			}

			if(data.output.active_input == true){
				setTimeout(function() {W.input.style ='display:flex;';},delay)
			}
			
		})
	}else{
		sendToFireBase(message)
		W.body.querySelectorAll('.indicator').forEach((e) => e.remove())
		setTimeout(function() {W.printTypeIndicator()},1000)
		
		//W.receiveMessage('Mensaje del agente')
	}
	
}
W.receiveMessage = function(message){
	W.body.append(W.DOM.kiaraMessage(message))	
	W.body.scrollTop = W.body.scrollHeight;
}

W.printSeparatorAgent = function(){
	W.body.append(W.DOM.separator())
	W.body.scrollTop = W.body.scrollHeight;
}

W.printSeparatorBot= function(){
	W.body.append(W.DOM.separatorFinal())
	W.body.scrollTop = W.body.scrollHeight;
}

W.printTypeIndicator = function(){
	W.body.append(W.DOM.indicator())
	W.body.scrollTop = W.body.scrollHeight;
}

/**Quick Replies */
W.receiveQuickReplies = (message,elements) => {
	console.log('elements: '+elements)
	W.body.append(W.DOM.AVMessageWithQuickReplies(message,elements))
	W.body.scrollTop = W.body.scrollHeight
/*	W.body.querySelectorAll('.buttonText').forEach((a) => {*/
	
	W.body.querySelectorAll('.btn-replies').forEach((a) => {
		a.addEventListener('click',() => W.sendOptionMessage(event))
	})
}
/**/

W.receiveVideo = (url,height,width) => {
	W.body.append(W.DOM.AVMessageWithVideo(url,height,width))
	W.body.scrollTop = W.body.scrollHeight
}

W.receiveImage = (url) => {
	W.body.append(W.DOM.AVMessageWithImage(url))
	W.body.scrollTop = W.body.scrollHeight
}

W.receiveCarrousel = (message) => {
	W.body.append(W.DOM.AVMessageWithCarrousel(message))
	W.body.scrollTop = W.body.scrollHeight
	var mySwiper = new Swiper ('.swiper-container', {
		// Optional parameters
		//slidesPerView: 'auto',
		slidesPerView: 4,
		spaceBetween: 30,
		centeredSlides: true,
		/*spaceBetween: 1,*/
		// If we need pagination
		pagination: {
		el: '.swiper-pagination',
		},
		// Navigation arrows
		navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
		},
		// And if we need scrollbar
})
	/*$('.watson-chatbot-slider').bxSlider({
		pager:true,
		infiniteLoop: false,
		minSlides:3,
		hideControlOnEnd:true,
		nextText: '<i class="fa fa-chevron-right" aria-hidden="true"></i>',
		prevText: '<i class="fa fa-chevron-left" aria-hidden="true"></i>'
	});
*/
/*carusel*/
//	W.body.querySelectorAll('.watson-postback').forEach((a) => {
		W.body.querySelectorAll('.watson-postback-carousel').forEach((a) => {
		console.log(a)
		a.addEventListener('click',() => W.sendOptionMessage(event))
	})

	W.chat.querySelectorAll('#send').forEach((a) => {
		
		a.addEventListener('click',() => {
			var text = document.getElementById('mensajechat').value
			W.sendMessage(text)
			document.getElementById('mensajechat').value = ''
		})
	})
}

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

		if(data.output.active_input == true){
			W.input.style ='display:block;';
			console.log('entre');
		}else{
			W.input.style ='display:none;';
			console.log('sali');
		}
		let i = 0
		var delay = 1
		switch(data.output.action){
			case 'ACTION_show_quick_replies':{
				delay = 1000
				while(i < data.output.text.length){
					if(i === (data.output.text.length - 2)){
						if(data.output.imagen_url){
							setTimeout(function(y) {W.receiveMessage(y)},delay,data.output.text[i])
							i++
							delay = delay + 2500;
							setTimeout(function(y) {W.receiveImage(y)},delay,data.output.imagen_url)
							delay = delay + 2500;
						}else{
							setTimeout(function(y) {W.receiveMessage(y)},delay,data.output.text[i])
							i++
							delay = delay + 2500;
						}
					}else if(i === (data.output.text.length - 1)){
						setTimeout(function(y) {W.receiveMessage(y)},delay,data.output.text[i])
						i++
						delay = delay + 2500
						setTimeout(function(y,z) {W.receiveQuickReplies(y,z)},delay,data.output.text[i],data.output.quick_replies)
						delay = delay + 2500
					}else{
						setTimeout(function(y) {W.receiveMessage(y)},delay,data.output.text[i])
						i++
						delay = delay + 2500
					}
				}
				W.context = data.context
				break
			}
			default: {
				if(Array.isArray(data.output.text)){
					while(i < data.output.text.length){
						console.log("contador",i);
						W.receiveMessage(data.output.text[i++])
					}
					//W.receiveMessage(data.output.text.join('<br><br>'));
				}else{
					W.receiveMessage(data.output.text);
				}
			}

			
		}
})

// Initialize Firebase
var config = {
	apiKey: "AIzaSyC9q-Wlx2HTF_f4twTzhc-QENZ9flaRMw0",
	authDomain: "facebook-bot-5dac7.firebaseapp.com",
	databaseURL: "https://facebook-bot-5dac7.firebaseio.com",
	projectId: "facebook-bot-5dac7",
	storageBucket: "facebook-bot-5dac7.appspot.com",
	messagingSenderId: "146936705755"
};
firebase.initializeApp(config);

var db = firebase.firestore();

db.collection("chats").doc("agente")
.onSnapshot({
	// Listen for document metadata changes
	//includeMetadataChanges: true
}, function(doc) {
	console.log(doc.data());
	if(W.agent){
		W.body.querySelectorAll('.indicator').forEach((e) => e.remove())
		W.receiveMessage(doc.data().msg)
		if(doc.data().fin){
			W.agent = false;
			W.context.feedback = true;
			W.input.style ='display:none;';
			W.printSeparatorBot();
			W.api('',function(data){
					let i = 0
					switch(data.output.action){
						case 'ACTION_show_quick_replies':{
							while(i < data.output.text.length){
								if(i === (data.output.text.length - 1)){
									W.receiveMessage(data.output.text[i++])
									W.receiveQuickReplies(data.output.text[i],data.output.quick_replies)
								}else{
									W.receiveMessage(data.output.text[i++])
								}
							}
							W.context = data.context
							break
						}
						default: {
							if(Array.isArray(data.output.text)){
								while(i < data.output.text.length){
									console.log("contador",i);
									W.receiveMessage(data.output.text[i++])
								}
								//W.receiveMessage(data.output.text.join('<br><br>'));
							}else{
								W.receiveMessage(data.output.text);
							}
							W.context = data.context
						}
					}
			})
		}
	}
	
});

function sendToFireBase(message){
	//var textUser = document.getElementById("textUser").value;
	console.log(message);

	// Add a new document in collection "cities"
	db.collection("chats").doc("cliente").set({
			msg: message
	})
	.then(function() {
			console.log("Document successfully written!");
	})
	.catch(function(error) {
			console.error("Error writing document: ", error);
	});

}