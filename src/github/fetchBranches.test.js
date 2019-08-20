const fetchBranches = require('./fetchBranches');
const axios = require('axios');

jest.mock('axios');

test('fetchBranches() calls Github API', async () => {
    // given
    const owner = 'TestOwner';
    const repository = 'test-repository';
    axios.post.mockResolvedValue({
        data: {
            data: {
                repository: {
                    refs: {
                        nodes: []
                    }
                }
            }
        }
    });

    // when
    await fetchBranches({ owner, repository });

    // then
    expect(axios.post).toBeCalledTimes(1);

    const [call] = axios.post.mock.calls;
    const [url, body, config] = call;

    expect(url).toMatch(/graphql$/);
    expect(JSON.parse(body)).toHaveProperty('query');
    expect(config.headers).toHaveProperty('Content-type', 'application/json; charset=utf-8');
    expect(config.headers).toHaveProperty('Authorization');
});
