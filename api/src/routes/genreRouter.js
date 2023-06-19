const { getAllGenres } = require("../controllers/allGenres");
const routerGenre = require("express").Router();

routerGenre.get("/", getAllGenres)

module.exports = routerGenre;