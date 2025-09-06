import axios from 'axios';
import type { Movie } from "../types/movie";
interface FetchMoviesResponse {
    results: Movie[];
}
const myKey = import.meta.env.VITE_TMDB_TOKEN;
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${myKey}` 
    }
};
export const fetchMovies = async (query: string): Promise<Movie[]> => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${query}`;
    const res = await axios.get<FetchMoviesResponse>(url, options);
    return res.data.results;
}