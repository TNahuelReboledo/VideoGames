import React, { useEffect } from 'react'
import CardsContainer from '../../components/CardsContainer/CardsContainer'
import { useDispatch } from 'react-redux'
import { allGames } from '../../redux/actions';

const Home = () => {

   const dispatch = useDispatch();

   useEffect(()=>{
      dispatch(allGames())
   },[])

   return (
      <div>
         Home
         <CardsContainer/>
      </div>
   )
}

export default Home