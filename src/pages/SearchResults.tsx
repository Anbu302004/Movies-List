import { useLocation } from "react-router-dom";
import MoviesList from "../components/MoviesList";
import Menu from "../components/Menu";
import Footer from "../components/Footer";

const useQuery = () => new URLSearchParams(useLocation().search);

const SearchResults = () => {
  const query = useQuery();
  const search = query.get("search") || "";

  return (
    <div className="search-overlay">
        <div className="search-results"  >
        <h1 style={{padding: "70px",
             background: "#191919",
              color : "white", marginTop: "-70px",
               marginBottom: "-0px", 
               }}> </h1>
          <MoviesList searchQuery={search} title={`Search:"${search}"`} />
        
        </div>
    </div>
  );
};

export default SearchResults;
