module.exports = {
  name: 'ping',
  category: 'info',
  description: 'Estou online ou é sua internet que está lenta? Use esse comando para descobrir 🤔',
  usage: '[command]',

  run: async (client, message, args) => {
    const msg = await message.channel.send('🏓 Pingando....');

    msg.edit(`🏓 Pong!
        Latencia de ${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms
        API Latencia de ${Math.round(client.ws.ping)}ms`);
  },
};
