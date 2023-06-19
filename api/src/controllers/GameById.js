const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;
const { Videogame, Genre } = require("../db");

let URL = `https://api.rawg.io/api/games?key=${API_KEY}`;

const getGameById = async (req, res) => {
   try {
      const { idVideogame } = req.params;

      let page = 1;
      let gamesByAPI = [];

      while (page < 6) {
         const response = await axios.get(URL + `&page=${page}`);
         const { results } = response.data;

         const game = results.map((game) => {
            game = {
               id: game.id,
               name: game.name,
               description: game.description,
               platforms: game.platforms
                  ? game.platforms.map((platform) => platform.platform.name)
                  : game.platforms,
               image: game.background_image,
               release: game.release,
               rating: game.rating,
               genres: game.genres.map((genre) => genre.name),
            };
            return game;
         });

         gamesByAPI.push(...game);

         page++;
      }

      const finder = gamesByAPI.find((game) => game.id === Number(idVideogame));

      if (!finder) {
         const gamePK = await Videogame.findByPk(idVideogame,{
            include: {
               model: Genre,
               attributes: ["name"],
               through: {
                  attributes: []
               }
            }
         });
         
         if (!gamePK) {
            res.status(404).json("no se encontro el videogame");
         } else {
            res.status(200).json(gamePK);
         }
      } else {
         res.status(200).json(finder);
      }
   } catch (error) {
      res.status(404).json(error.message);
   }
};

module.exports = { getGameById };
