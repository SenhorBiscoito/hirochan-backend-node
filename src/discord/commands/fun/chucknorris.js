const { chucknorris } = require('../../functions');

module.exports = {
  name: 'chucknorris',
  aliases: ['chuck'],
  category: 'fun',
  description: 'Comando tiste ;w;',
  usage: '[command]',
  run: async (client, message, args) => {
    const data = await chucknorris();

    message.channel.send(`>>> ${data}`);
  },
};
