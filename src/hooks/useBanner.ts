import { useQuery } from "@tanstack/react-query";
import moviesApiClient from "../services/moviesApiClient";

export interface Genre {
    id: number;
    title: string;
}

export interface Banner {
    id: number;
    title: string;
    trailer: string;
    genres: Genre[];
    content_plain: string;
}

const fetchBanners = async (
    page_id: number,
    genre_id?: string
): Promise<Banner[]> => {
    const genreParams = genre_id
        ? `&genre_id=${genre_id}&genre=${genre_id}`
        : "";
    const url = `/bannerlist?page=1&profile_id=0&page_id=${page_id}${genreParams}`;

    const response = await moviesApiClient.get(url);
    const movies = response.data?.data?.movies;

    if (!movies) {
        throw new Error("No movie data available");
    }

    const movieArray = Array.isArray(movies) ? movies : [movies];

    return movieArray.map((movie: any) => ({
        id: Number(movie.id),
        title: movie.title,
        trailer: movie.trailer || "",
        genres: Array.isArray(movie.genres)
            ? movie.genres.map((g: any) => ({
                id: Number(g.id),
                title: g.title,
            }))
            : [],
        content_plain: movie.content_plain || "",
    }));
};

const useBanners = (page_id: number, genre_id?: string) => {
    return useQuery<Banner[]>({
        queryKey: ["banners", page_id, genre_id],
        queryFn: () => fetchBanners(page_id, genre_id),
    });
};

export default useBanners;
