module.exports = ({ repository, branches }) => {
  return branches.map(({ name, date, user }) => {
    const link = `>*<https://github.com/SMARTeacher/${repository}/tree/${name}|${name}>*`;
    const meta = `>⏰ _${date}_ 👨‍💻 _${user.name || user.login || user.email}_`;
    return {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `${link}\n${meta}`,
      },
      accessory: {
        type: 'button',
        text: {
          type: 'plain_text',
          emoji: true,
          text: 'Delete :fire:',
        },
        value: `${repository}|${name}`,
      },
    };
  });
};
