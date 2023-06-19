import React from "react";
import SearchBar from "./SearchBar/SearchBar";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { allGames } from "../../redux/actions";

function NavBar() {

   const dispatch = useDispatch();

const handlerButton = () => {
   dispatch(allGames())
}

   return (
      <div>
         <NavLink to="/home">
            <button onClick={handlerButton}>home</button>
         </NavLink>
         <NavLink to="/form">
            <button>form</button>
         </NavLink>
         <SearchBar />
      </div>
   );
}

export default NavBar;
