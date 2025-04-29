import React, { useState } from "react";  
import BannerList from "../components/BannerList";
import MoviesList from "../components/MoviesList";
import useMovieMetadata from "../hooks/useMovieMetadata"; 
import { Genre, Language } from "../hooks/useMovieMetadata";  
import "../index.css";

const PopularPage: React.FC = () => { 
  const { genres, languages, isGenresLoading, isLanguagesLoading, error } = useMovieMetadata();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");

  if (isGenresLoading || isLanguagesLoading) return <div>Loading filters...</div>;
  if (error) return <div>Error loading filters.</div>;

  return (
    <div className="homepage px-4">
      <div className="banner-wrapper">
        <BannerList pageId={4} />

        <div className="dropdown-center">
          <div className="custom-dropdown-wrapper-move">
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className={`custom-dropdown ${selectedLanguage === "" ? "red-option" : ""}`}
            >
              <option value="">Languages</option>
              {languages.map((lang: Language) => (
                <option key={lang.id} value={lang.id}>
                  {lang.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <MoviesList
        searchQuery={searchQuery}
        selectedGenre={selectedGenre}
        selectedLanguage={selectedLanguage}
        title="Popular Movies"
      />
    </div>
  );
};

export default PopularPage;
