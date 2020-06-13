const { MessageEmbed } = require('discord.js');
const { randome926 } = require('../../functions');
const properties = require("../../../../config/properties");


module.exports = {
  name: 'pokemon',
  category: 'image',
  description: 'Manda um pokemon fofinho',
  usage: '[command]',
  run: async (client, message, args) => {

    // No args
    if (!args[0]) {
      return message.reply('Digite o nome do pokemon que você quer')
    }

    const data = await randome926(args.join(" "), 0);

    if (data) {
      console.log(data)


      const embed = new MessageEmbed()
        .setDescription(`**O <@${message.author.id}> procurou por ${args.join(" ")}**  \u200B
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
