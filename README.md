# 13|37 Node.JS Back-End assignment

## Table of contents

* [Summary](#summary)
* [Installation and Running](#installation-and-running)
* [Testing](#testing)
* [Using](#using)
* [How it works](#how-it-works)
* [Other points](#other-points)

## Summary
My interview assignment (available in [this](https://backend-assignment.1337co.de/) link) was about handling details of company coworkers.
That included two parts:
 - Crawling
 - API end-point

##### Tech
 - Javascript
 - Node.JS
 - Express
 - axios and cheerio (crawling)
 - Joi (validation)
 - morgan (logging)
 - Jest and SuperTest (Testing)
##### Usefull links
 - [Hosted demo](https://1337.hossein.link)
 - [Postman api documentation](https://github.com/HosseinDotLink/1337-test/blob/main/1337-test.postman_collection.json)

## Installation and Running

It requires [Node.js](https://nodejs.org/) v14+ to run.

Clone from git repository.
```sh
git clone https://github.com/hosseinDotLink/1337-test
cd 1337-test
```
After cloning It's time to make our .env file and editing it (Just set the server port).
```sh
cp .env.example .env
```
Install the dependencies and devDependencies and start the server.
```sh
npm i
npm start
```

## Testing

If you want to run tests, run the `npm test` command after installation.

> Note 1: Tests are written with `Jest` and `supertest`.

##### Why Jest?
 - Easy to use (low complixity)
 - Fast

##### Why supertest?
 - Sending request to our router endpoints.

## Using

> Note 2: Before starting this section, You can install [postman](https://www.postman.com/) and use [this](https://github.com/HosseinDotLink/1337-test/blob/main/1337-test.postman_collection.json) postman document to skip this part.

> Note 3: You can replace `https://1337.hossein.link` with `http[s]://YOUR_LINK`.

 ###### Crawlers list
 [GET - https://1337.hossein.link/api/crawlers](https://1337.hossein.link/api/crawlers)
 ###### List with paginate 
 [GET - https://1337.hossein.link/api/crawlers?start=0&end=20](https://1337.hossein.link/api/crawlers?start=0&end=20) (End must be greater than start and both of them must be greater than 0)
  ###### Basic filtering 
  [GET - https://1337.hossein.link/api/crawlers?filter=ma(.*)us](https://1337.hossein.link/api/crawlers?filter=ma(.*)us) (Filter can be string or regex)
  ###### Crawler by id 
  [GET - https://1337.hossein.link/api/crawler/:id](https://1337.hossein.link/api/crawler/0)
  ###### Update crawler 
  [POST - https://1337.hossein.link/api/crawler]()
body: 
```json
 {
    "id":1,
    "name": "firstname lastname",
    "city": "city name",
    "text": "<p>This is new text</p>"
}
```

## How it works

At the beginning of starting the server, an initial script checks that data exist in memory or not. Crawling will begin if there is no coworker detail.

#### crawling process

`Cheerio` was used to extract information from the [page](https://tretton37.com/meet) after downloading it.
For every coworker div, there is a `ninja-summary` class. After that, I got the name, city, country, and imageFullUrl from this class and the text and imagePortraitUrl from the own profile page.
Now it's time to store coworkers' details in the global variable.

## Other points

In the end, I implemented 9 of the 13 points because I did not have enough time to cover them all in high quality. Also, it has been mentioned, "Make sure that you get at least 6 points, and at most 9 points.", but I got other points in other projects (some of them can be found on [github](https://github.com/hosseinDotLink)) and we can discuss them in the next part of the interview.