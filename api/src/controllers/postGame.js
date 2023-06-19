const { Videogame , Genre } = require("../db");

//TODO: comprobar si la relacion funciona con mas de un genero!

const gameCreate = async (req, res) => {
   try {
      const { name, description, platforms, image, release, rating, genres } = req.body;

      if (
         !name ||
         !description ||
         !platforms ||
         // !image ||
         !release ||
         !rating ||
         !genres
      ) {
         res.status(400).json(`Faltan ingresar datos`);
      } else {
         const newGame = {
            name,
            description,
            platforms,
            image,
            release,
            rating,
            genres
         };
         const createdGame = await Videogame.create(newGame);
         
         const genresFound = await Genre.findAll({
            where: {
               name: genres
            }
         })

         await createdGame.addGenres(genresFound);

         // await newGame.addGenres(Genre);
         res.status(200).json(`Se creo un nuevo juego`);
      }
   } catch (error) {
      res.status(500).json(`Hubo un error al crear el juego`);
   }
};

module.exports = { gameCreate };
