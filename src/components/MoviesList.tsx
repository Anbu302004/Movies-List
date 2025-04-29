import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import useMovies from "../hooks/useMovies";
import { IMAGE_BASE_URL } from "../services/moviesApiClient";
import "../index.css";
import { Volume2, VolumeX, X } from "lucide-react";
import playIcon from "../assets/play.png";
import plusIcon from "../assets/plus.png";
import likeIcon from "../assets/like.png";
import downIcon from "../assets/down.png";
import leftWhiteIcon from "../assets/left-white.png";
import rightWhiteIcon from "../assets/right-white.png";
import tickIcon from "../assets/tick.png";

interface CastMember {
  id: string;
  name: string;
}

interface Genre {
  id: string;
  title: string;
}

interface Language {
  id: string;
  title: string;
}

interface Movie {
  id: string;
  title: string;
  image: string;
  trailer: string;
  duration_text: string;
  certificate: string;
  content_plain: string;
  topten: boolean;
  genres: Genre[];
  languages: Language[];
  director: CastMember[];
  actors: CastMember[];
  actresses: CastMember[];
}

interface MoviesListProps {
  searchQuery: string;
  filterIds?: string[];
  title?: string;
  selectedGenre?: string;
  selectedLanguage?: string;
}

const MoviesList: React.FC<MoviesListProps> = ({
  searchQuery,
  filterIds,
  title,
  selectedGenre,
  selectedLanguage,
}) => {
  const { data: movies, isLoading, error } = useMovies();
  const [hoveredMovie, setHoveredMovie] = useState<string | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const moviesPerPage = 5;
   const [myList, setMyList] = useState<Movie[]>([]);
  
    useEffect(() => {
      const storedList = JSON.parse(localStorage.getItem("myList") || "[]");
      setMyList(storedList);
    }, []);
  
    const toggleMyList = (movie: Movie) => {
      const exists = myList.some((m) => m.id === movie.id);
      const updatedList = exists ? myList.filter((m) => m.id !== movie.id) : [...myList, movie];
      setMyList(updatedList);
      localStorage.setItem("myList", JSON.stringify(updatedList));
    };

  if (isLoading) return <p>Loading movies...</p>;
  if (error) return <p>Error loading movies: {error.message}</p>;

  const filteredMovies = movies?.filter((movie: Movie) => {
    const matchesQuery = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = !selectedGenre || movie.genres.some(g => g.id === selectedGenre);
    const matchesLanguage = !selectedLanguage || movie.languages.some(l => l.id === selectedLanguage);
    const matchesFilterIds = !filterIds || filterIds.includes(movie.id);
    return matchesQuery && matchesGenre && matchesLanguage && matchesFilterIds;
  }) || [];

  const handleNext = () => {
    if (currentIndex + moviesPerPage < filteredMovies.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const currentMovies = filteredMovies.slice(currentIndex, currentIndex + moviesPerPage);
  const showNavigation = filteredMovies.length > moviesPerPage;

  return (
    <div className="popular-container">
      {title && <h1 className="popular-heading">{title}</h1>}
      <div className="movies-container">
        <div className="movies-row">
          {showNavigation && (
            <button
              className="nav-button prev-button"
              onClick={handlePrevious}
              disabled={currentIndex === 0}
            >
              <img src={leftWhiteIcon} alt="Previous" className="nav-icon" />
            </button>
          )}
          <div className="movies-grid">
            {currentMovies.length > 0 ? (
              currentMovies.map((movie) => (
                <div
                  key={movie.id}
                  className="movie-card"
                  onMouseEnter={() => setHoveredMovie(movie.id)}
                  onMouseLeave={() => setHoveredMovie(null)}
                >
                  {hoveredMovie === movie.id ? (
                    <div className="trailer-container">
                      {movie.trailer ? (
                        <HlsVideo src={movie.trailer} />
                      ) : (
                        <img src={`${IMAGE_BASE_URL}${movie.image}`} alt={movie.title} className="movie-image" />
                      )}
                      <div className="movie-actions">
                        <div className="action-icons-left">
                          <img src={playIcon} alt="Play" className="action-icon" />
                          <img
                          src={myList.some((m) => m.id === movie.id) ? tickIcon : plusIcon}
                          alt="Toggle My List"
                          className="action-icon"
                          onClick={() => toggleMyList(movie)}
                        />
                          <img src={likeIcon} alt="Like" className="action-icon" />
                        </div>
                        <img
                          src={downIcon}
                          alt="More"
                          className="action-icon down-icon"
                          onClick={() => setSelectedMovie(movie)}
                        />
                      </div>
                      <div className="movie-info">
                        {movie.topten && <div className="top-ten-badge">Top 10</div>}
                        <span className="duration">{movie.duration_text}</span>
                        <span className="certificate">{movie.certificate}</span>
                      </div>
                      <ul className="movie-genres">
                        {movie.genres.map((genre) => (
                          <li key={genre.id}>{genre.title}</li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div className="movie-default">
                      <img src={`${IMAGE_BASE_URL}${movie.image}`} alt={movie.title} className="movie-image" />
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p>No movies found.</p>
            )}
          </div>
          {showNavigation && (
            <button
              className="nav-button next-button"
              onClick={handleNext}
              disabled={currentIndex + moviesPerPage >= filteredMovies.length}
            >
              <img src={rightWhiteIcon} alt="Next" className="nav-icon" />
            </button>
          )}
        </div>
        {selectedMovie && <MoviePopup movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}
      </div>
    </div>
  );
};

const HlsVideo: React.FC<{ src: string }> = ({ src }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (videoRef.current && src.endsWith(".m3u8")) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(videoRef.current);
    }
  }, [src]);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="video-container">
      <video ref={videoRef} className="trailer-video" autoPlay loop muted={isMuted} playsInline>
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <button className="mute-button" onClick={toggleMute}>
        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </button>
    </div>
  );
};

const MoviePopup: React.FC<{ movie: Movie; onClose: () => void }> = ({ movie, onClose }) => {
  const [showTrailer, setShowTrailer] = useState(false);

  const handleImageClick = () => {
    setShowTrailer(true);
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content scrollable-popup" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          <X size={24} />
        </button>
        <div className="popup-banner" onClick={handleImageClick}>
          {showTrailer && movie.trailer ? (
            <HlsVideo src={movie.trailer} />
          ) : (
            <img
              src={`${IMAGE_BASE_URL}${movie.image}`}
              alt={movie.title}
              className="popup-image"
              style={{ cursor: movie.trailer ? "pointer" : "default" }}
            />
          )}
          <div className="popup-banner-overlay">
            <div className="movie-actions">
              <div className="action-icons-center">
                <img src={playIcon} alt="Play" className="action-icon" />
                <img src={plusIcon} alt="Add to List" className="action-icon" />
                <img src={likeIcon} alt="Like" className="action-icon" />
              </div>
            </div>
          </div>
        </div>
        <div className="popup-details">
          <div className="left-section">
            <span className="badge">{movie.certificate}</span>
            <span className="duration">{movie.duration_text}</span>
            <h3>About {movie.title}</h3>
            <p className="description">{movie.content_plain || "No description available."}</p>
          </div>
          <div className="right-section">
            <p><strong>Genres:</strong> {movie.genres.map((g) => g.title).join(", ")}</p>
            <p><strong>Director:</strong> {movie.director.map(d => d.name).join(", ") || "Unknown"}</p>
            <p><strong>Actors:</strong> {movie.actors.map(a => a.name).join(", ") || "N/A"}</p>
            <p><strong>Actresses:</strong> {movie.actresses.map(a => a.name).join(", ") || "N/A"}</p>
            <p><strong>Languages:</strong> {movie.languages.map((l) => l.title).join(", ")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviesList;
