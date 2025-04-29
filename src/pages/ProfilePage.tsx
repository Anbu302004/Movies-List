import React, { useEffect, useState } from "react";
import moviesApiClient from "../services/authApiClient";
import { useNavigate } from "react-router-dom";

interface Profile {
  id: string;
  name: string;
  autoplay: number;
  is_child: number;
  profileicon: {
    id: string;
    title: string;
    thumbnail: string;
  };
}

const ProfilesPage: React.FC = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const navigate = useNavigate();

  // Function to handle profile selection
  const handleProfileSelect = (profile: Profile) => {
    localStorage.setItem("selected_profile_id", profile.id);
    localStorage.setItem("selected_profile_name", profile.name);
    console.log("Selected Profile:", profile);
  
    // Redirect to homepage or dashboard
    navigate("/home");
  };

  // Fetch profiles on component mount
  useEffect(() => {
    const fetchProfiles = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Token not found. Please login/register again.");
        return;
      }

      try {
        const response = await moviesApiClient.get("/userprofilelist", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Profile data:", response.data);
        setProfiles(response.data.data); // Adjust based on actual response structure
      } catch (error) {
        console.error("Failed to fetch profiles:", error);
        alert("Failed to load profiles.");
      }
    };

    fetchProfiles();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>User Profiles</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {profiles.map((profile) => (
          <li
            key={profile.id}
            onClick={() => handleProfileSelect(profile)}
            style={{
              cursor: "pointer",
              padding: "10px",
              marginBottom: "10px",
              background: "#f3f3f3",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              src={profile.profileicon.thumbnail}
              alt={profile.profileicon.title}
              width={60}
              style={{ marginRight: "15px", borderRadius: "6px" }}
            />
            <strong>{profile.name}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfilesPage;
