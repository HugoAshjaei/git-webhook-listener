const {
    join
} = require("path");
const en = require("../helper/language/en.json"),
    fs = require("fs"),
    _ = require("lodash"),
    {
        exec
    } = require("child_process");

const check = async (provider, repository, branch) => {
    try {
        // check provider folder exists
        const providerFolder = `${__dirname}/../repositories/${provider}`;
        if (!fs.existsSync(providerFolder)) {
            const error = new Error(en.notFound);
            error.status = 404;
            throw error;
        }
        // check repository json file exists
        const repositoryFile = `${providerFolder}/${repository}.${branch}.json`;
        if (!fs.existsSync(repositoryFile)) {
            const error = new Error(en.notFound);
            error.status = 404;
            throw error;
        }
        // read repository json file
        const repositoryJson = JSON.parse(fs.readFileSync(repositoryFile));
        // check repository json file has script
        if (!repositoryJson.script) {
            const error = new Error(en.notFound);
            error.status = 404;
            throw error;
        }
        return {
            script: repositoryJson.script,
        };
    } catch (error) {
        const err = new Error(error.message || en.emailOrPasswordIncorrect);
        err.status = error.status || 404;
        throw err;
    }
};

const deploy = async (shell, provider, repository, branch, ssh_url) => {
    try {
        let {
            script
        } = shell;
        // join script array to string
        script = script.join(" && ");

        // check clone folder exists
        const cloneFolder = `${__dirname}/../clone`;
        if (!fs.existsSync(cloneFolder)) {
            fs.mkdirSync(cloneFolder);
        }
        // check provider folder exists
        const providerFolder = `${cloneFolder}/${provider}`;
        if (!fs.existsSync(providerFolder)) {
            fs.mkdirSync(providerFolder);
        }
        // clone repository from ssh_url
        const cloneCommand = `git clone ${ssh_url} ${providerFolder}/${repository}`;
        exec(cloneCommand, (error, stdout, stderr) => {
            if (error) {
                const err = new Error(error.message || en.scriptProcessFailed);
                err.status = 400;
                throw err;
            }
            // cd to clone folder
            const cdCommand = `cd ${providerFolder}/${repository}`;
            script = `${cdCommand} && git checkout ${branch} && ${script}`;
            exec(script, (error, stdout, stderr) => {
                if (error) {
                    const err = new Error(error.message || en.scriptProcessFailed);
                    err.status = 400;
                    throw err;
                }
                console.log(stdout);
                // remove repository folder
                const removeCommand = `rm -rf ${providerFolder}/${repository}`;
                exec(removeCommand, (error, stdout, stderr) => {
                    if (error) {
                        const err = new Error(error.message || en.scriptProcessFailed);
                        err.status = 400;
                        throw err;
                    }
                });
            });
        });

    } catch (error) {
        const err = new Error(error.message || en.emailOrPasswordIncorrect);
        err.status = error.status || 404;
        throw err;
    }
};


module.exports = {
    check,
    deploy
};