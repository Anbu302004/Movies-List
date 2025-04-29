import useGenres from "../hooks/useGenres";

const GenresList = () => {
    const { data: genres, isLoading, error } = useGenres();

    if (isLoading) return <p>Loading genres...</p>;
    if (error) return <p>Error loading genres: {error.message}</p>;

    return (
        <ul>
            {genres?.map((genre: { id: string; title: string }) => (
                <li key={genre.id}>{genre.title}</li>
            ))}
        </ul>
    );
};

export default GenresList;
