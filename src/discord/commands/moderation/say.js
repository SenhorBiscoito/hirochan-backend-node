const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'say',
  aliases: ['bc', 'broadcast'],
  description: 'Eu consigo mandar qualquer mensagem por você, usa esse comando para se passar por mim 🤩',
  usage: '<input>',
  run: (client, message, args) => {
    message.delete();

    if (!message.member.hasPermission('MANAGE_MESSAGES')) { return message.reply('Você não tem permissão necessária para esse comando ;w;') }

    if (args.length < 0) { return message.reply('Não tem nada para dizer?') }


    const roleColor = message.guild.roles.highest.hexColor;

    if (args[0].toLowerCase() === 'embed') {
      const embed = new MessageEmbed()
        .setDescription(args.slice(1).join(' '))
        .setColor(roleColor === '#000000' ? '#ffffff' : roleColor);

      message.channel.send(embed);
    } else {
      message.channel.send(args.join(' '));
    }
  },
};
