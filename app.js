const express = require("express"),
  db = require("./src/database/database"),
  cors = require("cors"),
  session = require("express-session"),
  passport = require("passport")
// rotas
const fichas = require("./src/routes/fichas");
const genero = require("./src/routes/genero");
const sexo = require("./src/routes/sexo");
const caracteristicas = require("./src/routes/caracteristicas");
const auth = require("./src/routes/auth");
const forbidden = require("./src/routes/forbidden");
const properties = require("./config/properties")
const discord = require("./src/discord");
const discordStrategy = require("./src/strategies/discordStrategy")
const PORT = process.env.PORT || "8080"
const app = express();

app.use(cors({ credentials: true, origin: properties.URL_FRONT }));

app.use(express.json());

app.use(session({
  secret: "random",
  cookie: {
    maxAge: 6000 * 60 * 24
  },
  saveUninitialized: true,
  resave: true,
  name: "discordapi.oath2"
}));

discord.init();

db.then(() => console.log("Connect with mongodb")).catch(err => console.log(err));
// MIDDLEWARE
app.use(passport.initialize());
app.use(passport.session());
app.use(forbidden);

app.use("/api/v1/fichas", fichas);
app.use("/api/v1/genero", genero);
app.use("/api/v1/sexo", sexo);
app.use("/api/v1/caracteristicas", caracteristicas);
app.use("/auth", auth);

app.get("/", (req, res) => {
  res.json({ status: "bot-online" });
});

app.listen(PORT, () => {
  console.log(`App running on port: ${PORT}`);
});
