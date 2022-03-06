# Git webhook listener

## Table of contents

- [Git webhook listener](#git-webhook-listener)
  - [Table of contents](#table-of-contents)
  - [Summary](#summary)
        - [Tech](#tech)
  - [Installation and Running](#installation-and-running)
        - [Step 1](#step-1)
        - [Step 2](#step-2)
        - [Step 3](#step-3)
  - [How it works](#how-it-works)
  - [TODO](#todo)

## Summary
If you want to run a shell script on a git push, you can use this repository.

##### Tech
 - Javascript
 - Node.JS
 - Express
 - morgan (logging)

## Installation and Running

##### Step 1
It requires [Node.js](https://nodejs.org/) v14+ to run.

Clone from git repository.
```sh
git clone https://github.com/hosseinDotLink/git-webhook-listener
cd git-webhook-listener
```
After cloning It's time to make our .env file and editing it (Just set the server port and secret key).
```sh
cp .env.example .env
```
Install the dependencies and devDependencies and start the server.
```sh
npm i
npm start
```
##### Step 2

> Note: Add your secret ssh key to your git repository.
configure webhook url in Git repository setting.

login to your git provider account
goto your repository settings and add webhook url.
set Payload URL to where application is listening : `http(s)://(domain|ip:port)/api/webhook/(provider for example github)/(repository name)`
set Content type to application/json.
disable SSL verification if app is not behind a reverse proxy with ssl support.
set Events to Just the push event.
click Add webhook

##### Step 3
Now you should add your script to the `repositories` directory.
Create a directory named your git provider for example github (If not exists).
Then create a file named `(your repository).(branch name).json` and use the following template.
`my-website-front-end.main.json`
```json
{
  "name": "your script name",
  "script": [
    "echo 'Deploying to my-website-front-end...'",
    "yarn install",
    "CI=false yarn run build",
    "echo 'Build successful'",
    "echo 'Deploying to my VPS...'",
    "ssh user@ip 'sudo rm -rf /home/user/deploy/'",
    "ssh user@ip 'sudo mkdir -p /home/user/deploy/'",
    "scp -r build/* user@ip:/home/user/deploy/",
    "ssh user@ip 'sudo rm -rf /var/www/my-website-directory/*'",
    "ssh user@ip 'sudo mv /home/user/deploy/* /var/www/my-website-directory/'",
    "echo 'Deploy successful'"
  ]
}```

> Note: If you want to deploy in another server by ssh you should run below commands in your server terminal.
```sh
sudo apt-get update -qq
sudo apt-get install -qq git
"which ssh-agent || ( apt-get install -qq openssh-client )"
eval "$(ssh-agent -s)"
ssh-add <(echo "Your ssh private key")
mkdir -p ~/.ssh
echo "Host *" > ~/.ssh/config
echo "  StrictHostKeyChecking no" >> ~/.ssh/config
echo "  UserKnownHostsFile=/dev/null" >> ~/.ssh/config
ssh-keyscan -H ip >> ~/.ssh/known_hosts
```
## How it works

After you have configured your webhook, your application will receive a POST request with the payload of the push event.
Application will run the script in the `repositories/(provider)/(repository).(branch).json`.


## TODO
- [x] Github
- [x] Gitlab
- [ ] Bitbucket
- [ ] Updating readme
- [ ] Testing
- [ ] Applyiing test webhook from provider
