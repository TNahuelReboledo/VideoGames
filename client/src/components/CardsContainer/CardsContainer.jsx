import React from "react";
import Card from "../Card/Card";
import { useSelector } from "react-redux";

function CardsContainer() {
   const games = useSelector((state) => state.games);

   return (
      <div>
         {games.map((game) => {
            return (
               <Card
                  key={game.id}
                  id={game.id}
                  name={game.name}
                  image={game.image}
                  genres={game.genres.map((genre) => (
                     <div>{genre}</div>
                  ))}
               />
            );
         })}
      </div>
   );
}
1;

export default CardsContainer;
