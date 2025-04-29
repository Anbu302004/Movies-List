import React from "react";
import BannerList from "../components/BannerList";
import MoviesList from "../components/MoviesList";
import BlockList from "../components/BlockList";

const HomePage: React.FC<{ searchQuery: string }> = ({ searchQuery }) => {
    return (
        <> 
            <BannerList  pageId={1}/>
            <MoviesList searchQuery={searchQuery} title="Most Popular" />
            <BlockList />
        </>
    );
};

export default HomePage;
