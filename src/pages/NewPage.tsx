import React from "react"; 
import NewPageMovieList from "../components/NewPageMovieList";

const NewPage: React.FC = () => {
  return (
    <div  > 
        <h1 style={{padding: "70px",
             background: "#191919",
              color : "white", marginTop: "-70px",
               marginBottom: "-0px",
               paddingTop: "90px"
               }}>New</h1>
        <NewPageMovieList />
    </div>
  );
};

export default NewPage;
