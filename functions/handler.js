const commands = require('../constants/command');
const messages = require('../constants/messages');
const specialUser = require('../constants/special-user');
const greetings = require('../constants/greeting');
const checkWord = require('../lib/bad-word');

module.exports = {
    message: function (client, message, prefix) {
        let messageInput =
            message.body.charAt(0) == prefix ? message.body : message.caption;

        let input = this.input(messageInput, prefix);
        let command = this.command(input.keyword);
        let isGroup = message.isGroupMsg;
        let result = {command: command, status: true, input: input};

        if (command == null) {
            result.status = false;

            client.reply(
                message.from,
                messages.commandNotAvailable,
                message.id
            );
        } else {
            if (command.ownerOnly && this.checkOwner(message.sender.id) == false) {
                result.status = false;

                client.reply(message.from, messages.commandNotAllowed, message.id);
            } else {
                if (!isGroup) {
                    if (command.private === false) {
                        result.status = false;
        
                        client.reply(
                            message.from,
                            messages.onlyGroup,
                            message.id
                        );
                    }
                } else {
                    if (command.group === false) {
                        result.status = false;

                        client.reply(
                            message.from,
                            messages.onlyPrivate,
                            message.id
                        );
                    }
                }
        
                if (command.params === true && input.param === '') {
                    result.status = false;
        
                    client.reply(
                        message.from,
                        messages.wrongFormat,
                        message.id
                    );
                }
            }
        }

        return result;
    },
    input: function (input, prefix) {
        let stringIndex = input.indexOf(' ') >= 0 ? input.indexOf(' ') : input.length;
        let keyword = input.substring(0, stringIndex);
        let param = '';

        if (input.split(' ').length > 1) {
            param = input.replace(keyword + ' ', '');
        }

        return { keyword: keyword.replace(prefix, ''), param: param };
    },
    command: function (keyword) {
        let command = commands.filter((command) => {
            if (Array.isArray(command['keyword'])) {
                return command['keyword'].includes(keyword);
            } else {
                return command['keyword'] == keyword;
            }
        });

        return command != '' ? command[0] : null;
    },
    badWord: async function (chats, client, message) {
        const isBadWord = await checkWord(chats);

        // console.log(isBadWord);

        if (isBadWord) {
            client.reply(message.from, messages.badWord, message.id);
        }
    },
    wrongFormat: function (client, message) {
        client.reply(message.from, messages.wrongFormat, message.id);
    },
    checkOwner: function(userId) {
        return userId == specialUser.owner.serialized;
    },
    greeting: function(client, message, chats) {
        if (chats.split(' ').length <= 1) {
            if (greetings.includes(chats.toLowerCase())) {
                client.reply(message.from, messages.greeting, message.id);
            }
        }
    }
};
