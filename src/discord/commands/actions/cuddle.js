const { MessageEmbed } = require('discord.js');
const { randome926 } = require('../../functions');
const properties = require('../../../../config/properties');

module.exports = {
  name: 'cuddle',
  aliases: ['apertar'],
  category: 'actions',
  description: 'Use esse comando para abraçar bem apertadinho alguém 🤗',
  usage: '[command | mention]',
  run: async (client, message, args) => {
    const name = args.join(' ');

    if (!name) {
      return message.reply('Você precisa marcar a pessoa quer dar aquele apertu gostosu =w=');
    }

    const data = await randome926('cuddle');

    const embed = new MessageEmbed()
      .setDescription(`**O <@${message.author.id}> está apertando o ${args[0]}**  \u200B
            [Clique aqui](https://e926.net/posts/${data.post_id})`)
      .setColor('RANDOM')
      .setAuthor(message.author.username)
      .setThumbnail(message.author.avatarURL())
      .setImage(data.url)
      .setFooter(message.content, properties.bot_img);
    message.channel.send(embed);
  },
};
