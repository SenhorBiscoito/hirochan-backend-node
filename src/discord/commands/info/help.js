const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');
const properties = require('../../../../config/properties');

module.exports = {
  name: 'help',
  aliases: ['h'],
  category: 'info',
  description: 'Tem alguma dúvida sobre algum comando? É só usar help que eu te ajudo a usar 😊',
  usage: '[command | alias]',
  run: async (client, message, args) => {
    if (args[0]) {
      return getCMD(client, message, args[0]);
    }
    return getAll(client, message);
  },
};

function getAll(client, message) {
  const embed = new MessageEmbed()
    .setTitle(message.author.username)
    .setDescription(`Olá <@${message.author.id}>, meu nome é Hirochan (biscoitinho para os mais próximos) e eu sou um pokemon lindo UwU
    
        Tenho várias funcionalidades para engajar membros e animar o servidor de qualquer um, funcionalidades de moderação, ações, infos e muito mais. 
        
        Quer saber como usar meus comandos? [Clique aqui](${properties.URL_FRONT}/commands)`)
    .setColor('RANDOM')
    .setThumbnail(properties.bot_img);

  return message.channel.send(embed);
}

function getCMD(client, message, input) {
  const embed = new MessageEmbed();

  const cmd = client.commands.get(input.toLowerCase()) || client.commands.get(client.aliases.get(input.toLowerCase()));

  let info = `Não achei nenhum comando para **${input.toLowerCase()}** ;w;`;

  if (!cmd) {
    return message.channel.send(embed.setColor('RED').setDescription(info));
  }

  if (cmd.name) info = `**Comando**: ${cmd.name}`;
  if (cmd.aliases) info += `\n**Tema**: ${cmd.aliases.map((a) => `\`${a}\``).join(', ')}`;
  if (cmd.description) info += `\n**Descrição**: ${cmd.description}`;
  if (cmd.usage) {
    info += `\n**Uso**: ${cmd.usage}`;
    embed.setFooter('Como usar: <> = required, [] = optional');
  }

  return message.channel.send(embed.setColor('GREEN').setDescription(info));
}
