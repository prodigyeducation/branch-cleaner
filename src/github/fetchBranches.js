import axios from 'axios';
import { github } from '../config';

export default async ({ owner = github.owner, repository }) => {
  const url = `${github.endpoint}/graphql`;
  const query = `{
        repository(name: "${repository}", owner: "${owner}") {
          defaultBranchRef {
            defaultBranch: name
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
      defaultBranchRef: { defaultBranch },
      refs: { nodes },
    },
  } = response.data.data;

  return { nodes, defaultBranch };
};
