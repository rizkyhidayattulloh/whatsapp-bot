module.exports = [
    // { keyword: 'test', private: true,
    // group: true, callback: 'test', params: false },
    {
        keyword: ['everyone', 'tagall', 'tegal'],
        private: false,
        group: true,
        params: false,
        callback: 'everyone',
        ownerOnly: false,
    },
    {
        keyword: 'owner',
        private: true,
        group: true,
        params: false,
        callback: 'owner',
        ownerOnly: false,
    },
    {
        keyword: ['sticker', 'stiker'],
        private: true,
        group: true,
        params: false,
        callback: 'sticker',
        ownerOnly: false
    },
    {
        keyword: 'stickerlow',
        private: true,
        group: true,
        params: false,
        callback: 'stickerLow',
        ownerOnly: false
    },
    {
        keyword: ['menu', 'list'],
        private: true,
        group: true,
        params: false,
        callback: 'menu',
        ownerOnly: false
    },
    {
        keyword: ['leave', 'bye'],
        private: false,
        group: true,
        params: false,
        callback: 'leave',
        ownerOnly: false
    },
    {
        keyword: 'write',
        private: true,
        group: true,
        params: true,
        callback: 'write',
        ownerOnly: false
    },
    {
        keyword: 'convertpdf',
        private: true,
        group: true,
        params: false,
        callback: 'convertPdf',
        ownerOnly: false
    },
    {
        keyword: 'join',
        private: true,
        group: true,
        params: true,
        callback: 'joinGroup',
        ownerOnly: false
    },
    {
        keyword: ['reportbug', 'report', 'bug'],
        private: true,
        group: false,
        params: true,
        callback: 'report',
        ownerOnly: false
    },
    {
        keyword: ['requestfeature', 'newfeature', 'suggestion'],
        private: true,
        group: false,
        params: true,
        callback: 'requestFeature',
        ownerOnly: false
    },
    {
        keyword: 'help',
        private: true,
        group: true,
        params: false,
        callback: 'help',
        ownerOnly: false
    },
    {
        keyword: 'donate',
        private: true,
        group: true,
        params: false,
        callback: 'donate',
        ownerOnly: false
    },
    {
        keyword: ['stickergif', 'stikergif'],
        private: true,
        group: true,
        params: false,
        callback: 'stickerGif',
        ownerOnly: false
    },
    {
        keyword: ['info', 'ingfo', 'schedule', 'jadwal'],
        private: true,
        group: true,
        params: false,
        callback: 'schedule',
        ownerOnly: false
    },
    {
        keyword: 'brainly',
        private: true,
        group: true,
        params: true,
        callback: 'brainly',
        ownerOnly: true
    },
    {
        keyword: ['wiki', 'wikipedia'],
        private: true,
        group: true,
        params: true,
        callback: 'wikipedia',
        ownerOnly: false
    },
    {
        keyword: ['broadcast', 'bc'],
        private: true,
        group: true,
        params: true,
        callback: 'broadcast',
        ownerOnly: true
    },
    {
        keyword: 'broadcastall',
        private: true,
        group: true,
        params: true,
        callback: 'broadcastAll',
        ownerOnly: true
    },
    {
        keyword: 'sendto',
        private: true,
        group: true,
        params: true,
        callback: 'sendTo',
        ownerOnly: true
    },
    // {
    //     keyword: 'translate',
    //     private: true,
    //     params: true,
    //     callback: 'translate',
    // },
];
