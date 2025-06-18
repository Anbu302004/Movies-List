import React, { useRef, useEffect, useState } from "react";
import useBanners, { Banner } from "../hooks/useBanner";
import Hls from "hls.js";
import "../index.css";
import { Volume2, VolumeX, Play } from "lucide-react";

// Props with genreId included
interface BannerListProps {
  pageId: number;
  genreId?: number; // optional for default view
}

const BannerList: React.FC<BannerListProps> = ({ pageId, genreId }) => {
  const { data: banners = [], isLoading, error } = useBanners(pageId, genreId?.toString());

  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSkeleton(false), 1500); // Minimum loading duration
    return () => clearTimeout(timer);
  }, []);

  if (isLoading || showSkeleton) {
    return (
      <div
        style={{
          background: "#191919", 
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <div className="red-rectangle-spinner" />
      </div>
    );
  }

  if (error) return <p>{error.message}</p>;

  return (
    <div className="banner-container">
      <div className="banner-grid">
        {banners.map((banner: Banner) => (
          <div key={banner.id} className="banner-card">
            {banner.trailer.endsWith(".m3u8") ? (
              <HlsVideo src={banner.trailer} />
            ) : (
              <VideoPlayer src={banner.trailer} />
            )}

            <div className="banner-overlay">
              <p className="banner-text">{banner.content_plain}</p>
              <div className="banner-buttons">
                <button className="banner-btn play-btn">
                  <Play size={18} className="mr-1" /> Play
                </button>
                <button className="banner-btn info-btn">More Info</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const VideoPlayer: React.FC<{ src: string }> = ({ src }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="video-containerbanner">
      <video
        ref={videoRef}
        className="trailer-videobanner"
        autoPlay
        loop
        muted={isMuted}
        playsInline
        controlsList="nodownload nofullscreen noremoteplayback"
      >
        <source src={encodeURI(src)} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <button className="mute-button" onClick={toggleMute}>
        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </button>
    </div>
  );
};

const HlsVideo: React.FC<{ src: string }> = ({ src }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (videoRef.current && Hls.isSupported()) {
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
    <div className="video-containerbanner">
      <video
        ref={videoRef}
        className="trailer-videobanner"
        autoPlay
        loop
        muted={isMuted}
        playsInline
        controlsList="nodownload nofullscreen noremoteplayback"
      />
      <button className="mute-button" onClick={toggleMute}>
        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </button>
    </div>
  );
};

export default BannerList;
