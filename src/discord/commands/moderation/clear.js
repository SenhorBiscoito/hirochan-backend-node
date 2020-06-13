module.exports = {
  name: 'clear',
  aliases: ['clean'],
  category: 'moderation',
  description: 'Muita sujeira no chat? Você pode apagar várias mensagens de mua vez digitando quantas mensagens você quer apagar 😮',
  usage: '[command | number_of_messages]',

  run: async (client, message, args) => {
    message.delete();

    // Member doesn't have permissions
    if (!message.member.hasPermission('MANAGE_MESSAGES')) {
      return message.reply("You can't delete messages....")
    }

    // Check if args[0] is a number
    if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
      return message.reply('É... Isso não é um número? E eu tambem não posso deletar 0 mensagens ;w;')
    }

    // Maybe the bot can't delete messages
    if (!message.guild.me.hasPermission('MANAGE_MESSAGES')) {
      return message.reply('Desculpa... Eu não posso deletar mensagens ;w;')
    }

    let deleteAmount;

    if (parseInt(args[0]) > 100) {
      deleteAmount = 100;
    } else {
      deleteAmount = parseInt(args[0]);
    }

    message.channel.bulkDelete(deleteAmount, true)
      .then((deleted) => message.channel.send(`Deletei \`${deleted.size}\` mensagens （￣ｗ￣）Ψ`))
      .catch((err) => message.reply(`Something went wrong... ${err}`));
  },
};
