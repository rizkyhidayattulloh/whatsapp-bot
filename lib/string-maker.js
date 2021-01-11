module.exports = {
    broadcast: (content) => {
        return `*<---Pemberitahuan--->*

${content}`;
    },
    report: (message, content) => {
        return `*<---Bug Report--->*

Sender : ${message.sender.id.replace('@c.us', '')}
Content : 
${content}`
    },
    requestFeature: (message, content) => {
        return `*<---Feature Request--->*

Sender : ${message.sender.id.replace('@c.us', '')}
Content : 
${content}`
    },
    sendTo: (content) => {
        return `*<---Respond owner--->*

Pesan :
${content}`
    },
    schedule: () => {
        return `*<---Schedule--->*
        
Bot on setiap hari, namun jika ada suatu kendala dan bot harus dimatikan akan di broadcast oleh owner`
    },
    brainly: (question, answer, link = null) => {
        let messages = `Pertanyaan : 
${question.replace('\\n', '\n')}

Jawaban :
${answer.replace('\\n', '\n')}`;
        if (link != null) {
            messages += `

Link foto jawaban :
${link}`
        }

        return messages;
    },
    totalChat: (pc, gc) => {
        return `<--- Total Chat --->

Personal chat : ${pc}
Group chat : ${gc}`
    },
    leaderboard: (text) => {
        return `<---Leaderboard--->

Berikut merupakan leaderboard donasi :
${text}

Leaderboard di reset setiap bulan, dan jika ingin donasi ketik *!donate* untuk melihat menu donasi ^^`
    }
}