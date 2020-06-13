const { MessageEmbed } = require('discord.js');
const search = require('youtube-search');
const properties = require('../../../../config/properties');


const opts = {
  maxResults: 10,
  key: properties.YOUTUBE_API,
  type: 'video',
};


module.exports = {
  name: 'youtube',
  aliases: ['search'],
  category: 'info',
  description: 'Pesquisar videos no youtube',
  usage: '[command]',
  run: async (client, message, args) => {
    let embed = new MessageEmbed()
      .setColor('#73ffdc')
      .setDescription('Digite sua busca. Lembre-se de reduzir sua busca')
      .setTitle('Youtube ●ω●');
    await message.channel.send(embed);

    let filter = (m) => m.author.id === message.author.id;
    const query = await message.channel.awaitMessages(filter, { max: 1 });

    const results = await search(query.first().content, opts).catch((err) => console.log(err));
    if (results) {
      const youtubeResults = results.results;
      let i = 0;
      const titles = youtubeResults.map((result) => {
        i++;
        return `${i}) ${result.title}`;
      });

      await message.channel.send({
        embed: {
          title: 'Selecione qual video você quer digitando o número',
          description: titles.join('\n'),
        },
      }).catch((err) => console.log(err));

      filter = (m) => (m.author.id === message.author.id) && m.content >= 1 && m.content <= youtubeResults.length;
      const collected = await message.channel.awaitMessages(filter, { max: 1 });
      const selected = youtubeResults[collected.first().content - 1];

      embed = new MessageEmbed()
        .setTitle(`${selected.title}`)
        .setURL(`${selected.link}`)
        .setDescription(`${selected.description}`)
        .setThumbnail(`${selected.thumbnails.default.url}`);

      message.channel.send(embed);
    }
  },
};
