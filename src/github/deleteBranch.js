const axios = require('axios');
const { github } = require('../config');

module.exports = ({ owner = github.owner, repository, branch }) => {
  const url = `${github.endpoint}/repos/${owner}/${repository}/git/refs/heads/${branch}`;

  const headers = {
    Authorization: `Bearer ${github.token}`,
  };

  return axios.delete(url, {
    headers,
  });
};
