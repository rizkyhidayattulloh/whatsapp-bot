const { decryptMedia } = require('@open-wa/wa-automate');
const messages = require('../constants/messages');
const format = require('../constants/format');
const specialUser = require('../constants/special-user');
const handler = require('../functions/handler');
const axios = require('axios');
const fs = require('fs');
const writeFile = require('write-file-utf8');
const convertPdf = require('../lib/convertPdf');
const stringMaker = require('../lib/string-maker');
const yt = require('../lib/yt');
const BrainlySearch = require('../lib/brainly');
const link = 'https://arugaz.my.id/api';
const rizky = 'https://rizzkun.herokuapp.com/public';
const translate = require('../lib/translate');
const ytdl = require('ytdl-core');

module.exports = {
    test: function (client, message) {
        // const tmp = 'tmp-file/';
        // libre.convert(fs.readFileSync('./' + tmp + 'test.docx'), 'pdf', undefined, (err, done) => {
        //     if (err) {
        //         console.log(`Error converting file: ${err}`);
        //     }
        //     fs.writeFileSync('./lala.pdf', done);
        // });
        // client.reply(message.from, 'Masuk bro', message.id);
        // client.sendFile(
        //     message.from,
        //     './tmp-file/test.docx',
        //     'test.docx',
        //     'ini'
        // );
    },
    menu: function (client, message) {
        client.reply(message.from, messages.menu, message.id);
    },
    everyone: async function (client, message) {
        let admins = await client.getGroupAdmins(message.from);

        if (admins.includes(message.sender.id)) {
            let text = '';
            let participants = await client.getGroupMembers(message.chatId);

            for (let participant of participants) {
                const contact = participant.id.replace('@c.us', '');

                text += `@${contact} `;
            }

            client.sendTextWithMentions(message.chatId, text);
        } else {
            client.reply(
                message.from,
                'Maaf hanya admin group yang bisa menggunakan perintah',
                message.id
            );
        }
    },
    owner: async function (client, message) {
        client.sendContact(message.chatId, specialUser.owner.serialized);
    },
    sticker: async function (client, message) {
        if (message.type == 'image') {
            client
                .reply(message.from, messages.loading, message.id)
                .then(async () => {
                    const mediaData = await decryptMedia(message);
                    const dataImage =
                        'data:' +
                        message.mimetype +
                        ';' +
                        'base64,' +
                        mediaData.toString('base64');

                    client
                        .sendImageAsSticker(message.chatId, dataImage)
                        .then(() => {
                            const sender = message.sender.id.replace(
                                '@c.us',
                                ''
                            );

                            client.sendTextWithMentions(
                                message.chatId,
                                `Ini stickernya paduka, @${sender}`
                            );
                        });
                });
        } else {
            client.reply(message.from, messages.wrongFormat, message.id);
        }
    },
    stickerLow: function (client, message) {
        if (message.type == 'image') {
            client
                .reply(message.from, messages.loading, message.id)
                .then(async () => {
                    const dataImage =
                        'data:' +
                        message.mimetype +
                        ';' +
                        'base64,' +
                        message.body;

                    client
                        .sendImageAsSticker(message.chatId, dataImage)
                        .then(() => {
                            const sender = message.sender.id.replace(
                                '@c.us',
                                ''
                            );

                            client.sendTextWithMentions(
                                message.chatId,
                                `Ini stickernya paduka, @${sender}`
                            );
                        });
                });
        } else {
            client.reply(message.from, messages.wrongFormat, message.id);
        }
    },
    leave: async function (client, message) {
        let admins = await client.getGroupAdmins(message.from);

        if (admins.includes(message.sender.id)) {
            client
                .reply(message.from, messages.leave, message.id)
                .then(() => client.leaveGroup(message.chatId));
        } else {
            client.reply(
                message.from,
                'Maaf hanya admin group yang bisa menggunakan perintah',
                message.id
            );
        }
    },
    write: async function (client, message, params) {
        client
            .reply(message.from, messages.loading, message.id)
            .then(async () => {
                if (params.length > 500) {
                    client.reply(
                        message.from,
                        'Maaf saat ini fitur write hanya bisa menampung 500 karakter',
                        message.id
                    );
                } else {
                    let countLine = 0;
                    let pages = [];
                    let pageCount = 0;
                    const maxChar = 45;
                    const maxLine = 24;
                    const lines = params.split('\n');

                    for (let line of lines) {
                        let charLine = line.match(/.{1,48}/g);
                        let count = 0;

                        if (charLine == null) {
                            count = 1;
                        } else {
                            count = charLine.length;
                        }

                        countLine += count;

                        if (countLine > maxLine) {
                            let exceed = count - (countLine - maxLine);
                            countLine = exceed;

                            if (charLine != null) {
                                pages[pageCount] += charLine
                                    .filter((value, index) => index < exceed)
                                    .join('\n');

                                pageCount += 1;

                                if (charLine.length > exceed) {
                                    pages.push(
                                        charLine
                                            .filter(
                                                (value, index) =>
                                                    index >= exceed
                                            )
                                            .join('\n')
                                    );
                                }
                            }
                        } else {
                            if (pages[pageCount] == null) {
                                pages[pageCount] = '';
                            }

                            pages[pageCount] +=
                                charLine === null
                                    ? ' \n'
                                    : charLine.length > 1
                                    ? charLine.join('\n')
                                    : charLine[0] + '\n';
                        }
                    }

                    for (let page of pages) {
                        axios
                            .get(
                                `${link}/api/nulis?text=${encodeURIComponent(
                                    page
                                )}`
                            )
                            .then((res) => {
                                client.sendImage(
                                    message.from,
                                    res.data.result,
                                    '',
                                    `Nih bro`,
                                    message.id
                                );
                            })
                            .catch((error) => console.log(error));
                    }
                }
            });
    },
    convertPdf: async function (client, message) {
        if (message.quotedMsgObj.type == 'document') {
            const tmp = 'tmp-file/';
            const file = message.quotedMsgObj;
            const findExt = file.filename.lastIndexOf('.');
            const ext = file.filename.substring(findExt);
            const fileName = file.filename.replace(ext, '');

            if (format.includes(ext)) {
                client
                    .reply(message.from, messages.loading, message.id)
                    .then(async () => {
                        const document = await decryptMedia(file);
                        await writeFile(tmp + file.filename, document).then(
                            async () => {
                                await convertPdf(file.filename).then(() => {
                                    client
                                        .sendFile(
                                            message.from,
                                            `./${tmp}${fileName}.pdf`,
                                            `${fileName}.pdf`,
                                            '',
                                            message.chatId
                                        )
                                        .then(() => {
                                            fs.unlink(
                                                './' + tmp + file.filename,
                                                () => {}
                                            );
                                            fs.unlink(
                                                './' + tmp + fileName + '.pdf',
                                                () => {}
                                            );
                                        });
                                });
                            }
                        );
                    });
            } else {
                client.reply(message.from, messages.wrongFormat, message.id);
            }
        } else {
            client.reply(message.from, messages.wrongFormat, message.id);
        }
    },
    report: function (client, message, params) {
        client
            .reply(message.from, messages.reportSended, message.id)
            .then(() => {
                client.sendText(
                    specialUser.owner.serialized,
                    stringMaker.report(message, params)
                );
            });
    },
    requestFeature: function (client, message, params) {
        client
            .reply(message.from, messages.reportSended, message.id)
            .then(() => {
                client.sendText(
                    specialUser.owner.serialized,
                    stringMaker.requestFeature(message, params)
                );
            });
    },
    broadcast: async function (client, message, params) {
        let chatIds = await client.getAllChatIds();

        for (let chatId of chatIds) {
            let chat = await client.getChatById(chatId);

            if (chat.isGroup && !chat.isReadOnly)
                client.sendText(chatId, stringMaker.broadcast(params));
        }

        client.reply(message.from, 'Broadcast success paduka', message.id);
    },
    broadcastAll: async function (client, message, params) {
        let chatIds = await client.getAllChatIds();

        for (let chatId of chatIds) {
            let chat = await client.getChatById(chatId);

            if (!chat.isReadOnly)
                client.sendText(chatId, stringMaker.broadcast(params));
        }

        client.reply(message.from, 'Broadcast success paduka', message.id);
    },
    help: function (client, message) {
        client.reply(message.from, messages.help, message.id);
    },
    donate: function (client, message) {
        client.reply(message.from, messages.donate, message.id);
    },
    stickerGif: async function (client, message) {
        if (message.mimetype == 'video/mp4') {
            if (message.duration < 6) {
                client
                    .reply(message.from, messages.loading, message.id)
                    .then(async () => {
                        const mediaData = await decryptMedia(message);
                        const dataImage =
                            'data:' +
                            message.mimetype +
                            ';' +
                            'base64,' +
                            mediaData.toString('base64');

                        client.sendMp4AsSticker(message.from, dataImage);
                    });
            } else {
                client.reply(
                    message.from,
                    'Durasi video maksimal 5 detik',
                    message.id
                );
            }
        } else {
            client.reply(message.from, messages.wrongFormat, message.id);
        }
    },
    joinGroup: function (client, message, params) {
        client.joinGroupViaLink(params).then((result) => {
            if (result.includes('@g.us')) {
                client.reply(message.from, 'Berhasil masuk grup', message.id);
            } else {
                client.reply(
                    message.from,
                    'Link tidak valid atau saya baru saja meninggalkan grup, tunggu dalam beberapa menit',
                    message.id
                );
            }
        });
    },
    sendTo: async function (client, message, params) {
        const chatId = params.substring(0, params.indexOf(' '));
        const content = params.replace(chatId + ' ', '');

        client
            .sendText(chatId + '@c.us', stringMaker.sendTo(content))
            .then(() => {
                client.reply(message.from, 'Berhasil mengirim', message.id);
            });
    },
    schedule: function (client, message) {
        client.reply(message.from, stringMaker.schedule(), message.id);
    },
    brainly: async function (client, message, params) {
        client
            .reply(message.from, messages.loading, message.id)
            .then(async () => {
                axios.get(`${rizky}/api/brainly?query=${params}`).then((res) => {
                    let results = res.data.data;

                    if (results.length > 0) {
                        results.forEach((result) => {
                            client.reply(
                                message.from,
                                stringMaker.brainly(
                                    result.question,
                                    result.answer
                                ),
                                message.id
                            );
                        });
                    } else {
                        client.reply(message.from, 'Maaf hasil tidak dapat ditemukan', message.id);
                    }
                });
            });
    },
    wikipedia: function(client, message, params) {
        axios.get(`${link}/api/wiki?q=${params}`).then((res) => {
            client.reply(message.from, res.data.result.replace('\n\nby: ArugaZ', ''), message.id);
        });
    },
    gachaWaifu: function(client, message) {
        axios.get(`${link}/api/waifu`).then((res) => {
            client.sendFileFromUrl(message.from, res.data.image, '', `Char name : ${res.data.name}`, message.id);
        });
    },
    lyric: async function(client, message, params) {
        client.reply(message.from, messages.loading, message.id).then(async () => {
            axios.get(`${link}/api/lirik?judul=${params}`).then((res) => {
                client.reply(message.from, res.data.result, message.id)
            }).catch((error) => {
                client.reply(message.from, messages.error, message.id);
            });
        })
    },
    translate: async function(client, message, params) {
        const lang = params.slice(0, 2);
        const text = params.slice(3);

        client.reply(message.from, messages.loading, message.id).then(async () => {
            translate(text, lang).then((result) => {
                client.reply(message.from, result, message.id);
            }).catch((err) => {
                client.reply(message.from, 'Kode bahasa salah atau server bermasalah', message.id);
            })
        });
    },
    ytMp3: async function(client, message, params) {
        client.reply(message.from, messages.loading, message.id).then(async () => {
            const result = await yt(params, 'lowestaudio');

            if (result.includes('https:')) {
                client.sendFileFromUrl(message.from, result, 'music.mp3', '', message.id);
            } else {
                client.reply(message.from, result, message.id);
            }
        });
    },
    ytMp4: async function(client, message, params) {
        const isValidVideo = ytdl.validateURL(params);

        if (isValidVideo) {
            client.reply(message.from, messages.loading, message.id).then(async () => {
                axios.get(`${link}/media/ytvideo?url=${params}`).then((res) => {
                    client.sendFileFromUrl(message.from, res.data.result.dl_link, 'video.mp4', '', message.id);
                }).catch((err) => {
                    client.reply(message.from, 'Server eror', message.id);
                });
            });
        } else {
            resolve('Link tidak valid atau video tidak tersedia');
        }
    },
    lang: function(client, message) {
        client.reply(message.from, messages.lang, message.id);
    },
    totalChat: async function(client, message) {
        let totalChats = await client.getAllChatIds();
        let groupChats = await client.getAllGroups();
        let pc = totalChats.length - groupChats.length;
        let gc = groupChats.length;

        client.reply(message.from, stringMaker.totalChat(pc, gc), message.id);
    },
    updateLeaderboard: async function(client, message, params) {
        let leaderboard = {
            text: `${params}`
        }

        let data = JSON.stringify(leaderboard);

        fs.writeFileSync('leaderboard.json', data);

        client.reply(message.from, 'Sukses mengupdate leaderboard', message.id);
    },
    leaderboard: function(client, message) {
        fs.readFile('leaderboard.json', (err, data) => {
            if (err) client.reply(message.from, 'Ada yang eror', message.id);
            let leaderboard = JSON.parse(data);
            
            client.reply(message.from, stringMaker.leaderboard(leaderboard.text), message.id);
        });
    },
    ytSearch: async function(client, message, params) {
        axios.get(`${link}/media/ytsearch?query=${params}`).then((res) => {
            if (res.data.result.length > 0) {
                client.reply(message.from, stringMaker.ytSearch(res.data.result), message.id);
            } else {
                client.reply(message.from, 'Tidak dapat menemukan hasil pencarian', message.id);
            }
        }).catch((err) => {
            client.reply(message.from, 'Server bermasalah', message.id);
        });
    }
    // unsend: function(client, message) {
    //     client.deleteMessage(message.from, )
    // }
};
