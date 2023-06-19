import React, { useState } from 'react';
import { findGames } from '../../../redux/actions';
import { useDispatch } from 'react-redux';


const SearchBar = () => {

   const dispatch = useDispatch();

   const [name, setName] = useState('');

   const handleChange = (e) => {
		setName(e.target.value);
	}

   const handleSubmit = () =>{
      dispatch((findGames(name)))
   }

   return (
      <div>
         <input type="search" value={name} onChange={handleChange} placeholder='name of videogame...' />
         <button onClick={handleSubmit} >Search</button>
      </div>
   )
}

export default SearchBar