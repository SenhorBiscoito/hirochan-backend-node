module.exports = {
  name: 'queue',
  category: 'music',
  description: 'Ver Queue',
  usage: '[command]',
  run: async (client, message, args) => {


    const serverQueue = message.client.queue.get(message.guild.id);
    console.log(serverQueue)
    if (!serverQueue) return message.channel.send('There is nothing playing.');
    message.channel.send(`🎶 Now playing: **${serverQueue.songs[0].title}**`);

    return message.channel.send(`
__**Song queue:**__
${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}
**Now playing:** ${serverQueue.songs[0].title}
		`);
  }
}

