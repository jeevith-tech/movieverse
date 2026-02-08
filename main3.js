const searchInput=document.getElementById("search");
const genresContainer=document.getElementById("genres");
const aiBtn=document.getElementById("aiBtn");
const moodSelect=document.getElementById("mood");

const moodGenres={happy:[35,16],sad:[18,10749],excited:[28,12],romantic:[10749]};
let activeGenre=null;

async function renderMovies(movies){
    moviesContainer.innerHTML="";
    movies.forEach(m=>moviesContainer.appendChild(createMovieCard(m)));
    animateCards();
}

async function loadTrending(){renderMovies(await getTrendingMovies());}

async function loadGenres(){
    const genres=await getGenres();
    genres.forEach(g=>{
        const el=document.createElement("div");
        el.className="genre";
        el.innerText=g.name;
        el.onclick=async ()=>{
            if(activeGenre===g.id){
                activeGenre=null;
                document.querySelectorAll(".genre").forEach(x=>x.classList.remove("active"));
                return loadTrending();
            }
            activeGenre=g.id;
            document.querySelectorAll(".genre").forEach(x=>x.classList.remove("active"));
            el.classList.add("active");
            renderMovies(await getMoviesByGenre(g.id));
        };
        genresContainer.appendChild(el);
    });
}

searchInput.onkeyup=async ()=>{
    const q=searchInput.value.trim();
    if(!q)return loadTrending();
    renderMovies(await searchMovies(q));
};

aiBtn.onclick=async ()=>{
    const mood=moodSelect.value;
    if(!mood)return alert("Select a mood");
    renderMovies((await getAIMovies(moodGenres[mood])).slice(0,10));
};

/* HEADER ANIMATION */
gsap.from(".header > *",{autoAlpha:0,y:-30,stagger:0.08,duration:1.8,ease:"power3.out",force3d: true});

loadTrending();
loadGenres();






