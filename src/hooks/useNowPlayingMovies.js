import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { addNowPlayingMovies } from "../utils/movieSlice";
import { TMDB_API_KEY } from "../utils/Constant";


const useNowPlayingMovies = () => {
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


}

export default useNowPlayingMovies
