import React, { useState, useRef, useEffect } from 'react';
import { useGenreBlock } from '../hooks/useGenreBlock';
import { IMAGE_BASE_URL } from '../services/moviesApiClient';
import { Volume2, VolumeX } from "lucide-react";
import playIcon from "../assets/play.png";
import plusIcon from "../assets/plus.png";
import likeIcon from "../assets/like.png";
import downIcon from "../assets/down.png";
import Hls from 'hls.js';
import { useNavigate } from 'react-router-dom';

interface Props {
  genreId: number;
}

interface Genre {
  id: string;
  title: string;
}

interface lang {
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
  languages: lang[];
  director: CastMember[];
  actors: CastMember[];
  actresses: CastMember[];
}

const GenreBlockList: React.FC<Props> = ({ genreId }) => {
  const { data, isLoading, isError } = useGenreBlock(genreId);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);
  const navigate = useNavigate();

  if (isLoading) return <p>Loading movies...</p>;
  if (isError) return <p>Something went wrong!</p>;
  if (!data || data.every((block) => block.movies.length === 0)) {
    return (
      <div className="no-movies-message">
        <h1>Explore More Soon</h1>
        <p>No records matching your search criteria yet. Stay tuned for updates!</p>
        <button className="home-button" onClick={() => navigate('/')}>
          BESTCAST Home
        </button>
      </div>
    );
  }

  return (
    <div>
      {data.map((block) => (
        <div key={block.id} className="popular-container">
          <h1 className="popular-heading">{block.title}</h1>
          <div className="movies-grid">
            {block.movies.map((movie: Movie, index: number) => {
              const uniqueHoverId = `${block.title}-${movie.id}-${index}`;
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
                          <img src={plusIcon} alt="Add" className="action-icon" />
                          <img src={likeIcon} alt="Like" className="action-icon" />
                        </div>
                        <img
                          src={downIcon}
                          alt="More"
                          className="action-icon down-icon"
                          onClick={() => {
                            console.log("Setting selected movie ID:", movie.id);  // Debugging log
                            setSelectedMovieId(movie.id);
                          }}
                        />
                  </div>
                      <div className="movie-info">
                        <span className="duration">{movie.duration_text || "Not Provided"}</span>
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
        </div>
      ))}

      {selectedMovieId && (
        <MoviePopup
          movie={
            data.flatMap(block => block.movies).find(m => m.id === selectedMovieId)!
          }
          onClose={() => setSelectedMovieId(null)}
        />
      )}
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
        {/* Close Button */}
        <button className="close-button" onClick={onClose}>
          X
        </button>

        {/* Movie Image or Trailer Section */}
        <div className="popup-banner" onClick={handleImageClick}>
          {showTrailer && movie.trailer ? (
            <HlsVideo src={movie.trailer} />  // Display trailer if available
          ) : (
            <img
              src={`${IMAGE_BASE_URL}${movie.image}`}
              alt={movie.title}
              className="popup-image"
            />
          )}
        </div>

        {/* Movie Details Section */}
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
             
            <p><strong>Certificate:</strong> {movie.certificate}</p>

            <p><strong>Genres:</strong> {movie.genres?.length ? movie.genres.map(g => g.title).join(", ") : "N/A"}</p>
            <p><strong>Languages:</strong> {movie.languages?.length ? movie.languages.map(l => l.title).join(", ") : "N/A"}</p>
            <p><strong>Director:</strong> {movie.director?.length ? movie.director.map(d => d.name).join(", ") : "N/A"}</p>
            <p><strong>Actors:</strong> {movie.actors?.length ? movie.actors.map(a => a.name).join(", ") : "N/A"}</p>
            <p><strong>Actresses:</strong> {movie.actresses?.length ? movie.actresses.map(a => a.name).join(", ") : "N/A"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenreBlockList;
