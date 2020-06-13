const { MessageEmbed } = require('discord.js');


module.exports = {
  name: 'whois',
  aliases: ['who', 'user', 'info', 'server'],
  category: 'info',
  description: 'Informações do servidor',
  usage: '[command | mention]',
  run: (client, message, args) => {
    if (args.length >= 2) {
      message.reply('Uso incorreto do meu comando: !info | !info <user_id> | !info @mention');
    } else

    if (args.length === 1) {
      const member = message.mentions.members.size === 1
        ? message.mentions.members.first()
        : message.guild.members.cache.get(args[1]);


      if (member) {
        const embed = new MessageEmbed()
          .setAuthor(`${member.user.tag} (${member.id})`, member.user.displayAvatarURL())
          .setThumbnail(member.user.displayAvatarURL())
          .addFields(
            {
              name: 'Criado em', value: `${member.user.createdAt.toLocaleString()}`, inline: true,
            },
            {
              name: 'Se juntou', value: `${member.joinedAt.toLocaleString()}`, inline: true,
            },
          )
          .addField('Expulsavel', member.kickable, false)
          .addField('Canal de Voz', member.voice.channel ? `${member.voice.channel.name}(${member.voice.channel.id})` : 'None')
          .addField('Presence', member.presence.status)

          .setDescription(`${member.roles.cache.map((role) => role.toString()).join(' ')}`);
        message.channel.send(embed);
      } else {
        message.channel.send(`Não consegui encontrar o membro com id: ${args[1]}`);
      }
    } else {
      const { guild } = message;
      const embed = new MessageEmbed()
        .setAuthor(`${guild.name} (${guild.id})`, guild.iconURL())
        .setThumbnail(guild.iconURL())
        .addField('Criado em', guild.createdAt.toLocaleString(), true)
        .addField('Dono do server', guild.owner.user.tag)
        .addField('Total de membros', guild.memberCount, true)
        .addField('Total de pessoas', guild.members.cache.filter((member) => !member.user.bot).size, true)
        .addField('Total de Bots', guild.members.cache.filter((member) => member.user.bot).size, true)
        .addField('Total de Canais', guild.channels.cache.size, true)
        .addField('Total de Canais de Texto', guild.channels.cache.filter((ch) => ch.type === 'text').size, true)
        .addField('Total de Canais de Voz', guild.channels.cache.filter((ch) => ch.type === 'voice').size, true)
        .setColor('#5CC5FF')
        .setDescription(`${guild.roles.cache.map((role) => role.toString()).join(' ')}`);
      message.channel.send(embed);
    }
  },
};
