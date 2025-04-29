// imports
import helpIcon from "../assets/help-white.png"; 
import accountIcon from "../assets/account-white.png"; 
import pencilIcon from "../assets/pencil-white.png"; 

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import useMenu from "../hooks/useMenu";
import logo from "../assets/logo.png";
import searchWhite from "../assets/search-white.png";
import searchActive from "../assets/search.png";
import { FiMenu, FiX } from "react-icons/fi";
import "../index.css";
import profileIcon from "../assets/profile-1.jpg";

const Menu: React.FC<{ onSearch?: (query: string) => void }> = ({ onSearch }) => {
    const { data: menuItems, isLoading, error } = useMenu();
    const [searchQuery, setSearchQuery] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState<string | undefined>(undefined);
    const [userName, setUserName] = useState<string | undefined>(undefined);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkToken = () => {
            const tokenFromCookie = Cookies.get("token");
            if (tokenFromCookie !== token) {
                setToken(tokenFromCookie);
                setIsLoggedIn(!!tokenFromCookie);

                if (tokenFromCookie) {
                    const userNameFromCookie = Cookies.get("userName");
                    setUserName(userNameFromCookie);
                }
            }
        };

        checkToken();
        const interval = setInterval(checkToken, 1000);

        return () => clearInterval(interval);
    }, [token]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && searchQuery.trim()) {
            const encodedQuery = encodeURIComponent(searchQuery.trim());
            navigate(`/guest/search?search=${encodedQuery}`);
            if (onSearch) onSearch(searchQuery.trim());
        }
    };

    const handleLogoClick = () => {
        navigate("/");
        window.location.reload();
    };

    const handleMenuClick = (path: string) => {
        setIsMenuOpen(false);
        navigate(path);
        window.location.reload();
    };

    const handleLogout = () => {
        Cookies.remove("token");
        Cookies.remove("userName");
        setIsLoggedIn(false);
        setToken(undefined);
        setUserName(undefined);
        navigate("/login");
    };

    return (
        <nav className="menu-container">
            <div className="menu-content">
                <img
                    src={logo}
                    alt="Logo"
                    className="menu-logo"
                    onClick={handleLogoClick}
                    style={{ cursor: "pointer" }}
                />

                <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <FiX size={24} color="white" /> : <FiMenu size={24} color="white" />}
                </button>

                <ul className={`menu-list ${isMenuOpen ? "open" : ""}`}>
                    {isLoading ? (
                        <p>Loading menu...</p>
                    ) : error ? (
                        <p>Error: {error.message}</p>
                    ) : (
                        menuItems?.map((item) => (
                            <li key={item.id} className="menu-item">
                                <span
                                    onClick={() =>
                                        handleMenuClick(`/${item.name.toLowerCase().replace(/\s+/g, "")}`)
                                    }
                                    style={{ cursor: "pointer", color: "white", textDecoration: "none" }}
                                >
                                    {item.name}
                                </span>
                            </li>
                        ))
                    )}
                </ul>

                <div className={`search-container ${isFocused ? "focused" : ""}`}>
                    <img
                        src={isFocused ? searchActive : searchWhite}
                        alt="Search Icon"
                        className="search-input-icon"
                    />
                    <input
                        type="text"
                        className="search-bar"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        onKeyDown={handleSearchSubmit}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                    />
                </div>

                {isLoggedIn ? (
                    <div className="profile-menu">
                        <img
                            src={profileIcon}
                            alt="Profile"
                            className="profile-icon"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            style={{ cursor: "pointer", width: "38px", height: "38px", borderRadius: "3px" }}
                        />
                        {dropdownOpen && (
                            <div className="profile-dropdown">
                                <div className="profile-info">
                                    <img
                                        src={profileIcon}
                                        alt="Profile"
                                        className="profile-dropdown-icon"
                                        style={{ width: "35px", height: "35px" }}
                                    />
                                    <span style={{  marginLeft: "20px" }}>
                                        {userName || "User"}
                                    </span>
                                </div>
                                <ul>
                                    <li style={{ cursor: "pointer" }}>
                                        <img src={pencilIcon} alt="Manage" style={{ width: "17px",float: "left", marginRight: "10px" }} />
                                        Manage Profile
                                    </li>
                                    <li style={{ cursor: "pointer" }}>
                                        <img src={accountIcon} alt="Account" style={{ width: "17px", float: "left", marginRight: "10px"  }} />
                                        Account
                                    </li>
                                    <li style={{ cursor: "pointer" }}>
                                        <img src={helpIcon} alt="Help" style={{ width: "17px",float: "left", marginRight: "10px"  }} />
                                        Help Centre
                                    </li>
                                    <li onClick={handleLogout} style={{ cursor: "pointer",textAlign: "center"}} >
                                        Logout
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                ) : (
                    <button className="login-button" onClick={() => navigate("/login")}>
                        Login
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Menu;
