const { Client, Collection } = require("discord.js");
const { config } = require("dotenv");
const properties = require("../../config/properties");
const fs = require("fs");


function init() {

  const client = new Client();

  client.commands = new Collection();
  client.aliases = new Collection();
  client.cooldowns = new Collection();
  client.queue = new Map();

  client.categories = fs.readdirSync(__dirname + "/./commands/");

  config({
    path: `.env`
  });

  ["command"].forEach(handler => {
    require(__dirname + `/handlers/${handler}`)(client);
  });

  client.on("ready", () => {
    console.log(`Hi, ${client.user.username} is now online!`);

    client.user.setPresence({
      game: {
        name: "Criando meu próprio website UwU",
        type: "",
      },
      status: "online",
    });

    client.user.setActivity(
      `💻 Criando meu próprio website UwU`,
      {
        type: "PLAYING",
      }
    );
  });

  client.on("message", async message => {
    // message.reactions.cache.clear()

    if (message.author.bot) return;
    if (!message.guild) return;


    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
    if (!prefixes[message.guild.id]) {
      prefixes[message.guild.id] = {
        prefixes: properties.prefix
      }
    }

    let prefix = prefixes[message.guild.id].prefixes;
    if (!message.content.startsWith(prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;

    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (command)
      command.run(client, message, args);
  });

  client.login(process.env.SECRET_TOKEN);
}

module.exports = { init }