import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React, { useState } from "react";
import Cookies from "js-cookie";

import Menu from "./components/Menu";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import MyListPage from "./pages/MyListPAge";
import MoviesPage from "./pages/MoviesPage";
import NewPage from "./pages/NewPage";
import PopularPage from "./pages/PopularPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage "; 
import SearchResults from "./pages/SearchResults";
import OtpPage from "./pages/OtpPage";
import ProfilesPage from "./pages/ProfilePage";
import BrowsePage from "./pages/BrowsePage";
import Help from "./pages/Help";
import Pricing from "./pages/Pricing";
import MyAccount from "./pages/MyAccount";
import Profile from "./account/profile";
import Membership from "./account/membership";
import ReferFriend from "./account/referfriend";

// ✅ Protected route component
const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const token = Cookies.get("token") || localStorage.getItem("token");
  return token ? element : <Navigate to="/login" replace />;
};

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <Router>
      <Menu onSearch={handleSearch} />
      <br /><br /><br /><br />

      <Routes>
        <Route path="/" element={<HomePage searchQuery={searchQuery} />} />
        <Route path="/guest/search" element={<SearchResults />} />
        <Route path="/home" element={<HomePage searchQuery={searchQuery} />} />
        <Route path="/movies" element={<MoviesPage searchQuery={searchQuery} />} />
        <Route path="/new" element={<NewPage />} />
        <Route path="/popular" element={<PopularPage />} />
        <Route path="/mylist" element={<MyListPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/otp" element={<OtpPage />} />
        <Route path="/browse" element={<ProtectedRoute element={<BrowsePage />} />} />
        <Route path="/profiles" element={<ProfilesPage />} />
        <Route path="/help" element={<Help />} />
        <Route path="/my-account" element={<ProtectedRoute element={<MyAccount />} />} />
        <Route path="/pricing" element={<Pricing />} /> 
        <Route path="/account/membership"  element={ <ProtectedRoute element={<Membership />}/> } /> 
        <Route path="/account/profile"  element={ <ProtectedRoute element={<Profile />}/> } />
        <Route path="/account/referfriend"  element={ <ProtectedRoute element={<ReferFriend />}/> } />
        <Route path="/guest/movies/genre/:genreId" element={<MoviesPage searchQuery="" />} />
      </Routes>

      <Footer />
    </Router>
  );
};

export default App;
