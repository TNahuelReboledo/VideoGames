const routerGenre = require("./genreRouter");
const routerVideogame = require("./videogamesRouter");
const router = require("express").Router();

router.use("/videogames",routerVideogame);
router.use("/genres",routerGenre);

module.exports = router;
