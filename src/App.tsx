import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menu from "./components/Menu";
import React, { useState } from "react";
import HomePage from "./pages/HomePage";
import MyListPage from "./pages/MyListPAge";
import MoviesPage from "./pages/MoviesPage"
import NewPage from "./pages/NewPage";
import PopularPage from "./pages/PopularPage";
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage ";
import Footer from "./components/Footer";
import SearchResults from "./pages/SearchResults";
import OtpPage from "./pages/OtpPage";
import ProfilesPage from "./pages/ProfilePage";
import BrowsePage from "./pages/BrowsePage";

const App: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    return (
        <Router>
            <Menu onSearch={handleSearch} /> <br/><br/><br/><br/>

            <Routes>
                <Route path="/" element={<HomePage searchQuery={searchQuery} />} />
                <Route path="/guest/search" element={<SearchResults />} />
                <Route path="/home" element={<HomePage searchQuery={searchQuery} />} />
                <Route path="/movies" element={<MoviesPage searchQuery={searchQuery}/>} />
                <Route path="/new" element={<NewPage  />} />
                <Route path="/popular" element={<PopularPage />}/>
                <Route path="/mylist" element={<MyListPage />} /> 
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/otp" element={<OtpPage />} /> 
                <Route path="/browse" element={<BrowsePage />} />
                <Route path='/profiles' element={<ProfilesPage />} />
                <Route path="/guest/movies/genre/:genreId" element={<MoviesPage searchQuery="" />} />

            </Routes>

            <Footer />
        </Router>
    );
};

export default App;
