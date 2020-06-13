const { MessageEmbed } = require('discord.js');
const { getPokedex } = require('../../functions');
const properties = require('../../../../config/properties');

module.exports = {
  name: 'pokedex',
  aliases: ['poke'],
  category: 'fun',
  description: 'Procura uma imagem de algum pokemon 😎',
  usage: '[command]',
  run: async (client, message, args) => {
    console.log('oi');
    try {
      const pokeData = await getPokedex(args);
      const {
        sprites,
        stats,
        weight,
        name,
        id,
        base_experience,
        abilities,
        types,
      } = pokeData;
      const embed = new MessageEmbed();
      embed.setTitle(`${name} #${id}`);
      embed.setThumbnail(`${sprites.front_default}`);
      stats.forEach((stat) => embed.addField(stat.stat.name, stat.base_stat, true));
      types.forEach((type) => embed.addField('Type', type.type.name, true));
      embed.addField('Weight', weight);
      embed.addField('Base Experience', base_experience);
      message.channel.send(embed);
    } catch (err) {
      console.log(err);
      message.channel.send(`Pokemon ${pokemon} does not exist.`);
    }
  },
};
