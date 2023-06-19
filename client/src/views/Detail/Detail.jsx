import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detail() {
   const { id } = useParams();
   const [game, setGame] = useState({});

   useEffect(() => {
      axios.get(`http://localhost:3001/videogames/${id}`).then(({ data }) => {
         if (data.name) {
            setGame(data);
         } else {
            console.log("No es posible dar detalles del juego");
         }
      });
      return setGame({});
   }, [id]);

   return (
      <div>
         {game.id ? (
            <>
               <h3>id: {id}</h3>
               <h1>Name: {game.name}</h1>
               <img src={game.image} alt={game.name} />
               <h3>
                  Platforms:{" "}
                  {game.platforms?.map((platform) => {
                     return <li>{platform}</li>;
                  })}
               </h3>
               <h3>Description: {game.description}</h3>
               <h3>Release: {game.release}</h3>
               <h3>Rating: {game.rating}</h3>
               <h3>
                  genres:
                  {game.genres?.map((genre) => {
                     return <li>{genre.name ? genre.name : genre}</li>;
                  })}
               </h3>
            </>
         ) : (
            <>Loading...</>
         )}
      </div>
   );
}

export default Detail;
