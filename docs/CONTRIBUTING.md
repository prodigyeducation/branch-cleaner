## How to Contribute

### Fixing Minor Bugs

We're more than happy with PRs that fix typos, syntax errors, and types. You do not have to create an issue or request a fix to these.

### Adding New Features / Modifying Existing Features

Before making any large changes to Branch Cleaner, please create an issue to discuss the change or a draft PR. 
Our aim is to keep this project simple to use without too much configuration.
We also deeply value design so any new feature must pass our design review.

### Setting Up Locally

We use [npm](https://www.npmjs.com/) as the package manager for the project.

First off, clone the repository and install the dependencies.

```sh
$ git clone https://github.com/prodigyeducation/branch-cleaner
$ cd branch-cleaner
$ npm install
```

Then, you can run the project locally.

```sh
$ npm start
```

We use [Jest](https://jestjs.io/) for unit testing and you can also run the tests locally.

```sh
$ npm test
```