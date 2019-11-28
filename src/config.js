const path = require('path');
require('dotenv').config({
  path: path.join(process.cwd(), `${process.env.NODE_ENV === 'test' ? 'test' : ''}.env`),
});

const {
  GITHUB_ENDPOINT = 'https://api.github.com',
  GITHUB_TOKEN,
  GITHUB_OWNER,
  GITHUB_EXCLUDE,
  SLACK_ENDPOINT = 'https://slack.com/api',
  SLACK_TOKEN,
  SLACK_SIGNING_SECRET,
} = process.env;

module.exports = {
  github: {
    endpoint: GITHUB_ENDPOINT,
    token: GITHUB_TOKEN,
    owner: GITHUB_OWNER,
    exclude: GITHUB_EXCLUDE ? GITHUB_EXCLUDE.trim().split(',') : [],
  },
  slack: {
    endpoint: SLACK_ENDPOINT,
    token: SLACK_TOKEN,
    signingSecret: SLACK_SIGNING_SECRET,
  },
};
