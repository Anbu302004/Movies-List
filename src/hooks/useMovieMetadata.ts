import { useQuery } from "@tanstack/react-query";
import moviesApiClient from "../services/moviesApiClient";

export interface Genre {
    id: string;
    title: string;
}

export interface Language {
    id: string;
    title: string;
}

const fetchGenres = async () => {
    const response = await moviesApiClient.get("/genrelist");
    if (!response.data || !response.data.data) {
        throw new Error("Invalid API response format");
    }

    // Add artificial delay (1.5 seconds)
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return response.data.data;
};

const fetchLanguages = async () => {
    const response = await moviesApiClient.get("/languagelist");
    if (!response.data || !response.data.data) {
        throw new Error("Invalid API response format");
    }

    // Add artificial delay (1.5 seconds)
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return response.data.data;
};

const useMovieMetadata = () => {
    const genresQuery = useQuery({
        queryKey: ["genres"],
        queryFn: fetchGenres,
    });

    const languagesQuery = useQuery({
        queryKey: ["languages"],
        queryFn: fetchLanguages,
    });

    return {
        genres: genresQuery.data ?? [],
        languages: languagesQuery.data ?? [],
        isGenresLoading: genresQuery.isLoading,
        isLanguagesLoading: languagesQuery.isLoading,
        error: genresQuery.error || languagesQuery.error,
    };
};

export default useMovieMetadata;
