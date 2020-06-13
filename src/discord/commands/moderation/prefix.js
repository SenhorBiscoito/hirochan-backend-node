const { MessageEmbed } = require('discord.js');
const fs = require('fs');
const properties = require('../../../../config/properties');

module.exports = {
  name: 'prefix',
  category: 'moderation',
  description: 'Por padrão meu prefix é "!", mas você pode trocar se quiser para qualquer outro usando esse comando',
  usage: '[command | new_prefix]',
  run: (client, message, args) => {
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply('Você não tem permissão para mudar o meu prefix :triumph: ');
    if (!args[0]) return message.reply('Você precisa colocar o novo prefix');

    const prefixes = JSON.parse(fs.readFileSync('./prefixes.json', 'utf8'));

    prefixes[message.guild.id] = {
      prefixes: args[0],
    };

    fs.writeFile('./prefixes.json', JSON.stringify(prefixes), (err) => {
      if (err) console.log(err);
    });

    const embed = new MessageEmbed()
      .setColor('RANDOM')
      .setTitle('Prefixo alterado com sucesso')
      .setDescription(`Prefico alterado para ${args[0]}`)
      .setFooter(message, properties.bot_img);

    message.channel.send(embed);
  },
};
