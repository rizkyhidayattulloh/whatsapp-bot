module.exports = [
    {
        keyword: ['everyone', 'tagall', 'tegal'],
        private: false,
        group: true,
        params: false,
        callback: 'everyone',
        ownerOnly: false,
        active: true
    },
    {
        keyword: 'owner',
        private: true,
        group: true,
        params: false,
        callback: 'owner',
        ownerOnly: false,
        active: true
    },
    {
        keyword: ['sticker', 'stiker'],
        private: true,
        group: true,
        params: false,
        callback: 'sticker',
        ownerOnly: false,
        active: true
    },
    {
        keyword: 'stickerlow',
        private: true,
        group: true,
        params: false,
        callback: 'stickerLow',
        ownerOnly: false,
        active: true
    },
    {
        keyword: ['menu', 'list'],
        private: true,
        group: true,
        params: false,
        callback: 'menu',
        ownerOnly: false,
        active: true
    },
    {
        keyword: ['leave', 'bye'],
        private: false,
        group: true,
        params: false,
        callback: 'leave',
        ownerOnly: false,
        active: true
    },
    {
        keyword: 'write',
        private: true,
        group: true,
        params: true,
        callback: 'write',
        ownerOnly: false,
        active: false
    },
    {
        keyword: 'convertpdf',
        private: true,
        group: true,
        params: false,
        callback: 'convertPdf',
        ownerOnly: false,
        active: true
    },
    {
        keyword: 'join',
        private: true,
        group: true,
        params: true,
        callback: 'joinGroup',
        ownerOnly: false,
        active: true
    },
    {
        keyword: ['reportbug', 'report', 'bug'],
        private: true,
        group: false,
        params: true,
        callback: 'report',
        ownerOnly: false,
        active: true
    },
    {
        keyword: ['requestfeature', 'newfeature', 'suggestion'],
        private: true,
        group: false,
        params: true,
        callback: 'requestFeature',
        ownerOnly: false,
        active: true
    },
    {
        keyword: 'help',
        private: true,
        group: true,
        params: false,
        callback: 'help',
        ownerOnly: false,
        active: true
    },
    {
        keyword: 'donate',
        private: true,
        group: true,
        params: false,
        callback: 'donate',
        ownerOnly: false,
        active: true
    },
    {
        keyword: 'ytmp3',
        private: true,
        group: true,
        params: true,
        callback: 'ytMp3',
        ownerOnly: false,
        active: true
    },
    {
        keyword: 'ytmp4',
        private: true,
        group: true,
        params: true,
        callback: 'ytMp4',
        ownerOnly: false,
        active: true
    },
    {
        keyword: ['stickergif', 'stikergif'],
        private: true,
        group: true,
        params: false,
        callback: 'stickerGif',
        ownerOnly: false,
        active: true
    },
    {
        keyword: ['info', 'ingfo', 'schedule', 'jadwal'],
        private: true,
        group: true,
        params: false,
        callback: 'schedule',
        ownerOnly: false,
        active: true
    },
    {
        keyword: 'brainly',
        private: true,
        group: true,
        params: true,
        callback: 'brainly',
        ownerOnly: false,
        active: false
    },
    {
        keyword: ['gachawaifu', 'waifu'],
        private: true,
        group: true,
        params: false,
        callback: 'gachaWaifu',
        ownerOnly: false,
        active: false
    },
    {
        keyword: ['wiki', 'wikipedia'],
        private: true,
        group: true,
        params: true,
        callback: 'wikipedia',
        ownerOnly: false,
        active: false
    },
    {
        keyword: ['lirik', 'lyric'],
        private: true,
        group: true,
        params: true,
        callback: 'lyric',
        ownerOnly: false,
        active: false
    },
    {
        keyword: ['translate', 'tl'],
        private: true,
        group: true,
        params: true,
        callback: 'translate',
        ownerOnly: false,
        active: true
    },
    {
        keyword: 'lang',
        private: true,
        group: true,
        params: false,
        callback: 'lang',
        ownerOnly: false,
        active: true
    },
    {
        keyword: 'ytsearch',
        private: true,
        group: true,
        params: true,
        callback: 'ytSearch',
        ownerOnly: false,
        active: true
    },
    {
        keyword: 'leaderboard',
        private: true,
        group: true,
        params: false,
        callback: 'leaderboard',
        ownerOnly: false,
        active: true
    },
    {
        keyword: ['broadcast', 'bc'],
        private: true,
        group: true,
        params: true,
        callback: 'broadcast',
        ownerOnly: true,
        active: true
    },
    {
        keyword: ['updateleaderboard', 'ul'],
        private: true,
        group: true,
        params: true,
        callback: 'updateLeaderboard',
        ownerOnly: true,
        active: true
    },
    {
        keyword: 'broadcastall',
        private: true,
        group: true,
        params: true,
        callback: 'broadcastAll',
        ownerOnly: true,
        active: true
    },
    {
        keyword: 'sendto',
        private: true,
        group: true,
        params: true,
        callback: 'sendTo',
        ownerOnly: true,
        active: true
    },
    {
        keyword: ['totalchat', 'tc'],
        private: true,
        group: true,
        params: false,
        callback: 'totalChat',
        ownerOnly: true,
        active: true
    },
];
