import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import VedioTitle from "./VedioTitle";
import VedioBackground from "./VedioBackground";
import { addNowPlayingMovies } from "../utils/movieSlice";
import { TMDB_API_KEY } from "../utils/Constant";

const MainContainer = () => {
    //   const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB_API_KEY}`;
    //   const dispatch = useDispatch();
      const movies = useSelector((store) => store.movies?.nowPlayingMovies);

      if (!movies || !Array.isArray(movies) || movies.length === 0) {
        console.log("No movies found");
        return <div>Loading...</div>; // Show a loading state
      }
    
      console.log("Movies from selector:", movies);
    
      const mainMovie = movies[0];
      console.log("Main movie:", mainMovie);

      const {original_title, overview} = mainMovie;
    

  return (
    <div className='pt-23 '>
        <VedioTitle title={original_title} overview={overview} />  
       {/* <VedioBackground movieId={mainMovie} />  */}
       <VedioBackground movieId={mainMovie} /> 
    </div>
  );
};

export default MainContainer;
