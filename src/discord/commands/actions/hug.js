const { MessageEmbed } = require('discord.js');
const { randome926 } = require('../../functions');
const properties = require('../../../../config/properties');

module.exports = {
  name: 'hug',
  aliases: ['abraçar'],
  category: 'actions',
  description: 'Sai por aí abraçando seus amiguinhos, eu também adoro abraço e adoro quando usam em mim 🤗',
  usage: '[command | mention]',
  run: async (client, message, args) => {
    const name = args.join(' ');

    if (!name) {
      return message.reply('Você precisa marcar a pessoa quer dar aquele abraço gostosu =w=');
    }

    const data = await randome926('hug');

    const embed = new MessageEmbed()
      .setDescription(`**O <@${message.author.id}> está abraçando o ${args[0]}**  \u200B
            [Clique aqui](https://e926.net/posts/${data.post_id})`)
      .setColor('RANDOM')
      .setAuthor(message.author.username)
      .setThumbnail(message.author.avatarURL())
      .setImage(data.url)
      .setFooter(message.content, properties.bot_img);
    message.channel.send(embed);
  },
};
