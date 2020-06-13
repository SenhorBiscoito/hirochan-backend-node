const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'poolreact',
  aliases: ['react'],
  category: 'fun',
  description: 'Comando para reagir ("comando + tempo"s/m"" + mensagem)',
  usage: '[command]',
  run: async (client, message, args) => {
    message.delete();
    let time = args[0];


    args.shift();
    const question = args.join(' ');

    const regex = new RegExp(/^([0-9]{2}|[0-9]{1})[sSmM]$/);

    if (regex.test(time)) {
      if (time.toLowerCase().endsWith('s')) {
        time = parseInt(time.substring(0, time.indexOf('s')));
        time *= 1000;
      } else if (time.toLowerCase().endsWith('m')) {
        time = parseInt(time.substring(0, time.indexOf('m')));
        time *= 60 * 1000;
      }
      const embed = new MessageEmbed()
        .setTitle(question)
        .setDescription('React with 👍 or 👎')
        .setTimestamp();
      try {
        const polls = new Map();
        const userVotes = new Map();
        const filter = (reaction, user) => {
          if (user.bot) return false;
          if (['👍', '👎'].includes(reaction.emoji.name)) {
            if (polls.get(reaction.message.id).get(user.id)) { return false; }

            userVotes.set(user.id, reaction.emoji.name);
            return true;
          }
        };
        const msg = await message.channel.send(embed);
        await msg.react('👍');
        await msg.react('👎');
        polls.set(msg.id, userVotes);
        const reactions = await msg.awaitReactions(filter, { time });
        const thumbsUp = reactions.get('👍');
        const thumbsDown = reactions.get('👎');
        let thumbsUpResults = 0; let
          thumbsDownResults = 0;
        if (thumbsUp) { thumbsUpResults = thumbsUp.users.cache.filter((u) => !u.bot).size; }
        if (thumbsDown) { thumbsDownResults = thumbsDown.users.cache.filter((u) => !u.bot).size; }
        const resultsEmbed = new MessageEmbed()
          .setTitle('Results')
          .setDescription(`👍 - ${thumbsUpResults} votes\n\n👎 - ${thumbsDownResults} votes\n`);
        await message.channel.send(resultsEmbed);
      } catch (err) {
        console.log(err);
      }
    }
  },
};
