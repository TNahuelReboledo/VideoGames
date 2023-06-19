import React from 'react';
import { NavLink } from 'react-router-dom'


const Landing = () => {
   return (
      <div>
         <h1>Wellcome</h1>
         <NavLink to='/home'>
            <button>Home</button>
         </NavLink>
      </div>
   )
}

export default Landing