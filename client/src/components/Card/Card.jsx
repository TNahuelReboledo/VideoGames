import React from "react";
import { NavLink } from "react-router-dom";

function Card({ name, image, genres , id}) {
   return (
      <div>
         <NavLink to={`/detail/${id}`}>
            <h1>{name}</h1>
            <img src={image} alt={name} />
            <h2>
               Genres:{" "}
               {genres && genres.length > 0 ? (
                  genres.map((genre) => <div>{genre}</div>)
               ) : (
                  <div>Genre/s not avaiable/s</div>
               )}
            </h2>
         </NavLink>
      </div>
   );
}

export default Card;
