const { MessageEmbed } = require('discord.js');
const { randome926 } = require('../../functions');
const properties = require('../../../../config/properties');

module.exports = {
  name: 'lick',
  aliases: ['lamber'],
  category: 'actions',
  description: 'Você pode sair por aí lambendo as pessoas também, quem sabe elas te lambem de volta 🤷‍♀️',
  usage: '[command | mention]',
  run: async (client, message, args) => {
    const name = args.join(' ');

    if (!name) {
      return message.reply('Você precisa marcar a pessoa que deseja dar aquela lambidinha =w=');
    }

    const data = await randome926('lick');

    const embed = new MessageEmbed()
      .setDescription(`**O <@${message.author.id}> está labendo o ${args[0]}**  \u200B
            [Clique aqui](https://e926.net/posts/${data.post_id})`)
      .setColor('RANDOM')
      .setAuthor(message.author.username)
      .setThumbnail(message.author.avatarURL())
      .setImage(data.url)
      .setFooter(message.content, properties.bot_img);
    message.channel.send(embed);
  },
};
