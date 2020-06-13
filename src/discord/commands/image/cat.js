const { cat } = require('../../functions');

module.exports = {
  name: 'cat',
  aliases: ['gato'],
  category: 'image',
  description: 'Manda uma foto bonitinha de um gatinho fofo (se você não gosta de gatinhos não fale comigo 😤)',
  usage: '[command]',
  run: async (client, message, args) => {
    const data = await cat(message);

    message.channel.send({ files: [data] });
  },
};
