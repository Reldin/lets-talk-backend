## Table of contents
* [Description](#description)
* [Installation](#installation)
* [Setup](#setup)
* [Database](#database)
* [Running the app](#running-the-app)
* [Test](#test)

## Description

letstalk-backend is a backend for a reddit style SPA website. It's a personal hobby project of mine.
The project uses Nest framework with TypeScript. It also uses TypeORM for Object-Relational Mapping. The frontend is in another repository:  [lets-talk](https://github.com/Reldin/lets-talk).

## Installation

```bash
$ npm install
```

## Setup

The project requires an ".env.stage.dev" file for the "npm run start:dev" script with the following keys:
<ul>
<li>DB_HOST=</li>
<li>DB_PORT=</li>
<li>DB_USERNAME=</li>
<li>DB_Password=</li>
<li>DB_DATABASE=</li>
<li>SECRET=</li>
</ul>

If the configService does not work on your machine. It can be hard coded to use a basic ".env" file by modifying the app.module.ts file and changing the value of "envFilePath:". Then it has to be started with "npm run start" script.

The project by default uses the port 3001 and can be changed at the main.ts file. The frontend uses port 3000 by default.

## Database

The project uses MariaDB. Other databases can be used by modifying the app.module.ts file and installing the necessary packages, but I can't quarantee that they will work out of the box. 

Google docs link below for more information about the database:  
[Database Schemas and SQL script content](https://docs.google.com/document/d/11Ak0kc4MBJfJN8vVazWv--X42oSTY8Km5mqAA_62m8U)

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
