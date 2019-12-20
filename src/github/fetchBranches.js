const axios = require('axios');
const { github } = require('../config');

module.exports = async ({ owner = github.owner, repository }) => {
  const url = `${github.endpoint}/graphql`;
  const query = `{
        repository(name: "${repository}", owner: "${owner}") {
          defaultBranchRef {
            name
          }
          refs(first: 100, refPrefix: "refs/heads/") {
            nodes {
              name
              target {
                ... on Commit {
                  committedDate
                  author {
                    user {
                        login
                        name
                        email
                    }
                  }
                }
              }
            }
          }
        }
      }`;
  const headers = {
    'Content-type': 'application/json; charset=utf-8',
    Authorization: `Bearer ${github.token}`,
  };

  const response = await axios.post(url, JSON.stringify({ query }), {
    headers,
  });

  const {
    repository: {
      defaultBranchRef: {
        name
      },
      refs: { nodes },
    },
  } = response.data.data;

  return { nodes, defaultBranch: name };
};
