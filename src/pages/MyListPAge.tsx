import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { IMAGE_BASE_URL } from "../services/moviesApiClient";
import Hls from "hls.js"; 
import { Volume2, VolumeX, X } from "lucide-react";
import playIcon from "../assets/play.png";
import tickIcon from "../assets/tick.png";
import likeIcon from "../assets/like.png";
import downIcon from "../assets/down.png";
import plusIcon from "../assets/plus.png";  
import { CircularProgress, Skeleton } from "@mui/material";

interface Genre {
  id: string;
  title: string;
}

interface Lang {
  id: string;
  title: string;
}

interface CastMember {
  id: string;
  name: string;
}

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

const MyListPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [myList, setMyList] = useState<Movie[]>([]);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);


  useEffect(() => { 
    const token = localStorage.getItem("token");

    if (!token) { 
      setIsLoggedIn(false);
      navigate("/login");  
    } else {
      setIsLoggedIn(true);
    }

    const savedList = JSON.parse(localStorage.getItem("myList") || "[]");
    setMyList(savedList);

    setTimeout(() => {
    setLoading(false); // simulate network
  }, 1500); // loader delay
}, 
   [navigate]);

  const addToList = (movie: Movie) => {
    const currentList = JSON.parse(localStorage.getItem("myList") || "[]");
    const updatedList = [...currentList, movie];
    localStorage.setItem("myList", JSON.stringify(updatedList));
    setMyList(updatedList);  // Update state to re-render the component
  };

  const removeFromList = (movie: Movie) => {
    const currentList = JSON.parse(localStorage.getItem("myList") || "[]");
    const updatedList = currentList.filter((m: Movie) => m.id !== movie.id);
    localStorage.setItem("myList", JSON.stringify(updatedList));
    setMyList(updatedList);  // Update state to re-render the component
  };
    const renderMovies = () => {
    if (myList.length === 0) return <p>Your list is empty.</p>;
 if (loading) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "10px", backgroundColor:"#191919" }}>
      <CircularProgress size={40} thickness={2} style={{ marginBottom: "30px", color: "#ad5766" }} />
      <div className="movies-grid">
        {Array.from({ length: 2 }).map((_, i) => (
          <div className="movie-card" key={i}>
            <Skeleton
              variant="rectangular"
              width="100%"
              height={200}
              sx={{ bgcolor: "#191919", borderRadius: "8px" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

    return (
      <div className="movies-grid">
        {myList.map((movie, index) => {
          const uniqueHoverId = `movie-${movie.id}-${index}`;
          const isHovered = hoveredId === uniqueHoverId;

          return (
            <div
              key={movie.id}
              className="movie-card"
              onMouseEnter={() => setHoveredId(uniqueHoverId)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {isHovered ? (
                <div className="trailer-container">
                  {movie.trailer ? (
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
                        alt="Add/Remove from List"
                        className="action-icon"
                        onClick={() => {
                          if (myList.some((m) => m.id === movie.id)) {
                            removeFromList(movie);
                          } else {
                            addToList(movie);
                          }
                        }}
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
    );
  };

  return (
    <div >
      <h1 style={{ padding: "70px", background: "#191919", color: "white", marginTop: "-64px", marginBottom: "-0px" , paddingTop:"130px"}}>My List</h1>
      <div className="my-list-overlay">
        {renderMovies()}

        {selectedMovie && (
          <MoviePopup
            movie={selectedMovie}
            onClose={() => setSelectedMovie(null)}
          />
        )}
      </div>
    </div>
  );
};

const HlsVideo: React.FC<{ src: string }> = ({ src }) => {
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  React.useEffect(() => {
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
      >
        <source src={src} type="video/mp4" />
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
                <img src={tickIcon} alt="Add to List" className="action-icon" />
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

export default MyListPage;
