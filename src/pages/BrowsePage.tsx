import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import profile1 from "../assets/profile-1.jpg";
import pencilIcon from "../assets/pencil-white.png";
import "../index.css";

const BrowsePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { name } = location.state || { name: "Guest" };

  const [mode, setMode] = useState<"view" | "manage" | "edit" | "add">("view");
  const [newProfileName, setNewProfileName] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<string>(profile1);
  const [isChild, setIsChild] = useState<boolean>(false);
  const [allowPreview, setAllowPreview] = useState<boolean>(false);

  const handleProfileClick = () => {
    if (mode === "view") {
      navigate("/home");
    }
  };

  const handleManageProfiles = () => {
    setMode("manage");
  };

  const handleEditProfile = () => {
    setMode("edit");
  };

  const handleAddNew = () => {
    setMode("add");
  };

  const handleDone = () => {
    setMode("view");
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setSelectedImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteProfile = () => {
    // Logic for deleting profile
    console.log("Profile Deleted");
    setMode("view");
  };

  return (
    <div className="browse-page-container">
      {mode === "view" && (
        <>
          <h1 className="header">Who's watching?</h1>

          <div onClick={handleProfileClick} className="profile-container">
            <img src={selectedImage} alt="Profile" className="profile-img" />
            <p className="profile-name">{name}</p>
          </div>

          <div className="button-container">
            <button onClick={handleManageProfiles} className="action-button">
              Manage Profiles
            </button>
            <button onClick={handleAddNew} className="action-button">
              Add New
            </button>
          </div>
        </>
      )}

      {mode === "manage" && (
        <>
          <h1 className="header">Manage Profiles</h1>

          <div className="profile-container">
            <div className="profile-img-wrapper manage-wrapper">
              <img src={selectedImage} alt="Profile" className="profile-img manage" />
              <label htmlFor="image-upload" className="edit-icon">
                <img src={pencilIcon} alt="Edit" className="edit-icon-img" onClick={handleEditProfile} />
              </label>
            </div>
            <p className="profile-name">{name}</p>
          </div>

          <button onClick={handleDone} className="done-button">
            Done
          </button>
        </>
      )}

      {mode === "edit" && (
        <>
          <h1 className="header">Edit Profile</h1>

          <div className="profile-edit-container">
            <div className="profile-img-wrapper">
              <img src={selectedImage} alt="Profile" className="profile-img" />
              <label htmlFor="image-upload" className="edit-icon">
                <img src={pencilIcon} alt="Edit" className="edit-icon-img" />
              </label>

              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
            </div>

            <div className="form-fields-container" style={{float: "right", marginLeft: "40px"}}>
              <div className="input-container">
                <input
                  type="text"
                  value={newProfileName}
                  onChange={(e) => setNewProfileName(e.target.value)}
                  placeholder="Name"
                  className="input-field"
                />
              </div>

              <div className="checkbox-container">
                <label>
                  <input
                    type="checkbox"
                    checked={isChild}
                    onChange={() => setIsChild(!isChild)}
                    className="checkbox"
                  />
                  Is Child?
                </label>
              </div>

              <div className="checkbox-container">
                <label>
                  <input
                    type="checkbox"
                    checked={allowPreview}
                    onChange={() => setAllowPreview(!allowPreview)}
                    className="checkbox"
                  />
                  Allow to play movies preview?
                </label>
              </div>
            </div>

            <div className="button-container">
              <button onClick={handleDone} className="action-button">
                Update
              </button>
              <button onClick={handleDone} className="action-button">
                Cancel
              </button>
              <button onClick={handleDeleteProfile} className="action-button">
                Delete Profile
              </button>
            </div>
          </div>
        </>
      )}

      {mode === "add" && (
        <>
          <h1 className="header">Add New Profile</h1>

          <div className="profile-add-container">
            <div className="profile-img-wrapper">
              <img src={selectedImage} alt="New Profile" className="profile-img" />

              <label htmlFor="image-upload" className="edit-icon">
                <img src={pencilIcon} alt="Edit" className="edit-icon-img" />
              </label>

              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
            </div>

            <div className="form-fields-container">
              <div className="input-container">
                <input
                  type="text"
                  value={newProfileName}
                  onChange={(e) => setNewProfileName(e.target.value)}
                  placeholder="Name"
                  className="input-field"
                />
              </div>

              <div className="checkbox-container">
                <label>
                  <input type="checkbox" className="checkbox" />
                  Is Child?
                </label>
              </div>

              <div className="checkbox-container">
                <label>
                  <input type="checkbox" className="checkbox" />
                  Allow to play movies preview?
                </label>
              </div>

              <div className="input-container">
                <input
                  type="password"
                  placeholder="Set PIN (optional)"
                  className="input-field"
                />
              </div>
            </div>
          </div>

          <div className="button-container">
            <button onClick={handleDone} className="action-button">
              Save
            </button>
            <button onClick={handleDone} className="action-button">
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default BrowsePage;
