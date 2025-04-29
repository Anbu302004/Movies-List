import { useQuery } from "@tanstack/react-query";
import moviesApiClient from "../services/moviesApiClient";

interface CastMember {
    id: string;
    name: string;
}

export interface Movie {
    id: string;
    title: string;
    image: string;
    trailer: string;
    duration_text: string;
    certificate: string;
    topten: boolean;
    content_plain: string;
    genres: { id: string; title: string }[];
    languages: { id: string; title: string }[];
    director: CastMember[];
    actors: CastMember[];
    actresses: CastMember[];
}

// Utility function to parse casts
const parseCasts = (casts: any[]): {
    director: CastMember[];
    actors: CastMember[];
    actresses: CastMember[];
} => {
    const director = casts
        .filter((c) => c.group_slug === "director")
        .map((c) => ({ id: c.cast.id, name: c.cast.name }));

    const actors = casts
        .filter((c) => c.group_slug === "actor")
        .map((c) => ({ id: c.cast.id, name: c.cast.name }));

    const actresses = casts
        .filter((c) => c.group_slug === "actress")
        .map((c) => ({ id: c.cast.id, name: c.cast.name }));

    return { director, actors, actresses };
};

const fetchPageMovies = async (pageTitle: string): Promise<Movie[]> => {
    const blocksResponse = await moviesApiClient.get("/blockslist?page_id=3");
    const moviesResponse = await moviesApiClient.get("/movieslist");

    if (!blocksResponse.data?.data) {
        throw new Error("Invalid blocks API response format");
    }

    const block = blocksResponse.data.data.find((block: any) => block.title === pageTitle);

    if (!block?.movies) {
        return [];
    }

    const allMovies = moviesResponse.data?.data || [];

    return block.movies.map((movie: any) => {
        const popupDetails = allMovies.find((m: any) => m.id === movie.id) || {};
        const { director, actors, actresses } = parseCasts(popupDetails.casts || []);

        return {
            id: movie.id,
            title: movie.title,
            image: movie.image,
            trailer: popupDetails.trailer || movie.trailer || "",
            duration_text: popupDetails.duration_text || movie.duration_text || "Unknown",
            certificate: popupDetails.certificate || movie.certificate || "N/A",
            topten: movie.topten || false,
            genres: popupDetails.genres || movie.genres || [],
            content_plain: popupDetails.content_plain || movie.content_plain || "",
            languages: popupDetails.languages || movie.languages || [],
            director,
            actors,
            actresses,
        };
    });
};

const usePageMovies = (pageTitle: string) => {
    return useQuery<Movie[]>({
        queryKey: ["pageMovies", pageTitle],
        queryFn: () => fetchPageMovies(pageTitle),
    });
};

export default usePageMovies;
