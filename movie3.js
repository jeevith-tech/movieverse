const container = document.getElementById("movieDetails");
const id = new URLSearchParams(location.search).get("id");

async function loadMovie() {
    container.innerHTML = "<p style='text-align:center;padding:40px'>Loading...</p>";

    const movie = await getMovieDetails(id);
    const credits = await getMovieCredits(id);
    const trailer = await getMovieTrailer(id);

    const directorObj = credits.crew.find(c => c.job === "Director");
    const director = directorObj ? directorObj.name : "Unknown";
    const genres = movie.genres.map(g => g.name).join(", ");

    // Render wrapper for stable layout
    container.innerHTML = `
        <div class="details-wrapper">
            <section class="details-hero" style="background-image:url(${IMAGE_URL + movie.backdrop_path})">
                <div class="details-overlay">
                    <div class="details-content">
                        <img src="${IMAGE_URL + movie.poster_path}" alt="${movie.title}">
                        <div class="details-text">
                            <h2>${movie.title}</h2>
                            <div class="meta">
                                <span>⭐ ${movie.vote_average}</span>
                                <span>${movie.runtime} min</span>
                                <span>${movie.release_date}</span>
                            </div>
                            <p>${movie.overview}</p>
                            <div class="extra-details">
                                <span><strong>Director:</strong> ${director}</span>
                                <span><strong>Budget:</strong> $${movie.budget.toLocaleString()}</span>
                                <span><strong>Revenue:</strong> $${movie.revenue.toLocaleString()}</span>
                                <span><strong>Genres:</strong> ${genres}</span>
                            </div>
                            <div class="trailer-container">
                                <a href="${trailer ? `https://youtube.com/watch?v=${trailer.key}` : "#"}" 
                                   target="_blank" class="trailer-btn">
                                   ${trailer ? "▶ Watch Trailer" : "Trailer unavailable"}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <h3 style="padding:20px">Cast</h3>
            <div class="cast">
                ${credits.cast.slice(0, 12).map(c => `
                    <div class="actor">
                        <img src="${c.profile_path ? IMAGE_URL + c.profile_path : 'https://via.placeholder.com/100x150?text=No+Image'}" alt="${c.name}">
                        <span>${c.name}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    // Wait for browser to paint
    requestAnimationFrame(() => {
        // Animate inner content only, leave trailer button persistent
        gsap.from(".details-content img", { x: -50, autoAlpha: 0, duration: 0.6, ease: "power2.out" });
        gsap.from(".details-text h2", { y: 20, autoAlpha: 0, duration: 0.5, ease: "power2.out" });
        gsap.from(".meta span", { y: 20, autoAlpha: 0, stagger: 0.1, duration: 0.4, ease: "power2.out" });
        gsap.from(".extra-details span", { y: 20, autoAlpha: 0, stagger: 0.1, duration: 0.4, ease: "power2.out", delay: 0.2 });
        gsap.from(".trailer-btn", { scale: 0.8, autoAlpha: 0, duration: 0.5, ease: "back.out(1.2)", delay: 0.4, onComplete: () => {
            document.querySelector(".trailer-btn").style.visibility = "visible";
            document.querySelector(".trailer-btn").style.opacity = "1";
        }});
        gsap.from(".actor", { y: 20, autoAlpha: 0, stagger: 0.05, duration: 0.5, ease: "power2.out", delay: 0.6 });
    });
}

loadMovie();
























