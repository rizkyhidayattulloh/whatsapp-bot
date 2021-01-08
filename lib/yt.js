const fs = require('fs');
const ytdl = require('ytdl-core');

module.exports = (url) => 
    new Promise(async (resolve, rejects) => {
        const isValidVideo = ytdl.validateURL(url);
            const maxDuration  = 600000; // 10 mnt
    
            if (isValidVideo) {
                const info = await ytdl.getInfo(url);
                const format = ytdl.chooseFormat(info.formats, { quality: 'lowestaudio' });
                const videoId = ytdl.getURLVideoID(url);
                const fileName = videoId + '.mp3';
                const path = './tmp-file/';
    
                if (format.approxDurationMs < maxDuration) {
                    if (!fs.existsSync(path + fileName)) {
                        ytdl(url, { quality: 'lowestaudio' })
                            .pipe(fs.createWriteStream(path + fileName)).on('finish', () => {
                                resolve(path + fileName);
                            });
                    } else {
                        resolve(path + fileName);
                    }
                } else {
                    resolve('Durasi maksimal 10 menit');
                }
            } else {
                resolve('Link tidak valid atau video tidak tersedia');
            }
    });
