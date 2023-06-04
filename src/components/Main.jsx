import React from "react";
import requests from "../Requests";
import axios from "axios";
const Main = () => {
  const [movies, setMovies] = React.useState([]);
  const [activeIndex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    axios.get(requests.requestPopular).then((res) => {
      setMovies(res.data.results);
    });
  }, []);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setActiveIndex((prevIndex) =>
        prevIndex === movies.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [activeIndex, movies.length]);

  const movie = movies[activeIndex];

  const truncateStr = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  const handleIndicatorClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="w-full h-[550px] text-white relative">
      <div className="w-full h-full">
        <div className="absolute w-full h-[550px] bg-gradient-to-r from-black"></div>
        <img
          className="w-full h-full object-cover"
          src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          alt={movie?.title}
        />
        <div className="absolute w-full top-[20%] p-4 md:p-8">
          <h1 className="text-3xl md:text-5xl font-bold">{movie?.title}</h1>
          <div className="my-4">
            <button className="border bg-white  font-bold text-black  border-gray-300 py-2 px-5 hover:bg-white/50 hover:text-white">
              Play
            </button>
            <button className="border text-white font-bold border-gray-300 py-2 px-5 ml-4">
              Watch Later
            </button>
          </div>
          <p className="text-gray-400 text-sm">Released: {movie?.release_date}</p>
          <p className="w-full mt-4 md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200">
            {truncateStr(movie?.overview, 190)}
          </p>
        </div>
      </div>
      <div className="absolute left-0 right-0 bottom-2 flex justify-center">
        {movies.map((m, index) => (
          <div
            key={m.id}
            className={`w-2 h-2 rounded-full mx-1 cursor-pointer ${
              index === activeIndex ? 'bg-white' : 'bg-gray-300'
            }`}
            onClick={() => handleIndicatorClick(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Main;