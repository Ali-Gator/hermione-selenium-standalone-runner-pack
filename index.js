const { spawn } = require('child_process');
const fs = require('fs');
const { delay } = require('rxjs');

module.exports = (hermione) => {
    let selenuim;

    hermione.on(hermione.events.RUNNER_START, async () => {
        const file = fs.openSync('selenuim-log', 'w');

        selenuim = spawn('selenium-standalone', ['start'], {
            stdio: ['ignore', file, file],
            shell: true
        });

        await delay(2000);
    });

    hermione.on(hermione.events.RUNNER_END, () => {
        return new Promise((resolve) => {
            selenuim.on('exit', () => resolve());

            selenuim.kill();
        })
    })
};
