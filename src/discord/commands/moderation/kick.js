const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');
const { promptMessage } = require('../../functions');
const properties = require('../../../../config/properties');

module.exports = {
  name: 'kick',
  category: 'moderation',
  aliases: ['expulsar'],
  description: 'Use para aplicar uma punição mais leve é só expulsar a pessoa levada do seu servidor 😆',
  usage: 'command | mention | reason',
  run: async (client, message, args) => {
    const logChannel = message.guild.channels.cache.find((c) => c.name === '😠punições') || message.channel;

    if (message.deletable) message.delete();

    // No args
    if (!args[0]) {
      return message.reply('Por favor, fale a pessoa que você quer kickar')
        
    }

    // No reason
    if (!args[1]) {
      return message.reply('Por favor, fale a razão do kick')
        
    }

    // No author permissions
    if (!message.member.hasPermission('KICK_MEMBERS')) {
      return message.reply('❌ Você não tem permissão de kickar membros. Por favor contate um Staff')
        
    }

    // No bot permissions
    if (!message.guild.me.hasPermission('KICK_MEMBERS')) {
      return message.reply('❌ Eu não tenho permissão de kickar membros... Por favor contate um Staff')
        
    }

    const toKick = message.mentions.members.first() || message.guild.members.get(args[0]);

    // No member found
    if (!toKick) {
      return message.reply('Não achei esse mebro... tente denovo ;w;')
        
    }

    // Can't kick urself
    if (toKick.id === message.author.id) {
      return message.reply('Você não pode kickar você mesmo ;w;')
        
    }

    // Check if the user's kickable
    if (!toKick.kickable) {
      return message.reply('Eu não posso banir essa pessoa por conta da hierarquia... Eu acho ;w;')
        
    }

    const embed = new MessageEmbed()
      .setColor('#ff0000')
      .setThumbnail(toKick.user.displayAvatarURL)
      .setFooter(message.member.displayName, message.author.displayAvatarURL)
      .setTimestamp()
      .setDescription(stripIndents`**- Membro Expulso:** ${toKick} (${toKick.id})
            **- Expulso por:** ${message.member} (${message.member.id})
            **- Razão:** ${args.slice(1).join(' ')}`);

    const promptEmbed = new MessageEmbed()
      .setColor('GREEN')
      .setAuthor('Essa verificação fica inválida depois de 30 segundos')
      .setDescription(`Você realmente deseja expulsar ${toKick}?`);

    // Send the message
    await message.channel.send(promptEmbed).then(async (msg) => {
      // Await the reactions and the reaction collector
      const emoji = await promptMessage(msg, message.author, 30, ['✅', '❌']);

      // The verification stuffs
      if (emoji === '✅') {
        msg.delete();

        toKick.kick(args.slice(1).join(' '))
          .catch((err) => {
            if (err) return message.channel.send(`Bem.... a expulsão não funcionou. Aqui o erro: ${err}`);
          });

        logChannel.send(embed);
      } else if (emoji === '❌') {
        msg.delete();

        message.reply('Expulsão cancelada')
          .then((m) => m.delete(10000));
      }
    });
  },
};
