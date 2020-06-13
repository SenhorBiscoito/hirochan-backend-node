const { MessageEmbed } = require('discord.js');
const { promptMessage } = require('../../functions');
const properties = require('../../../../config/properties');

const chooseArr = ['🗻', '📰', '✂'];

module.exports = {
  name: 'rps',
  category: 'fun',
  description: 'Bora jogar pedra papel e tesoura, quem perder lava a louça 😂',
  usage: 'command',
  run: async (client, message, args) => {
    const embed = new MessageEmbed()
      .setColor('#ffffff')
      .setFooter(message.guild.me.displayName, client.user.displayAvatarURL)
      .setDescription(' Reaja em alguns desses emotes para jogar!')
      .setTimestamp();

    const m = await message.channel.send(embed);
    const reacted = await promptMessage(m, message.author, 30, chooseArr);

    const botChoice = chooseArr[Math.floor(Math.random() * chooseArr.length)];

    const result = await getResult(reacted, botChoice);

    await m.reactions.cache.clear();

    embed
      .setDescription('')
      .addField(result, `${reacted} vs ${botChoice}`);

    m.edit(embed);

    function getResult(me, clientChosen) {
      if ((me === '🗻' && clientChosen === '✂')
                || (me === '📰' && clientChosen === '🗻')
                || (me === '✂' && clientChosen === '📰')) {
        return 'Você venceu uwu';
      } if (me === clientChosen) {
        return 'É um empate';
      }
      return 'Você perdeu';
    }
  },
};
