import { useQuery } from "@tanstack/react-query";
import moviesApiClient from "../services/moviesApiClient";

interface GenreItem {
    id: string;
    title: string;
}

const fetchGenres = async (): Promise<GenreItem[]> => {
    const response = await moviesApiClient.get("/genreslist");

    if (!response.data || !Array.isArray(response.data.genres)) {
        throw new Error("Invalid API response format");
    }

    return response.data.genres;
};

const useGenres = () => {
    return useQuery<GenreItem[]>({ queryKey: ["genres"], queryFn: fetchGenres });
};

export default useGenres;
