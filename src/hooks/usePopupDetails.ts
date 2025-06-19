import { useQuery } from "@tanstack/react-query";
import moviesApiClient from "../services/moviesApiClient";

interface Genre {
    id: string;
    title: string;
}

interface lang {
    id: string;
    title: string;
}

interface CastMember {
    id: string;
    name: string;
}

interface Movie {
    id: string;
    title: string;
    image: string;
    trailer: string;
    duration_text: string;
    certificate: string;
    content_plain: string;
    genres: Genre[];
    languages: lang[];
    director: CastMember[];
    actors: CastMember[];
    actresses: CastMember[];
}

const fetchMovieDetails = async (id: string): Promise<Movie> => {
    const { data } = await moviesApiClient.get(`/getusermovie/${id}`);
    return data;
};

export const usePopupDetails = (id: string) => {
    return useQuery({
        queryKey: ['popupDetails', id],
        queryFn: () => fetchMovieDetails(id),
        enabled: !!id, // ensures it only runs when id is available
        staleTime: 1000 * 60 * 5, // optional: cache for 5 minutes
    });
};
