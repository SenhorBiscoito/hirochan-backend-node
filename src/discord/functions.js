const axios = require('axios');
const fetch = require('node-fetch');
const properties = require('../../config/properties');

module.exports = {
  getMember(message, toFind = '') {
    toFind = toFind.toLowerCase();

    let target = message.guild.members.cache.get(toFind);

    if (!target && message.mentions.members) { target = message.mentions.members.first(); }

    if (!target && toFind) {
      target = message.guild.members.cache.find((member) => member.displayName.toLowerCase().includes(toFind)
        || member.user.tag.toLowerCase().includes(toFind));
    }

    if (!target) { target = message.member; }

    return target;
  },

  formatDate(date) {
    return new Intl.DateTimeFormat('pt-BR').format(date);
  },

  async promptMessage(message, author, time, validReactions) {
    // We put in the time as seconds, with this it's being transfered to MS
    time *= 1000;

    // For every emoji in the function parameters, react in the good order.
    for (const reaction of validReactions) await message.react(reaction);

    // Only allow reactions from the author,
    // and the emoji must be in the array we provided.
    const filter = (reaction, user) => validReactions.includes(reaction.emoji.name) && user.id === author.id;

    // And ofcourse, await the reactions
    return message
      .awaitReactions(filter, { max: 1, time })
      .then((collected) => collected.first() && collected.first().emoji.name);
  },
  request: async (req) => {
    await axios
      .get(req)
      .then((res) => res.data)
      .catch((err) => (err))
  },
  randome926: async (acao, score = 30) => {
    const data = await module.exports.request(
      `https://e926.net/posts/random.json?tags=${acao}+pokemon+score:>${score}+-comic+-human}`,
    );

    try {

      if (data.length == undefined) {
        const { url } = data.post.file;

        console.log(url);
        if (url == null || url.includes('.webm' || url.includes('.swf'))) {
          await module.exports.randome926(acao);
        } else {
          return { url, post_id: data.post.id };
        }
      }

      return null;
    } catch (err) {
      return err;
    }
  },
  sleep: async (acao, how) => {
    const data = await module.exports.request(
      `https://e926.net/posts/random.json?tags=${acao}+${how}+pokemon+-human+-comic+-human_on_human`,
    );

    const { url } = data.post.file;

    if (url == null || url.includes('.webm' || url.includes('.swf'))) {
      await module.exports.sleep(acao, how);
    }
    return { url, post_id: data.post.id };
  },
  chucknorris: async () => {
    const data = await module.exports.request('https://api.chucknorris.io/jokes/random');

    return data.value;
  },
  dog: async (message) => {
    message.delete();
    const data = await module.exports.request('https://dog.ceo/api/breeds/image/random');

    return data.message;
  },
  cat: async (message) => {
    message.delete();
    const data = await module.exports.request('https://api.thecatapi.com/v1/images/search');

    return data[0].url;
  },
  getFichas: async (id_user) => {
    const data = await module.exports.request(`${properties.URL_BACK}/api/v1/fichas/${id_user}`);

    if (data.length > 0) {
      return data[0].ficha;
    }
    return data;
  },
  getFicha: async (id_user, ficha) => {
    console.log(ficha);
    const data = await module.exports.request(`${properties.URL_BACK}/api/v1/caracteristicas/${id_user}?ficha=${ficha}`);

    if (typeof data === 'object') {
      return data[0];
    }
    return data;
  },
  getPokedex: async (pokemon) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    return await response.json();
  },
};
