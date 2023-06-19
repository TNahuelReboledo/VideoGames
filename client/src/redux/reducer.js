import { GET_ALL_GAMES, GET_ALL_GENRES, GET_GAMES_BY_NAME } from "./actions";

const initialState = {
   games: [],
   genres: [],
};

const reducer = (state = initialState, action) => {
   switch (action.type) {
      case GET_ALL_GAMES:
         return { ...state, games: action.payload };
      case GET_GAMES_BY_NAME:
         return { ...state, games: action.payload };
      case GET_ALL_GENRES:
         return { ...state, genres: action.payload };
      default:
         return { ...state };
   }
};
export default reducer;
