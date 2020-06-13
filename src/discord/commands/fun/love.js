const { MessageEmbed } = require('discord.js');
const { getMember } = require('../../functions');

module.exports = {
  name: 'love',
  aliases: ['ship'],
  category: 'fun',
  description: 'Sabe se alguém te ama ou não? Veja o quanto a pessoa te ama marcando ela 🥰',
  usage: '[command || command | mention]',
  run: async (client, message, args) => {
    // Get a member from mention, id, or username
    let person = getMember(message, args[0]);

    if (!person || message.author.id === person.id) {
      person = message.guild.members.cache.filter((m) => m.id !== message.author.id).random();
    }

    const love = Math.random() * 100;
    const loveIndex = Math.floor(love / 10);
    const loveLevel = '💖'.repeat(loveIndex) + '💔'.repeat(10 - loveIndex);

    const embed = new MessageEmbed()
      .setColor('#ffb6c1')
      .addField(`☁ **${person.displayName}** ama o **${message.member.displayName}**:`,
        `💟 ${Math.floor(love)}%\n\n${loveLevel}`);

    message.channel.send(embed);
  },
};
