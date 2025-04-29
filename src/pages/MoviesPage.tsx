import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BannerList from "../components/BannerList";
import MoviesList from "../components/MoviesList";
import useMovieMetadata from "../hooks/useMovieMetadata";
import GenreBlockList from "../components/GenreBlockList";
import "../index.css";

interface Genre {
  id: string;
  title: string;
}

interface Language {
  id: string;
  title: string;
}

interface MoviesPageProps {
  searchQuery: string;
}

const MoviesPage: React.FC<MoviesPageProps> = ({ searchQuery }) => {
  const { genreId } = useParams();
  const navigate = useNavigate();

  const {
    genres,
    languages,
    isGenresLoading,
    isLanguagesLoading,
    error,
  } = useMovieMetadata();

  const [selectedGenre, setSelectedGenre] = useState<string>(genreId || "");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");

  useEffect(() => {
    if (genreId) {
      setSelectedGenre(genreId);
    }
  }, [genreId]);

  useEffect(() => {
    if (selectedGenre !== "" && selectedGenre !== genreId) {
      const newUrl = `/guest/movies/genre/${selectedGenre}`;
      window.location.href = newUrl;
    }
  }, [selectedGenre, genreId]);

  if (isGenresLoading || isLanguagesLoading) return <div>Loading filters...</div>;
  if (error) return <div>Error loading filters.</div>;

  const selectedGenreTitle =
    genres.find((genre: Genre) => genre.id === selectedGenre)?.title || "Tamil";

  return (
    <div className="homepage px-4">
      <div className="banner-wrapper">
        <BannerList
          pageId={2}
          genreId={selectedGenre ? parseInt(selectedGenre) : undefined}
        />
      </div>

      <div className="movie-list-wrapper"> 
        {selectedGenre && (
          <GenreBlockList genreId={parseInt(selectedGenre)} />
        )}
 
        {!selectedGenre && (
           <MoviesList
            searchQuery={searchQuery}
            selectedGenre={selectedGenre}
            selectedLanguage={selectedLanguage}
            title="Movies"
          />
        )}

        {/* ✅ Show MoviesList with all movies when no genre is selected */}
        {!selectedGenre && (
          <MoviesList
          searchQuery={searchQuery}
          filterIds={["2", "5"]} // Filter for Thriller Movies
          title="Thriller Movies"
        />
        )}
      </div> 

      <div className="dropdown-center">
        <div className="custom-dropdownleft-wrapper">
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className={`custom-dropdownleft ${selectedGenre === "" ? "red-option" : ""}`}
          >
            <option value="">Genres</option>
            {genres.map((genre: Genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.title}
              </option>
            ))}
          </select>
        </div>

        <div className="custom-dropdown-wrapper">
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className={`custom-dropdown ${selectedLanguage === "" ? "red-option" : ""}`}
          >
            <option value="">Languages</option>
            {languages.map((language: Language) => (
              <option key={language.id} value={language.id}>
                {language.title}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default MoviesPage;
