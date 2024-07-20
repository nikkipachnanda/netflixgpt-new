import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTrailerVideo } from "../utils/movieSlice";
import { TMDB_API_KEY } from "../utils/Constant";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();
  //1022789 hard code id
  const url = `https://api.themoviedb.org/3/movie/${movieId.id}/videos?api_key=${TMDB_API_KEY}`;

  const getMovieVideos = async () => {
    try {
      console.log("Fetching URL:", url);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      console.log("Fetched videos:", json);

      if (!json.results || !Array.isArray(json.results)) {
        throw new Error("Unexpected API response structure");
      }

      const filterData = json.results.filter((video) => video.type === "Trailer");
      const trailer = filterData.length ? filterData[0] : json.results[0];
      console.log("One trailer:", JSON.stringify(trailer));

      dispatch(addTrailerVideo(trailer));
    } catch (error) {
      console.error("Error fetching movie videos:", error);
    }
  };

  useEffect(() => {
    console.log("Movie ID in hook:", movieId);
    if (movieId) {
      getMovieVideos();
    }
  }, [movieId, dispatch]);
};

export default useMovieTrailer;
