module.exports = {
  name: 'resume',
  category: 'music',
  aliases: ['re'],
  description: 'Voltar a tocar',
  usage: '[command]',
  run: async (client, message, args) => {

    const serverQueue = message.client.queue.get(message.guild.id);
    if (serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume();
      return message.channel.send('▶ Resumed the music for you!');
    }

    if (serverQueue && serverQueue.playing) {
      return message.channel.send('The music is already running');
    }


    console.log(serverQueue)
    return message.channel.send('There is nothing playing.');

  }
}

