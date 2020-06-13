const { MessageEmbed } = require('discord.js');
const { randome926 } = require('../../functions');
const properties = require('../../../../config/properties');

module.exports = {
  name: 'happy',
  aliases: ['feliz'],
  category: 'actions',
  description: 'Está feliz? eu também fico por você, mostre para todo mundo esse seu sorriso lindo 😁',
  usage: '[command]',
  run: async (client, message, args) => {
    const data = await randome926('happy');

    const embed = new MessageEmbed()
      .setDescription(`**O <@${message.author.id}> está feliz （＾ω＾）** \u200B
            [Clique aqui](https://e926.net/posts/${data.post_id})`)
      .setColor('RANDOM')
      .setAuthor(message.author.username)
      .setThumbnail(message.author.avatarURL())
      .setImage(data.url)
      .setFooter(message.content, properties.bot_img);
    message.channel.send(embed);
  },
};
