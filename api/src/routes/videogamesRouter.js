const { getAllGames } = require("../controllers/allGames");
const { getGameById } = require("../controllers/GameById");
const { gameCreate } = require("../controllers/postGame");

const routerVideogame = require("express").Router();

routerVideogame.get("/", getAllGames);
routerVideogame.get("/:idVideogame", getGameById);
routerVideogame.post("/", gameCreate);

module.exports = routerVideogame;
