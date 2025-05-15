import React, { useState, useEffect, useRef } from "react";
import Hls from "hls.js";
import useBlockMovies from "../hooks/useBlockMovies";
import { IMAGE_BASE_URL } from "../services/moviesApiClient";
import "../index.css";
import { Volume2, VolumeX, X } from "lucide-react";
import playIcon from "../assets/play.png";
import plusIcon from "../assets/plus.png";
import likeIcon from "../assets/like.png";
import downIcon from "../assets/down.png";
import tickIcon from "../assets/tick.png";

interface Genre { id: string; title: string; }
interface Lang { id: string; title: string; }
interface CastMember { id: string; name: string; }

interface Movie {
  id: string;
  title: string;
  image: string;
  trailer: string;
  duration_text: string;
  certificate: string;
  topten: boolean;
  content_plain: string;
  genres: Genre[];
  languages: Lang[];
  director: CastMember[];
  actors: CastMember[];
  actresses: CastMember[];
}

interface BlockListProps {
  filterIds?: string[];
}

const BlockList: React.FC<BlockListProps> = ({ filterIds }) => {
  const { data: topten = [], isLoading: loadingNew, error: errorNew } = useBlockMovies("Top Ten Movies");
  const { data: newmovies = [], isLoading: loadingTrending, error: errorTrending } = useBlockMovies("New Movie For You");
  const { data: darkmovies = [], isLoading: loadingComedy, error: errorComedy } = useBlockMovies("Dark Movies");
  const { data: kidmovies  = [], isLoading: loadingkids  , error: errorkids  } = useBlockMovies("Kids Movies");
  const { data: romancemovies  = [], isLoading: loadingromance , error: errorromance   } = useBlockMovies("Romance Movies");


  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
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

  const filterMovies = (movies: Movie[]) =>
    filterIds ? movies.filter((movie) => filterIds.includes(movie.id)) : movies;

  if (loadingNew || loadingTrending || loadingComedy || loadingkids || loadingromance) return <p>Loading...</p>;
  if (errorNew || errorTrending || errorComedy ||errorkids || errorromance) return <p>Error loading movies.</p>;

  const renderMovies = (listTitle: string, movies: Movie[]) => {
    const filtered = filterMovies(movies);
    if (filtered.length === 0) return null;

    return (
      <div className="popular-container">
        <h1 className="popular-heading">{listTitle}</h1>
        <div className="movies-grid">
          {filtered.map((movie, index) => {
            const uniqueHoverId = `${listTitle}-${movie.id}-${index}`;
            const isHovered = hoveredId === uniqueHoverId;

            return (
              <div
                key={uniqueHoverId}
                className="movie-card"
                onMouseEnter={() => setHoveredId(uniqueHoverId)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {isHovered ? (
                  <div className="trailer-container">
                    {movie.trailer?.endsWith(".m3u8") ? (
                      <HlsVideo src={movie.trailer} />
                    ) : (
                      <img
                        src={`${IMAGE_BASE_URL}${movie.image}`}
                        alt={movie.title}
                        className="movie-image"
                      />
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
                    <img
                      src={`${IMAGE_BASE_URL}${movie.image}`}
                      alt={movie.title}
                      className="movie-image"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {selectedMovie && (
          <MoviePopup
            movie={selectedMovie}
            onClose={() => setSelectedMovie(null)}
            toggleMyList={toggleMyList}
            myList={myList}
          />
        )}
      </div>
    );
  };

  return (
    <>
      {renderMovies("Top Ten Movies", topten)}
      {renderMovies("New Movie For You", newmovies)}
      {renderMovies("Dark Movies", darkmovies)}
      {renderMovies("Kid Movies", kidmovies)}
      {renderMovies("Romance Movies", romancemovies)}
    </>
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
      <video
        ref={videoRef}
        className="trailer-video"
        autoPlay
        loop
        muted={isMuted}
        playsInline
      />
      <button className="mute-button" onClick={toggleMute}>
        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </button>
    </div>
  );
};

const MoviePopup: React.FC<{
  movie: Movie;
  onClose: () => void;
  toggleMyList: (movie: Movie) => void;
  myList: Movie[];
}> = ({ movie, onClose, toggleMyList, myList }) => {
  const [showTrailer, setShowTrailer] = useState(false);

  const handleImageClick = () => {
    if (movie.trailer) {
      setShowTrailer(true);
    }
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
            />
          )}
          <div className="popup-banner-overlay">
            <div className="movie-actions">
              <div className="action-icons-center">
                <img src={playIcon} alt="Play" className="action-icon" />
                <img
                  src={myList.some((m) => m.id === movie.id) ? tickIcon : plusIcon}
                  alt="My List"
                  className="action-icon"
                  onClick={() => toggleMyList(movie)}
                />
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
            <p className="description">
              {movie.content_plain || "No description available."}
            </p>
          </div>
          <div className="right-section">
            <p><strong>Genres:</strong> {movie.genres.map((g) => g.title).join(", ")}</p>
            <p><strong>Director:</strong> {movie.director.map((d) => d.name).join(", ") || "Unknown"}</p>
            <p><strong>Actors:</strong> {movie.actors.map((a) => a.name).join(", ") || "N/A"}</p>
            <p><strong>Actresses:</strong> {movie.actresses.map((a) => a.name).join(", ") || "N/A"}</p>
            <p><strong>Languages:</strong> {movie.languages.map((l) => l.title).join(", ")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockList;
