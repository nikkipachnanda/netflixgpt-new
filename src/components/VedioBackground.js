import React, { useEffect } from 'react'
import { TMDB_API_KEY } from '../utils/Constant';
import { useDispatch, useSelector } from 'react-redux';
import { addTrailerVideo } from '../utils/movieSlice';
import useMovieTrailer from '../hooks/useMovieTrailer';

const VedioBackground = ({movieId}) => {

  //Fetch trailer Vedio

  useMovieTrailer(movieId);
  const trailer = useSelector(store=> store.movies?.trailerVideo);


  return (
    <div>
      {trailer ? (
        <div className='w-screen'>
          <h1>{trailer.name}</h1>
          <iframe
            className='w-screen aspect-video'
            src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1`}
            title="YouTube video player"
    
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default VedioBackground
