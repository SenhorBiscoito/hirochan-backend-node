const { MessageEmbed } = require('discord.js');
const { randome926 } = require('../../functions');
const properties = require('../../../../config/properties');

module.exports = {
  name: 'cry',
  aliases: ['sad'],
  category: 'actions',
  description: 'Caso você esteja se sentindo triste, você pode usar esse comando 😢',
  usage: '[command]',
  run: async (client, message, args) => {
    const data = await randome926('cry');

    if (data) {
      const embed = new MessageEmbed()
        .setDescription(`**O <@${message.author.id}> está tiste （>﹏<)** \u200B
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
