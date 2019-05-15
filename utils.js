var verifyCredentialsWeb = function(req, res, workspace) {
	if (!req.headers.authorization) {
    return res.json({
      'output': {
        'text': 'Credenciales incorrectas.'
      }
    });
  }
  if (req.headers.authorization !== process.env.API_KEY) {
    return res.json({
      'output': {
        'text': 'Credenciales incorrectas.'
      }
    });
  }
  if (!workspace || workspace === '<workspace-id>') {
    return res.json({
      'output': {
        'text': 'No se ha especificado un WORKSPACE_ID en las variables de entorno.'
      }
    });
  }
}

var parseGenericToHTML = function(jsonData, jsonElements) {
	//var html = '<p>' + jsonData.join('\n') + '</p>';
	//html += '<ul class="watson-chatbot-slider bxslider">';

	var html = '<div class="swiper-container">';
	 html += '<div class="swiper-wrapper">';
	for(var i=0; i<jsonElements.length; i++) {
		var element = jsonElements[i];
		html += '<div class="swiper-slide">';
		
		/*if (element.default_action) {
			if (element.default_action.type === "web_url") {
				html += '<a target="_blank" href="' + element.default_action.url + '">';
			}
		}*/
		html += '<div class="watson-chatbot-img"><img src="' + element.banner_url + '"/></div>';
		html += '<div class="circle-img"><img class="responsive-img circle-icon-'+i+'"  src="' + element.image_url + '"/></div>';
		html += '<div class="watson-chatbot-desc"><p>' + element.title + '</p></div>';

		/*html += '<h5>' + element.subtitle + '</h5></div>';*/
		if (element.buttons) {
			html += '<div class="watson-chatbot-buttons">';
			for (var b in element.buttons) {
			    var button = element.buttons[b];
			    if (button.type === "postback") {
						html += '<div class=" watson-postback watson-button ">';
						html += '<p class="watson-postback-carousel">'
			    } else {
			        html += '<div>';
			    }
					html += button.title;
					html += '</p>';
			    html += '</div>';
			}
		    html += '</div>';
		}
		/*if (element.default_action) {
			if (element.default_action.type == "web_url") {
			    html += '</a>';
			}
		}*/
		html += '</div>';
	}
	html += '</div>';

/*html +='<div class="swiper-pagination"></div>';
 html += '<div class="swiper-button-prev"></div>';
	html +='<div class="swiper-button-next"></div>';*/
	html += ' <div class="hide-on-small-only swiper-button-next  "><i class="material-icons">navigate_next</i></div>'
	html += '<div class="hide-on-small-only swiper-button-prev "><i class="material-icons">navigate_before</i></div>'
	html += '<div class="swiper-pagination"></div>'
	html += '</div>';

	return html;
}

var parseButtonsToHTML = function(jsonData, jsonAttachment) {
	if (jsonAttachment.payload){
		if (jsonAttachment.payload.template_type == "button") {
			var html = '<p>' + jsonData.join('<br>') + '</p>';
			html += '<ul class="watson-chatbot-buttons">';
			jsonElements = jsonAttachment.payload.buttons;
			for(var i=0; i<jsonElements.length; i++) {
				var element = jsonElements[i];
				html += '<li class="watson-chatbot-button">';
				//Open Link if necessary
				if (element.type) {
					if (element.type === "web_url") {
						html += '<a target="_blank" href="' + element.url + '">';
					}
				}
				//Button interior
					if (element.type === "postback") {
						html += '<div class="watson-postback active watson-button">';
					} else {
							html += '<div>';
					}
					html += element.title;
					html += '</div>';
					//Close link if necessary
				if (element.type) {
					if (element.type == "web_url") {
							html += '</a>';
					}
				}
				html += '</li>';
			}
			html += '</ul>';
		}

	}

	else  {
		var html = '<p>' + jsonData.join('\n') + '</p>';
		html += '<ul class="watson-chatbot-slider">';
		for (var i = 0; i < jsonAttachment.length;i++){
			var element = jsonAttachment[i];
			html += '<li class="watson-chatbot-element">';
			if (element.default_action) {
				if (element.default_action.type === "web_url") {
					html += '<a target="_blank" href="' + element.default_action.url + '">';
				}
			}
			html += '<div class="watson-chatbot-img"><img src="' + element.image_url + '"/></div>';
			html += '<div class="watson-chatbot-desc"><h4>' + element.title + '</h4>';
			html += '<h5>' + element.subtitle + '</h5></div>';
			if (element.buttons) {
				html += '<div class="watson-chatbot-buttons">';
				//for (var b in element.buttons) {
				    var button = element.buttons[0];
				    if (button.type === "postback") {
				    	html += '<div class="watson-postback active watson-button">';
				    } else {
				        html += '<div>';
				    }
						console.log("button title");
						console.log(button.title);
				    html += button.title;
				    html += '</div>';
				//}
			    html += '</div>';
			}
			if (element.default_action) {
				if (element.default_action.type == "web_url") {
				    html += '</a>';
				}
			}
			html += '</li>';
		}
		html += '</ul>';
	}
	return html;
}
var clone = function(a) { return JSON.parse(JSON.stringify(a)); }

module.exports.parseButtonsToHTML = parseButtonsToHTML;
module.exports.parseGenericToHTML = parseGenericToHTML;
module.exports.verifyCredentialsWeb = verifyCredentialsWeb;
module.exports.clone = clone;
