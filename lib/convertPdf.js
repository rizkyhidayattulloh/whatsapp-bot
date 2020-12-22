const { exec } = require('child_process');
const { resolve } = require('path');

module.exports = (fileName) =>
    new Promise((resolve, rejects) => {
        exec(
            `soffice --headless --convert-to pdf "./tmp-file/${fileName}" --outdir "./tmp-file"`,
            (error, stdout, stderr) => {
                if (error) {
                    console.log(`error: ${error.message}`);

                    resolve(false);
                }
                if (stderr) {
                    console.log(`stderr: ${stderr}`);

                    resolve(false);
                }

                resolve(true);
            }
        );
    });
