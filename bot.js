module['exports'] = function dealchat_cleaner(hook) {
    var token = hook.env.token;
  	var request = require("request");
  	hook.res.writeHead(200, {'Content-Type': 'text/plain'});
  	var message_id = hook.params.message.message_id;
  	var chat_id = hook.params.message.chat.id;
    var message = hook.params.message.text;
  	var data = hook.params.message;
  	console.log(data);
  	if (data.hasOwnProperty("sticker")){
    	if (data.sticker.set_name.indexOf('katyaserebro')!=-1){
        	request.post('https://api.telegram.org/bot' + token + '/deletemessage')
      		.form({
        	'chat_id': chat_id,
        	'message_id': message_id
      		});
      		request.post('https://api.telegram.org/bot' + token + '/sendMessage')
      		.form({
        	'chat_id': chat_id,
        	'text': 'Стикер от @'+data.from.username+' удален. Кищук рип.'
      		});
      		return 1;
        }
      
    }
  	if (data.hasOwnProperty("game") && 
      	data.from.username.indexOf('Halcyondays')==-1 ) { 
     request.post('https://api.telegram.org/bot' + token + '/deletemessage')
      	.form({
        'chat_id': chat_id,
        'message_id': message_id
      });
      request.post('https://api.telegram.org/bot' + token + '/sendMessage')
      	.form({
        'chat_id': chat_id,
        'text': 'Игра @'+data.from.username+' уничтожена. 🔪🇺🇬🤷🏿‍♂️ Беги, ниггер.'
      });
      return 1;
    }
    if (message.search(/^[/]+\S+/)!== -1 &&
        message.indexOf('/help')== -1 &&
      	message.indexOf('/start')== -1 &&
      	message.indexOf('/stat')== -1)
    {
      request.post('https://api.telegram.org/bot' + token + '/deletemessage')
      	.form({
        'chat_id': chat_id,
        'message_id': message_id
      });
      request.post('https://api.telegram.org/bot' + token + '/sendMessage')
      	.form({
        'chat_id': chat_id,
        'text': 'Сообщение от @'+data.from.username+' удалено. Не балуйся'
      });
      //console.log(hook.params.message);
  	return 1;
	}
  
  hook.res.end(hook.params);
  return 1;
};