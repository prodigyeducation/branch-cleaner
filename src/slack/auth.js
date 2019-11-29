const crypto = require('crypto');
const { slack } = require('../config');

const slackSigningSecret = slack.signingSecret;

const verifySignature = (sigBaseString, slackSignature) => {
  const baseSignature = `v0=${crypto.createHmac('sha256', slackSigningSecret)
      .update(sigBaseString, 'utf8')
      .digest('hex')}`;

  if (crypto.timingSafeEqual(
      Buffer.from(baseSignature, 'utf8'),
      Buffer.from(slackSignature, 'utf8')
  )) {
    return true;
  }
  return false;
};

const expirationDuration = 300;

const verifyTimestamp = (timestamp) => {
  const myTime = Math.floor(new Date().getTime()/1000);
  if (Math.abs(myTime - timestamp) > expirationDuration) {
    return false;
  }
  return true;
};

exports.isAuthorized = (event) => {
  const timestamp = event.headers['x-slack-request-timestamp'];
  const sigBaseString = `v0:${timestamp}:${event.body}`;
  const slackSignature = event.headers['x-slack-signature'];

  if (event.httpMethod !== 'POST') {
    return false;
  };

  return verifyTimestamp(timestamp) && verifySignature(sigBaseString, slackSignature);
};
