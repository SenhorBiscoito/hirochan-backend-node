const { dog } = require('../../functions');

module.exports = {
  name: 'dog',
  category: 'image',
  aliases: ['cachorro'],
  description: 'Para não deixar quem gosta de cachorro triste você pode chamar uma foto até que legalzinha de um dog 🤭',
  usage: '[command]',
  run: async (client, message, args) => {
    const data = await dog(message);

    message.channel.send({ files: [data] });
  },
};
