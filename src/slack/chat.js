import axios from 'axios';
import { slack } from '../config';

const headers = {
  'Content-type': 'application/json; charset=utf-8',
  Authorization: `Bearer ${slack.token}`,
};

export const postMessage = ({ channel, type, text, blocks }) => {
  const url = `${slack.endpoint}/chat.postMessage`;
  const body = JSON.stringify({
    channel,
    type,
    text,
    blocks,
  });
  return axios.post(url, body, { headers });
};

export const update = ({ ts, channel, type, text, blocks }) => {
  const url = `${slack.endpoint}/chat.update`;
  const body = JSON.stringify({
    ts,
    channel,
    type,
    text,
    blocks,
  });
  return axios.post(url, body, { headers });
};
