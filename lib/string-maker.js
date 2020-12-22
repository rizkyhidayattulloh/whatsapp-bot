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

Hari selain selasa & jum'at
09.00 - 20.00 (WITA)

Selasa & Jum'at
09.00 - 12.00 (WITA)

Sabtu & Minggu Bot off
        
Jika owner ada urusan mendadak dan bot harus dimatikan saat jam operasional, maka akan di broadcast oleh owner thx`
    },
    brainly: (question, answer, link = null) => {
        let messages = `Pertanyaan : 
${question}

Jawaban :
${answer}`;
        if (link != null) {
            messages += `

Link foto jawaban :
${link}`
        }

        return messages;
    }
}