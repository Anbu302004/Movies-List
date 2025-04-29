import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

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

export interface GenreBlock {
    id: string;
    title: string;
    movies: Movie[];
}

interface GenreResponse {
    data: GenreBlock[];
}

interface MovieDetailResponse {
    data: any;
}

const moviesApiClient = axios.create({
    baseURL: 'https://movies.harikaran.com/api/guest',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Parse cast members from the API response
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

// Fetch popup details for a single movie
const fetchMovieDetailById = async (id: string): Promise<Partial<Movie>> => {
    try {
        const response = await moviesApiClient.get<MovieDetailResponse>(`/getusermovie/${id}`);
        const movie = response.data.data;

        const { director, actors, actresses } = parseCasts(movie.casts || []);

        return {
            trailer: movie.trailer || "",
            duration_text: movie.duration_text || "Unknown",
            certificate: movie.certificate || "N/A",
            content_plain: movie.content_plain || "",
            genres: movie.genres || [],
            languages: movie.languages || [],
            director,
            actors,
            actresses,
        };
    } catch (error) {
        console.error(`Failed to fetch details for movie ID ${id}`, error);
        return {
            trailer: "",
            duration_text: "Unknown",
            certificate: "N/A",
            content_plain: "",
            genres: [],
            languages: [],
            director: [],
            actors: [],
            actresses: [],
        };
    }
};

// Fetch genre blocks and include popup details for each movie
const fetchGenreBlock = async (genreId: number): Promise<GenreBlock[]> => {
    const url = `/blockslist?page=1&profile_id=0&page_id=2&genre_id=${genreId}&genre=${genreId}`;
    const response = await moviesApiClient.get<GenreResponse>(url);
    const genreData = response.data.data;

    const parsedBlocks: GenreBlock[] = await Promise.all(
        genreData.map(async (block) => {
            const moviesWithDetails = await Promise.all(
                block.movies.map(async (movie) => {
                    const popupDetails = await fetchMovieDetailById(movie.id);

                    return {
                        id: movie.id,
                        title: movie.title,
                        image: movie.image,
                        topten: movie.topten || false,
                        ...popupDetails,
                    } as Movie;
                })
            );

            return {
                ...block,
                movies: moviesWithDetails,
            };
        })
    );

    return parsedBlocks;
};

// Fetch a single movie's details (used separately if needed)
const fetchMovieDetail = async (id: string): Promise<Movie> => {
    const res = await moviesApiClient.get<MovieDetailResponse>(`/getusermovie/${id}`);
    const movie = res.data.data;
    const { director, actors, actresses } = parseCasts(movie.casts || []);

    return {
        id: movie.id,
        title: movie.title,
        image: movie.image,
        trailer: movie.trailer || "",
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
};

// React Query hook for genre blocks
export const useGenreBlock = (genreId: number) => {
    return useQuery<GenreBlock[]>({
        queryKey: ['genreBlock', genreId],
        queryFn: () => fetchGenreBlock(genreId),
    });
};

// React Query hook for a single movie
export const useMovieDetail = (movieId: string | null) => {
    return useQuery<Movie>({
        queryKey: ['movieDetail', movieId],
        queryFn: () => fetchMovieDetail(movieId!),
        enabled: !!movieId, // only fetch when movieId is not null
    });
};
