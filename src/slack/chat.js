const axios = require('axios');
const { slack } = require('../config');

const headers = {
    'Content-type': 'application/json; charset=utf-8',
    Authorization: `Bearer ${slack.token}`
};

exports.postMessage = ({ channel, type, text, blocks }) => {
    const url = `${slack.endpoint}/chat.postMessage`;
    const body = JSON.stringify({
        channel,
        type,
        text,
        blocks
    });
    return axios.post(url, body, { headers });
};

exports.update = ({ ts, channel, type, text, blocks }) => {
    const url = `${slack.endpoint}/chat.update`;
    const body = JSON.stringify({
        ts,
        channel,
        type,
        text,
        blocks
    });
    return axios.post(url, body, { headers });
};
