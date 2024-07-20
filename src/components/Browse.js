import React, { useEffect } from 'react'
import Header from './Header'
import MainContainer from './MainContainer';
import useNowPlayingMovies from '../hooks/useNowPlayingMovies';

const Browse = () => {

  //https://api.themoviedb.org/3/movie/now_playing?api_key=fd67045d6b112e5776c28fe3c81faf4e

  useNowPlayingMovies();
  return (

    <div className=''>
       <Header/> 
       <MainContainer/>
      Browse111
    </div>
  )
}

export default Browse
