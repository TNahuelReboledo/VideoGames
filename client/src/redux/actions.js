import axios from "axios";

export const GET_ALL_GAMES = `GET_ALL_GAMES`;
export const GET_GAMES_BY_NAME = `GET_GAMES_BY_NAME`;
export const GET_ALL_GENRES = `GET_ALL_GENRES`;

export const allGames = () => {
   return async function (dispatch) {
      const response = await axios.get(`http://localhost:3001/videogames`);
      const games = response.data;
      dispatch({ type: GET_ALL_GAMES, payload: games });
   };
};

export const findGames = (name) => {
   return async function (dispatch) {
      try {
         const response = await axios.get(`http://localhost:3001/videogames?name=${name}`);
         const games = response.data;
         dispatch({type: GET_GAMES_BY_NAME, payload: games})
      } catch (error) {
         console.log(error.message);
      }
   }
}

export const allGenres = () => {
   return async function (dispatch) {
      try {
         const response = await axios.get(`http://localhost:3001/genres`);
         const genres = response.data;
         dispatch({type: GET_ALL_GENRES, payload: genres})
      } catch (error) {
         console.log(error.message);
      }
   }
}