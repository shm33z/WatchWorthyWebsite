import React from "react";
import { useState } from "react";
import Navigation from "./Sidenav/sidenav";
import Movies from "./Pages/movies";
import Liked from "./Pages/liked";
import Watchlist from "./Pages/watchlist";
import MoviePoster from "./MoviePoster";

function Homepage() {
  const [currentPage, setCurrentPage] = useState("Movies");
  const [likedMovies, setLikedMovies] = useState([]);
  const [wishlistMovies, setWishlistMovies] = useState([]);
  const [movies] = useState([
    {
      name: "American Psycho",
      image:
        "https://m.media-amazon.com/images/M/MV5BZTM2ZGJmNjQtN2UyOS00NjcxLWFjMDktMDE2NzMyNTZlZTBiXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
    },
    {
      name: "Ice Age",
      image:
        "https://m.media-amazon.com/images/M/MV5BM2JmZGJkNzAtOWI0MC00ZmE5LWIwMjYtODU0OGUxNDg4ZDkwXkEyXkFqcGdeQXVyMTA5ODEyNTc5._V1_.jpg",
    },
    {
      name: "Over The Hedge",
      image:
        "https://m.media-amazon.com/images/M/MV5BMWVhNTA1YzItZDNlMy00NDJmLTkyMWQtMTAxZWJkMWU0OTBlXkEyXkFqcGdeQXVyMTcwOTQzOTYy._V1_FMjpg_UX1000_.jpg",
    },
    {
      name: "Puss in Boots: The Last Wish",
      image:
        "https://m.media-amazon.com/images/M/MV5BNjMyMDBjMGUtNDUzZi00N2MwLTg1MjItZTk2MDE1OTZmNTYxXkEyXkFqcGdeQXVyMTQ5NjA0NDM0._V1_.jpg",
    },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      setCurrentPage("Movies");
    } else {
      const results = movies.filter((movie) =>
        movie.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      console.log(results);
      setSearchResults(results);
      setCurrentPage(results.length > 0 ? "SearchResults" : "NotFound");
    }
  };
  const handleLike = (movie) => {
    setLikedMovies((prev) => {
      if (!prev.some((m) => m.name === movie.name)) {
        return [...prev, movie];
      }
      return prev;
    });
    /*Learned about array fromhttps://www.w3schools.com/js/js_arrays.asp#gsc.tab=0*/
  };

  const handleWishlist = (movie) => {
    setWishlistMovies((prev) => {
      if (!prev.some((m) => m.name === movie.name)) {
        return [...prev, movie];
      }
      return prev;
    });
  };

  const renderPage = () => {
    switch (currentPage) {
      case "Movies":
        return (
          <div>
            <Movies
              movies={movies}
              onLike={handleLike}
              onWishlist={handleWishlist}
            />
          </div>
        );
      case "Liked":
        return <Liked movies={likedMovies} />;
      case "Watchlist":
        return <Watchlist movies={wishlistMovies} />;
      case "SearchResults":
        return (
          <div>
            {searchResults.length > 0 ? (
              <Movies
                movies={searchResults}
                onLike={handleLike}
                onWishlist={handleWishlist}
              />
            ) : (
              <div className="text-center text-xl font-semibold mt-4">
                Not found
              </div>
            )}
          </div>
        );
      default:
        return (
          <Movies
            movies={movies}
            onLike={handleLike}
            onWishlist={handleWishlist}
          />
        );
    }
  };

  return (
    <div className="flex">
      <Navigation setCurrentPage={setCurrentPage} handleSearch={handleSearch} />
      <main className="w-3/4 p-4">
        <div className="flex items-center">
          <input
            type="text"
            className="border border-black px-3 py-1 mr-2"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="bg-gray-800 text-white px-4 py-1 rounded hover:bg-blue"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        {renderPage()}
      </main>
    </div>
  );
}

export default Homepage;
