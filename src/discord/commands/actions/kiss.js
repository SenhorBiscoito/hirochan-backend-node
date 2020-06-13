const { MessageEmbed } = require('discord.js');
const { randome926 } = require('../../functions');
const properties = require('../../../../config/properties');

module.exports = {
  name: 'kiss',
  aliases: ['beijar'],
  category: 'actions',
  description: 'Parece que está esquentando do nada né? Você pode esquentar o chat usando usando esse comando e quem sabe esquente mais coisas 😏',
  usage: '[command | mention]',
  run: async (client, message, args) => {
    const name = args.join(' ');

    if (!name) {
      return message.reply('Você precisa marcar a pessoa que deseja dar umas bitoquinhas =w=');
    }

    const data = await randome926('kiss');

    const embed = new MessageEmbed()
      .setDescription(`**O <@${message.author.id}> está beijando o ${args[0]}**  \u200B
            [Clique aqui](https://e926.net/posts/${data.post_id})`)
      .setColor('RANDOM')
      .setAuthor(message.author.username)
      .setThumbnail(message.author.avatarURL())
      .setImage(data.url)
      .setFooter(message.content, properties.bot_img);
    message.channel.send(embed);
  },
};
