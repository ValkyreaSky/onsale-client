<div align="center">
  <a href="https://github.com/appalaszynski/selli-client">
    <img src="https://user-images.githubusercontent.com/35331661/46529981-a1352900-c898-11e8-8172-3fee856f3351.png" height="125px">
  </a>
  <h1>Selli Client</h1>
  <p>
    <em>Selli API Client Built with React</em>
  </p>
  <p>
    <a href="https://github.com/appalaszynski/selli-client/blob/master/LICENSE">
      <img src="https://img.shields.io/github/license/appalaszynski/selli-client.svg" alt="License" />
    </a>
    <a href="https://travis-ci.org/appalaszynski/selli-client">
      <img src="https://travis-ci.org/appalaszynski/selli-client.svg?branch=master" alt="Build Status" />
    </a>
    <a href="https://coveralls.io/github/appalaszynski/selli-client">
      <img src="https://coveralls.io/repos/github/appalaszynski/selli-client/badge.svg?branch=master" alt="Coverage Status" />
    </a>
  </p>
  <br>
</div>

**Selli** is an application for free worldwide classifieds ads where you can buy and sell items, cars, properties, and find or offer jobs in your area. **Selli** is a kind of summary of my knowledge - basically, I want to include there everything that I've learned about creating a web application (including Git workflow).

This repository contains **Selli** API client built with [React](https://reactjs.org/) using packages such as [Redux](https://redux.js.org/), [React Router](https://github.com/ReactTraining/react-router), [Redux Form](https://redux-form.com/), [Moment.js](https://momentjs.com/), [styled-components](https://github.com/styled-components/styled-components) and [Ant Design](https://github.com/ant-design/ant-design). Application is hosted on [Heroku](https://www.heroku.com/). Tests are written using [Jest](https://jestjs.io/) and [Enzyme](https://airbnb.io/enzyme/docs/api/). Project was bootstrapped with my [React Redux Boilerplate](https://github.com/appalaszynski/react-redux-boilerplate).

**Selli** RESTful API built with [Node.js](https://nodejs.org/) is available [here](https://github.com/appalaszynski/selli-api).

---

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

---

## Installation

Clone the repo and install dependencies.

```bash
$ git clone https://github.com/appalaszynski/selli-client.git
$ cd selli-client
$ npm install
```

---

## Usage

### Running Development Server

```bash
$ npm run dev
```

This command runs [Webpack DevServer](https://webpack.js.org/configuration/dev-server/) - tool that will automatically detect file changes and hot reload application (or simply refresh the entire application when hot reload is not available e.g. on HTML file change).

### Running Tests

```bash
$ npm test
```

This command runs Jest with configuration located in `/jest.config.js` file. Each component test file is located in the same directory as the component.

### Deploying Locally

```bash
$ npm run build
```

This command runs Webpack in `production` mode - generated application will be saved in `/dist` directory. To run [Express](https://expressjs.com/) server (which serve application from `/dist` directory) use `npm start`.

### Deploying on Heroku

First, you have to install [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli).

```bash
$ heroku login # Login to your Heroku account
$ cd selli-client
$ git init # Initialize a Git repository (ignore if already exists)
$ heroku git:remote -a your-heroku-app-name # Add remote Git repository
$ git push heroku master
```

---

## Contributing

All contributions and suggestions are welcome! For suggested improvements, please create an [issue](https://github.com/appalaszynski/selli-client/issues). For direct contributions, please [fork](https://github.com/appalaszynski/selli-client/fork) the repository, create your feature branch, commit your changes, push commits to the branch and create a new [pull request](https://github.com/appalaszynski/selli-client/pulls).

---

## License

The code is open source and available under the [MIT License](https://github.com/appalaszynski/selli-client/blob/master/LICENSE).
