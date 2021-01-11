const fs = require('fs');
const ytdl = require('ytdl-core');

module.exports = (url, quality) => 
    new Promise(async (resolve, rejects) => {
        const isValidVideo = ytdl.validateURL(url);
            const maxDuration  = 600000; // 10 mnt
    
            if (isValidVideo) {
                const info = await ytdl.getInfo(url);
                const format = ytdl.chooseFormat(info.formats, { quality: quality });
    
                if (format.approxDurationMs < maxDuration) {
                    resolve(format.url);
                } else {
                    resolve('Durasi maksimal 10 menit');
                }
            } else {
                resolve('Link tidak valid atau video tidak tersedia');
            }
    });
