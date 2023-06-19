const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;
const { Videogame, Genre } = require("../db");

let URL = `https://api.rawg.io/api/games?key=${API_KEY}`;

const getAllGames = async (req, res) => {
   try {
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
               release: game.released,
               rating: game.rating,
               genres: game.genres.map((genre) => genre.name),
            };
            return game;
         });

         gamesByAPI.push(...game);

         page++;
      }

      const gamesByDB = await Videogame.findAll({
         include: {
            model: Genre,
            attributes: ["name"],
            through: {
               attributes: [],
            },
         },
      });

      const gamesByBDD = gamesByDB.map(game=> {
         gamecre = {
            id: game.id,
               name: game.name,
               description: game.description,
               platforms: game.platforms,
               image: game.background_image,
               release: game.release,
               rating: game.rating,
               genres: game.genres.map((genre) => genre.name),
         }
         return gamecre;
      });

            const AllGames = [...gamesByAPI, ...gamesByBDD] 

      const { name } = req.query;

      if (name) {
         const gamesByName = AllGames.filter((game) =>
            game.name.toLowerCase().includes(name.toLowerCase())
         );
         if (gamesByName.length === 0)
            res.status(400).json("El videojuego que buscas no existe");
         else res.status(200).json(gamesByName);

      } else {
         res.status(200).json(AllGames);
      }
   } catch (error) {
      res.status(500).send(error.message);
   }
};

module.exports = { getAllGames };
