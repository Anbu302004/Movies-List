import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Hls from "hls.js";
import moviesApiClient from "../services/authApiClient";

const WatchMovie = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const [movieData, setMovieData] = useState<any>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const token = localStorage.getItem("token");
      const profileId = JSON.parse(localStorage.getItem("userProfile") || "{}")?.profile_id;

      if (!token || !profileId) {
        navigate("/login");
        return;
      }

      try {
        const res = await moviesApiClient.get(`/getusermovie/${id}?profile_id=${profileId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data?.data?.plan_status === 1) {
          setMovieData(res.data.data);
        } else {
          alert("❌ You must have an active plan to watch this movie.");
          navigate("/pricing");
        }
      } catch (err) {
        console.error("Error loading movie", err);
        navigate("/");
      }
    };

    fetchMovie();
  }, [id]);

  useEffect(() => {
    if (movieData && videoRef.current) {
      const video = videoRef.current;
      const videoUrl = movieData.video_url_720p || movieData.trailer;

      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(videoUrl);
        hls.attachMedia(video);
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = videoUrl;
      }
    }
  }, [movieData]);

  if (!movieData) return <p style={{ color: "#fff" }}>Loading movie...</p>;

  return (
    <div style={{ backgroundColor: "#000", height: "100vh" }}>
      <video
        ref={videoRef}
        controls
        autoPlay
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
      />
    </div>
  );
};

export default WatchMovie;
