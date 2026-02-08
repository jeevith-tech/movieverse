const moviesContainer = document.getElementById("movies");

function createMovieCard(movie) {
    const wrapper = document.createElement("div");
    wrapper.className = "movie-wrapper";

    const div = document.createElement("div");
    div.className = "movie";
    div.innerHTML = `
        <img src="${IMAGE_URL + movie.poster_path}" loading="lazy">
        <div class="movie-info">
            <h3>${movie.title}</h3>
            <span>⭐ ${movie.vote_average}</span>
        </div>
    `;

    div.onclick = () => location.href = `movie3.html?id=${movie.id}`;

    wrapper.appendChild(div);
    return wrapper;
}

function animateCards() {
    // Animate wrapper divs, not inner cards
    gsap.from(".movie-wrapper", {
        autoAlpha: 0,
        y: 40,
        stagger: 0.1,
        duration: 3,
        ease: "power3.out",
        force3D: true
    });
}











