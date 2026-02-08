const API_KEY = "f2ef8a2f74cc3ce3f7c54805f2c800b4";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_URL = "https://image.tmdb.org/t/p/original";

async function getTrendingMovies() {
    const res = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
    return (await res.json()).results;
}

async function searchMovies(query) {
    const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
    return (await res.json()).results;
}

async function getGenres() {
    const res = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
    return (await res.json()).genres;
}

async function getMoviesByGenre(id) {
    const res = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${id}`);
    return (await res.json()).results;
}

async function getAIMovies(genres) {
    const res = await fetch(
        `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genres.join(",")}&sort_by=vote_average.desc&vote_count.gte=100`
    );
    return (await res.json()).results;
}

async function getMovieDetails(id) {
    return await (await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`)).json();
}

async function getMovieCredits(id) {
    return await (await fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`)).json();
}

async function getMovieTrailer(id) {
    const data = await (await fetch(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`)).json();
    return data.results.find(v => v.type === "Trailer");
}



