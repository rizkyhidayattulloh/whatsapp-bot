const { create, Client } = require('@open-wa/wa-automate');
const helper = require('locutus/php/funchand');
const output = require('./functions/output');
const messages = require('./constants/messages');
const handler = require('./functions/handler');

const launchConfig = {
    useChrome: true,
    autoRefresh: true,
    cacheEnabled: false,
    sessionId: 'hr',
};
const prefix = '!';

function start(client) {
    client.onAddedToGroup(async (chat) => {
        client.sendText(chat.id, messages.addedToGroup);
    });

    client.onMessage(async (message) => {
        let chats = '';

        if (type in message) {
            chats = message.type === 'chat'
                ? message.body
                : message.type === 'image' || message.type === 'video'
                    ? message.caption
                    : '';
        }

        // handler.badWord(chats, client, message);

        handler.greeting(client, message, chats);

        if (chats != '') {
            if (chats.charAt(0) == prefix) {
                client.sendSeen(message.chatId).then(() => {
                    let userInput = handler.message(client, message, prefix);

                    if (userInput.status === true) {
                        // console.log(message);
                        let params = [client, message];

                        if (userInput.command.params === true) {
                            params.push(userInput.input.param);
                        }

                        helper.call_user_func_array(
                            [output, userInput.command.callback],
                            params
                        );
                    }
                });
            }
        }
    });
}

create(launchConfig).then(start);
