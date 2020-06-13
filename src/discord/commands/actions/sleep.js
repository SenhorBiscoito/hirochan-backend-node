const { MessageEmbed } = require('discord.js');
const { sleep } = require('../../functions');
const properties = require('../../../../config/properties');

module.exports = {
  name: 'sleep',
  aliases: ['dormir'],
  category: 'actions',
  description: 'Use esse comando quando for nanar, você pode marcar uma pessoa para dormir juntinho dela também 😴',
  usage: '[command || command | mention ]',
  run: async (client, message, args) => {
    const name = args.join(' ');

    // solo
    if (!name) {
      const data = await sleep('sleep', 'solo');

      const embed = new MessageEmbed()
        .setDescription(`**O <@${message.author.id}> está querendo dar uma descansadinha**  \u200B
                [Clique aqui](https://e926.net/posts/${data.post_id})`)
        .setColor('RANDOM')
        .setAuthor(message.author.username)
        .setThumbnail(message.author.avatarURL())
        .setImage(data.url)
        .setFooter(message.content, properties.bot_img);
      message.channel.send(embed);
    }
    // duo
    else {
      const data = await sleep('sleep', 'duo');

      const embed = new MessageEmbed()
        .setDescription(`**O <@${message.author.id}> está descansando juntinho com ${args[0]}** \u200B
                [Clique aqui](https://e926.net/posts/${data.post_id})`)
        .setColor('RANDOM')
        .setAuthor(message.author.username)
        .setThumbnail(message.author.avatarURL())
        .setImage(data.url)
        .setFooter(message.content, properties.bot_img);
      message.channel.send(embed);
    }
  },
};
