const brainly = require('brainly-scraper');

module.exports = BrainlySearch = (pertanyaan, cb) => {
    brainly(pertanyaan, 5)
        .then((res) => {
            console.log(res);
            let brainlyResult = [];
            res.data.forEach((ask) => {
                let opt = {
                    pertanyaan: ask.pertanyaan,
                    fotoPertanyaan: ask.questionMedia,
                };
                ask.jawaban.forEach((answer) => {
                    opt.jawaban = {
                        judulJawaban: answer.text,
                        fotoJawaban: answer.media,
                    };
                });
                brainlyResult.push(opt);
            });
            return brainlyResult;
        })
        .then((x) => {
            cb(x);
        })
        .catch((err) => {
            // console.log(err.error);
        });
};
