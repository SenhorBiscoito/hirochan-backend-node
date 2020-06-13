const { config } = require('dotenv');

config({
  path: '.env',
});


module.exports = {
  id_user: '315901168679124992', // fiz alguns comandos exclusivos válidos só para meu id do discord em outra versão
  bot_img: 'https://freesvgplanet.com/wp-content/uploads/2019/10/pokemon-svg-free-30195-758x505.jpg', // caso usar RichMessage embed, fica mais fácil ter a url do bot em um lugar único
  prefix: '!', // prefix do bot, é possivel mudar em diferentes servidores utilizando o comando  !prefix 'prefix_novo'
  AWS: {
    ACCESS_KEY_ID: process.env.ACCESS_KEY_ID,
    SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY,
  },
  DB_KEY: process.env.DB_KEY,
  URL_BACK: process.env.URL_BACK,
  URL_FRONT: process.env.URL_FRONT,
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  CLIENT_REDIRECT: process.env.CLIENT_REDIRECT,
  YOUTUBE_API: process.env.YOUTUBE_API,
};
