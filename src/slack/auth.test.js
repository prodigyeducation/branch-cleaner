const { isAuthorized } = require('./auth');

const testEvent = (timestampFail = false, signatureFail = false) => {
  return {
    path: '/.netlify/functions/slack',
    httpMethod: 'POST',
    queryStringParameters: {},
    headers:
     { host: 'f8aadd49.ngrok.io',
       'user-agent': 'Slackbot 1.0 (+https://api.slack.com/robots)',
       'accept-encoding': 'gzip,deflate',
       accept: 'application/json,*/*',
       'x-slack-signature': signatureFail ?
        'v0=610f70e946838d43f989e53086bc4b41a02a88ed50c0ac5328abc1ec48618a4d':
        'v0=96e18a14a4bf6ba5a6613695ab18898418453b0cb19075607848a384a981d7b5',
       'x-slack-request-timestamp': timestampFail ?
         '1574963968':
         '1574352073',
       'content-length': '2092',
       'content-type': 'application/x-www-form-urlencoded',
       'x-forwarded-proto': 'https',
       'x-forwarded-for': '54.210.143.156' },
    body:
     'payload=%7B%22type%22%3A%22block_actions%22%2C%22team%22%3A%7B%22id%22%3A%22T029VMQML%22%2C%22domain%22%3A%22prodigy%22%7D%2C%22user%22%3A%7B%22id%22%3A%22UC8E9Q9FX%22%2C%22username%22%3A%22christopher.richard%22%2C%22name%22%3A%22christopher.richard%22%2C%22team_id%22%3A%22T029VMQML%22%7D%2C%22api_app_id%22%3A%22AJV2RQNS2%22%2C%22token%22%3A%22jaxrnkRRAuFhUOAurn0bPjSU%22%2C%22container%22%3A%7B%22type%22%3A%22message%22%2C%22message_ts%22%3A%221574959393.005800%22%2C%22channel_id%22%3A%22GR4TFCB9D%22%2C%22is_ephemeral%22%3Afalse%7D%2C%22trigger_id%22%3A%22845210598289.2335738734.89ec735ad7b231214a99ccb7d4bf0a86%22%2C%22channel%22%3A%7B%22id%22%3A%22GR4TFCB9D%22%2C%22name%22%3A%22privategroup%22%7D%2C%22message%22%3A%7B%22type%22%3A%22message%22%2C%22subtype%22%3A%22bot_message%22%2C%22text%22%3A%22This+content+can%27t+be+displayed.%22%2C%22ts%22%3A%221574959393.005800%22%2C%22username%22%3A%22Branch+Cleaner%22%2C%22bot_id%22%3A%22BJSTA9JNL%22%2C%22blocks%22%3A%5B%7B%22type%22%3A%22section%22%2C%22block_id%22%3A%22tsEZ%22%2C%22text%22%3A%7B%22type%22%3A%22mrkdwn%22%2C%22text%22%3A%22%26gt%3B%2A%3Chttps%3A%5C%2F%5C%2Fgithub.com%5C%2FSMARTeacher%5C%2Fprodigy-hydra%5C%2Ftree%5C%2Fbenson%5C%2Fassign-later%7Cbenson%5C%2Fassign-later%3E%2A%5Cn%26gt%3B%3Aalarm_clock%3A+_2019-08-20_+%3Aed%3A+_Benson+Wong_%22%2C%22verbatim%22%3Afalse%7D%2C%22accessory%22%3A%7B%22type%22%3A%22button%22%2C%22text%22%3A%7B%22type%22%3A%22plain_text%22%2C%22text%22%3A%22Delete+%3Afire%3A%22%2C%22emoji%22%3Atrue%7D%2C%22value%22%3A%22prodigy-hydra%7Cbenson%5C%2Fassign-later%22%2C%22action_id%22%3A%22yrD%22%7D%7D%5D%7D%2C%22response_url%22%3A%22https%3A%5C%2F%5C%2Fhooks.slack.com%5C%2Factions%5C%2FT029VMQML%5C%2F852684098612%5C%2FDSvpzIvg9FQLfyMPXLUPsSHG%22%2C%22actions%22%3A%5B%7B%22action_id%22%3A%22yrD%22%2C%22block_id%22%3A%22tsEZ%22%2C%22text%22%3A%7B%22type%22%3A%22plain_text%22%2C%22text%22%3A%22Delete+%3Afire%3A%22%2C%22emoji%22%3Atrue%7D%2C%22value%22%3A%22prodigy-hydra%7Cbenson%5C%2Fassign-later%22%2C%22type%22%3A%22button%22%2C%22action_ts%22%3A%221574963968.344890%22%7D%5D%7D',
    isBase64Encoded: false
  };
};

describe('isAuthorized', () => {
  const realDate = Date;
  const testDate = new Date('2019-11-21T15:59:00.000Z');

  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();

    global.Date = class extends Date {
      constructor(...args) {
        return testDate;
      }
    };
  });

  afterEach(() => {
    global.Date = realDate;
  });

  it('Returns true on a valid request', () => {
    expect(isAuthorized(testEvent())).toBeTruthy();
  });

  it('Returns false status on invalid signature', () => {
    expect(isAuthorized(testEvent(signatureFail = true))).toBeFalsy();
  });

  it('Returns false on invalid timestamp', () => {
    expect(isAuthorized(testEvent(timestampFail = true))).toBeFalsy();
  });
});
