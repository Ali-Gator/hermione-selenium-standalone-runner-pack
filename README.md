# Hermione selenium standalone runner

This package has been created to automatic run [selenium-standalone](https://www.npmjs.com/package/selenium-standalone) package of [Hermione](https://github.com/gemini-testing/hermione) testing.

And include simple module:

```
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
```
