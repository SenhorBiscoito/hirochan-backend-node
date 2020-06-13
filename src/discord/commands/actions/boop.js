const { MessageEmbed } = require('discord.js');
const { randome926 } = require('../../functions');
const properties = require('../../../../config/properties');

module.exports = {
  name: 'boop',
  aliases: ['cutucar'],
  category: 'actions',
  description: 'Cutuca alguma pessoa que você gosta (que não gosta tbm 😮)',
  usage: '[command | mention]',
  run: async (client, message, args) => {
    const name = args.join(' ');

    if (!name) {
      return message.reply('Você precisa marcar a pessoa quer dar boop =w=');
    }

    const data = await randome926('boop', '0');

    if (data) {
      const embed = new MessageEmbed()
        .setDescription(`**<@${message.author.id}> booped ${args[0]}**  \u200B
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
