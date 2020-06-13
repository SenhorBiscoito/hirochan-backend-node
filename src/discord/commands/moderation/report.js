const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');
const properties = require('../../../../config/properties');

module.exports = {
  name: 'report',
  category: 'moderation',
  aliases: ['denunciar'],
  description: 'Deixe seus membro te ajudarem, caso alguém apronte é só eles usarem esse comando para denunciar quem andou aprontando 😱',
  usage: '[command | mention | report]',
  run: async (client, message, args) => {
    if (message.deletable) message.delete();

    const rMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

    if (!rMember) { return message.reply('Não foi possivel achar essa pessoa') }

    if (rMember.hasPermission('BAN_MEMBERS') || rMember.user.bot) { return message.channel.send('Não pode reportar esse membro ;w;') }

    if (!args[1]) { return message.channel.send('Por favor, fala o que esse membro aprontou!') }

    const channel = message.guild.channels.cache.find((c) => c.name === '☎denuncias');

    if (!channel) { return message.channel.send('Não foi possivel achar um canal de `#reports`') }

    const embed = new MessageEmbed()
      .setColor('#ff0000')
      .setTimestamp()
      .setFooter(message.guild.name, message.guild.iconURL)
      .setAuthor('Membro reportado', rMember.user.displayAvatarURL)
      .setDescription(stripIndents`**- Member:** ${rMember} (${rMember.user.id})
            **- Reportado por:** ${message.member}
            **- Reportado em:** ${message.channel}
            **- Razão:** ${args.slice(1).join(' ')}`);

    return channel.send(embed);
  },
};
