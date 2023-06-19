const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;
const { Genre } = require("../db");

let URL = `https://api.rawg.io/api/genres?key=${API_KEY}`;

const getAllGenres = async (req, res) => {
   try {
      const existinGenres = await Genre.findAll();
      if (existinGenres.length > 0) {
         res.status(200).json(existinGenres);
      } else {
         const response = await axios.get(URL);
         const { results } = response.data;

         const genres = results.map((genre) => ({
            name: genre.name,
         }));

         await Genre.bulkCreate(genres);

         res.status(200).json(genres);
      }
   } catch (error) {
      res.status(500).json(error);
   }
};

module.exports = { getAllGenres };

// let page = 1;
// let arrGenres = [];

// while (page < 6) {
//    const response = await axios.get(URL);
//    const { results, next } = response.data;
//    const genres = results.map((game) => game.genres);
//    let arr = [];
//    for (let aux of genres) {
//       arr.push(...aux);
//    }
//    const nameGenre = arr.map((genre) => genre.name);
//    arrGenres.push(nameGenre);
//    URL = next;
//    page++;
// }

// const newArrOfGenres = arrGenres.flat().sort();
// let genresSet = new Set(newArrOfGenres);
// let genresNotRepeat = Array.from(genresSet);
// const genresObj = genresNotRepeat.map((gen)=>{
//    return {name: gen}
// });
