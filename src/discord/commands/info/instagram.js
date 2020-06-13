const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');

const fetch = require('node-fetch');

module.exports = {
  name: 'instagram',
  aliases: ['insta'],
  category: 'info',
  description: 'Está afim de ver o perfil de alguma pessoa? Use esse comando para mostrar para todo mundo essa pessoa que você quer ver 😉',
  usage: '[command | account_name]',
  run: async (client, message, args) => {
    const name = args.join(' ');

    if (!name) {
      return message.reply('Talvez seja util se você procurar por alguem de fato...!')
        
    }

    const url = `https://instagram.com/${name}/?__a=1`;

    let res;

    try {
      res = await fetch(url).then((url) => url.json());
    } catch (e) {
      return message.reply('Eu não consegui achar essa conta ;w;')
        
    }

    const account = res.graphql.user;

    const embed = new MessageEmbed()
      .setColor('RANDOM')
      .setTitle(account.full_name)
      .setURL(`https://instagram.com/${name}`)
      .setThumbnail(account.profile_pic_url_hd)
      .addField('Informações do perfil', stripIndents`**- Username:** ${account.username}
            **- Nome Completo:** ${account.full_name}
            **- Biografia:** ${account.biography.length == 0 ? 'nop' : account.biography}
            **- Posts:** ${account.edge_owner_to_timeline_media.count}
            **- Seguidores:** ${account.edge_followed_by.count}
            **- Seguindo:** ${account.edge_follow.count}
            **- Conta privada:** ${account.is_private ? 'Sim 🔐' : 'Não 🔓'}`);

    message.channel.send(embed);
  },
};
