# How to use Branch Cleaner

## Setup

Branch Cleaner performs operations against [Github API](https://developer.github.com/v4) and [Slack API](https://api.slack.com) on behalf of your team.
Therefore, there is some preliminary work to be done on both platforms.

### Github 

An access token should be created with proper permissions so that Branch Cleaner can fetch all branches and delete certain branches on request.
This newly created token should be set for the `GITHUB_TOKEN` environment variable of Branch Cleaner.

For more information on how to create access tokens on Github, please refer to [the official documentation](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line).

### Slack

1. Add and install an app to your workspace

    An app should be added and installed to your workspace at [the Your Apps page](https://api.slack.com/apps) on Slack API.

2. Generate OAuth token

    Once the app is installed, an OAuth token will be automatically generated and it will be used to authenticate the app.
    This OAuth token should be set for the `SLACK_TOKEN` environment variable of Branch Cleaner.

    For more information on how to use OAuth 2.0 on Slack, please refer to [the official documentation](https://api.slack.com/docs/oauth).

3. Generate Signing Secret

    Once the app is added, a signing secret will be automatically generated and it will be use to verify requests from Slack.
    This signing secret should be set for the `SLACK_SIGNING_SECRET` environment variable of Branch Cleaner.

    For more information on how to verify requests from SLack, please refer to [the official documentation](https://api.slack.com/docs/verifying-requests-from-slack).


## Configuration

As described in the table below, there are some environment variables to be set for Branch Cleaner to function properly.
You can also create a `.env` file on the project root and define config items instead.

Environment Variable|Description|Default value|Required
-|-|-|-
GITHUB_ENDPOINT|Github API Endpoint (v4)|https://api.github.com|No
GITHUB_TOKEN|Github Access Token|-|Yes
GITHUB_OWNER|Github Owner Name|-|No
GITHUB_EXCLUDE|Branch names to exclude|-|No
SLACK_ENDPOINT|Slack API Endpoint|https://slack.com/api|No
SLACK_TOKEN|Slack OAuth Token|-|Yes
SLACK_SIGNING_SECRET|Slack Signing Token|-|Yes


## Deployment

Though it is recommended to host Branch Cleaner on Netlify, it can be also deployed as a stand-alone server to any environment.

### Netlify

Branch Cleaner is shipped with lambda functions. So, it can be hosted on Netlify just like other static websites without any other backends.

For more information on Netlify Functions, please refer to the [official documentation](https://www.netlify.com/products/functions/)

## Stand-alone Server

You can keep Branch Cleaner running as a stand-alone server on any machine using the following command.

```
$ npm start
```