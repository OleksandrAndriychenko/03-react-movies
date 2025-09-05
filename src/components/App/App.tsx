import css from "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";
import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import MovieGrid from "../MovieGrid/MovieGrid"
import Loader from "../Loader/Loader"
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal"


export default function App() {
    const [articles, setArticles] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    

    const handleSearch = async (searchValue: string) => {
        try {
            setError(false)
            setIsLoading(true);
            const newArticles = await fetchMovies(searchValue);
            if (newArticles.length == 0) {
                toast.error("No movies found for your request.");
                return;
            }
            setArticles(newArticles)
            setIsLoading(false)
        } catch {
            setError(true)
        } finally {
            setIsLoading(false)
        }
    }
    const handleSelectMovie = (movie: Movie) => {
        setSelectedMovie(movie);
    };
    const closeModal = () => {
        setSelectedMovie(null);
    };
        return (
            <div className={css.app}>
                <Toaster/>
                <SearchBar onSubmit={handleSearch} disabled={isLoading}/>
                {isLoading && <Loader />}
                {error && <ErrorMessage/>}
                <MovieGrid movies={articles} onSelect={handleSelectMovie}/>
                {selectedMovie  && <MovieModal onClose={closeModal} movie={selectedMovie} />}
            </div>
        );
}