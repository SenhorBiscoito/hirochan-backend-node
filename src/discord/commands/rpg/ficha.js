const { MessageEmbed } = require('discord.js');
const { getFichas, getFicha } = require('../../functions');
const properties = require('../../../../config/properties');

module.exports = {
  name: 'ficha',
  category: 'rpg',
  description: 'Quer criar suas próprias fichas? É só usar esse comando para criar e depois usar quando for jogar RPG 😏',
  usage: '[command || command ficha_name]',
  run: async (client, message, args) => {
    const name = args.join(' ');
    const fields = [];
    const command = args[0];
    const commandLength = args.length;

    const customMessage = new MessageEmbed()
      .setColor('RANDOM')
      .setAuthor(message.author.username)
      .setThumbnail(properties.bot_img)
      .setFooter(message.content, properties.bot_img);

    // MOSTRA AS FICHAS DO CARINHA
    if (!name) {
      const data = await getFichas(message.author.id);

      if (data.length === 0) {
        customMessage.setDescription(`<@${message.author.id}> você não tem nenhuma ficha. [Clique aqui](${properties.URL_FRONT}/dashboard/user) para criar uma ;3`);
        return message.channel.send(customMessage);
      }
      for (const [index, item] of data.entries()) {
        fields.push({
          name: `Ficha ${index + 1} `,
          value: item.ficha,
          inline: true,
        });
      }

      const embed = {
        title: `Exibindo fichas de ${message.author.username}`,
        description: `Essas é a lista de fichas do <@${message.author.id}>.`,
        color: 'RANDOM',
        footer: {
          icon_url: properties.bot_img,
          text: 'Comando utilizado: (!ficha)',
        },
        thumbnail: {
          url: properties.bot_img,
        },
        author: {
          name: 'Biscoitinho',
          url: 'https://discordapp.com',
          icon_url: properties.bot_img,
        },
        fields,

      };
      return message.channel.send({ embed });
    }

    if (command == 'add') {
      if (commandLength == 1) {
        customMessage
          .setTitle(`Criação de ficha para o ${message.author.username}`)
          .setDescription(
            `[Clique aqui](${properties.URL_FRONT}/dashboard) Para poder criar sua ficha ;3`,
          );
        return message.channel.send(customMessage);
      }
    }

    const data = await getFicha(message.author.id, args.join(' '));

    if (typeof data === 'object') {
      const embed = {
        color: 'RANDOM',
        thumbnail: {
          url: message.author.avatarURL(),
        },
        image: {
          url: data.image,
        },
        author: {
          name: data.ficha,
        },
        footer: {
          text: message.content,
          icon_url: properties.bot_img,
        },
        fields: [
          {
            name: 'Nome',
            value: data.nome,
          },
          {
            name: 'Idade',
            value: data.idade,
          },
          {
            name: 'Gênero',
            value: data.genero[0].nome,
          },
          {
            name: 'Sexualidade',
            value: data.sexo[0].nome,
          },
          {
            name: 'História',
            value: data.historia,
          },
          {
            name: 'Poderes',
            value: data.poderes,
          },
          {
            name: 'Personalidade',
            value: data.personalidade,
          },
          {
            name: 'Gostos',
            value: data.gosta_de,
            inline: true,
          },
          {
            name: 'Desgostos',
            value: data.nao_gosta_de,
            inline: true,
          },
        ],
      };
      return message.channel.send({ embed });
    }
    message.reply(data);
  },
};
