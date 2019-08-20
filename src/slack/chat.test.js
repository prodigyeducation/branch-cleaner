const { postMessage, update } = require('./chat');
const axios = require('axios');

jest.mock('axios');

describe('chat', () => {
    const channel = 'CK2853T7S';
    const type = 'plain_text';
    let text = 'This is a plain text message.';
    const blocks = [
        {
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: `This is a *mark down* message.`
            }
        }
    ];

    afterEach(() => {
        axios.post.mockClear();
    });

    test('postMessage() calls Slack API', async () => {
        // when
        await postMessage({ channel, type, text, blocks });

        // then
        expect(axios.post).toBeCalledTimes(1);

        const [call] = axios.post.mock.calls;
        const [url, body, config] = call;

        expect(url).toMatch(/chat\.postMessage$/);
        expect(JSON.parse(body)).toEqual({ channel, type, text, blocks });
        expect(config.headers).toHaveProperty('Content-type', 'application/json; charset=utf-8');
        expect(config.headers).toHaveProperty('Authorization');
    });

    test('update() calls Slack API', async () => {
        // given
        const ts = '1550000000.001100';
        text = 'This is an updated message.';
        blocks[0].text.text = 'This is an *updated* message.';

        // when
        await update({ ts, channel, type, text, blocks });

        // then
        expect(axios.post).toBeCalledTimes(1);

        const [call] = axios.post.mock.calls;
        const [url, body, config] = call;

        expect(url).toMatch(/chat\.update$/);
        expect(JSON.parse(body)).toEqual({ ts, channel, type, text, blocks });
        expect(config.headers).toHaveProperty('Content-type', 'application/json; charset=utf-8');
        expect(config.headers).toHaveProperty('Authorization');
    });
});
