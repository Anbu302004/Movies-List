import { useQuery } from "@tanstack/react-query";
import moviesApiClient from "../services/moviesApiClient";

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
    topten: boolean;
    content_plain: string;
    genres: { id: string; title: string }[];
    languages: { id: string; title: string }[];
    director: CastMember[];
    actors: CastMember[];
    actresses: CastMember[];
}

const fetchMovies = async (): Promise<Movie[]> => {
    const response = await moviesApiClient.get("/movieslist");

    if (!response.data || !response.data.data) {
        throw new Error("Invalid API response format");
    }

    return response.data.data.map((movie: any) => {
        const casts = movie.casts || [];

        const director = casts
            .filter((c: any) => c.group_slug === "director")
            .map((c: any) => ({ id: c.cast.id, name: c.cast.name }));

        const actors = casts
            .filter((c: any) => c.group_slug === "actor")
            .map((c: any) => ({ id: c.cast.id, name: c.cast.name }));

        const actresses = casts
            .filter((c: any) => c.group_slug === "actress")
            .map((c: any) => ({ id: c.cast.id, name: c.cast.name }));

        return {
            id: movie.id,
            title: movie.title,
            image: movie.image,
            trailer: movie.trailer,
            duration_text: movie.duration_text || "Unknown",
            certificate: movie.certificate || "N/A",
            content_plain: movie.content_plain || "",
            topten: movie.topten || false,
            genres: movie.genres || [],
            languages: movie.languages || [],
            director,
            actors,
            actresses,
        };
    });
};

const useMovies = () => {
    return useQuery<Movie[]>({ queryKey: ["movies"], queryFn: fetchMovies });
};

export default useMovies;
