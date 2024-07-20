import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import VedioTitle from "./VedioTitle";
import VedioBackground from "./VedioBackground";
import { addNowPlayingMovies } from "../utils/movieSlice";
import { TMDB_API_KEY } from "../utils/Constant";

const MainContainer = () => {
  const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB_API_KEY}`;
  const dispatch = useDispatch();
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);

  // const getNowPlayingMovies = async() =>
  //   {
  //     const data = await fetch(url)
  //     const json = await data.json();
  //    // console.log("json data" + JSON.stringify(json));
  //     // alert(json?.results[0]?.original_title);
  //    dispatch(addNowPlayingMovies(json));
  //   }

  //   useEffect(()=>
  //     {
  //       getNowPlayingMovies();
  //     },[])

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await fetch(url);
      const json = await data.json();
      console.log("Fetched movies:", json);
      dispatch(addNowPlayingMovies(json));
    };

    if (!movies) {
      fetchMovies();
    }
  }, [movies, dispatch, url]);

  if (!movies || !Array.isArray(movies) || movies.length === 0) {
    console.log("No movies found");
    return <div>Loading...</div>; // Show a loading state
  }

  console.log("Movies from selector:", movies);

  const mainMovie = movies[0];
  console.log("Main movie:", mainMovie);

  //    const mainMovie = movies[0];
  //    console.log(mainMovie);

  const {original_title, overview} = mainMovie;

  return (
    <div className='pt-24 px-6'>
       <VedioTitle title={original_title} overview={overview} /> 
       <VedioBackground movieId={mainMovie} /> 
    </div>
  );
};

export default MainContainer;
