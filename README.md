<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Table of contents
* [Description](#description)
* [Installation](#installation)
* [Setup](#setup)
* [Database](#database)
* [Running the app](#running-the-app)
* [Test](#test)
* [Support](#support)
* [License](#license)

## Description

letstalk-backend is a backend for a reddit style SPA website. It's a personal hobby project of mine.
The project uses Nest framework with TypeScript. It also uses TypeORM for Object Relational Mapping and has only been tested on MySQL and MariaDB with InnoDB engine. The frontend is in another repository: [Frontend](https://github.com/Reldin/lets-talk).

## Installation

```bash
$ npm install
```

## Setup

It requires a ".env.stage.dev" file for the npm run start:dev script with the following keys:
DB_HOST=
DB_PORT=
DB_USERNAME=
DB_Password=
DB_DATABASE=
SECRET=

If the configService does not work for you. You can hard code it to use the basic .env file in the app.module files "envFilePath". Then you have to start it with npm run start.

The project by default uses the port 3001 and can be changed at the main.ts file. The frontend uses port 3000 by default.

## Database

The project uses mysql and I have personally only tested with MariaDB for the schemas.

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

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

Nest is [MIT licensed](LICENSE).
