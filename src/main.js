import { APIKEY } from "./secret.js";
import ItemsnewTrailers from "./components/itemsNewsSection.js";
import MovieCard from "./components/moviecard.js";

customElements.define("movie-card", MovieCard);
customElements.define('items-new-trailers', ItemsnewTrailers);

const URLAPIBase = "https://api.themoviedb.org/3";
const URLAPI = "https://api.themoviedb.org/3/trending";

const mainhome = document.querySelector(".grid > .section-main");
const navHomeitems = [...document.querySelectorAll(".header-nav > nav > .nav__list >:not(:nth-child(1))")];
const navHomelogo = document.querySelector(".header-nav > nav > .nav__list > .nav__item > a.uno");
const categorieslist = document.querySelector(".grid > .section-aside > aside > .aside__list");

/* Capturar un evento delegado para obtener la imagen y título de cada card: */

/* Capturar evento para ocultar el main del home por los valores de las categorías y también para mostrar todas las categorías de la API */

 /*categorieslist.addEventListener("click", (e) => {
    if (e.target.closest("li")) {
        console.log(e.target.textContent);
        mainhome.classList.add("notshowmain");
        navHomeitems.forEach(item => {
            item.classList.toggle("notshowmain");
        });
    }
});*/
 

/* Función para el header con img aleatorias: */
async function getTrendingAllimg(watch, maininfo){
    const res = await fetch(`${URLAPI}/${watch}/day?api_key=${APIKEY}&language=es-MX`);
    const data = await res.json();
    const containerInfo = document.querySelector(maininfo);
    const alltrending = data?.results;
    const containerImg = alltrending[Math.floor(Math.random() * alltrending.length)];
    /* console.log(containerImg); */
    containerInfo.src = `https://image.tmdb.org/t/p/w500${containerImg?.backdrop_path}`;
    containerInfo.title =  `${containerImg?.original_title || containerImg?.name}, ${containerImg?.release_date || containerImg?.first_air_date}, ${containerImg.media_type}` ;
}

async function getTrending(watch, maininfo){
    const res =  await fetch(`${URLAPI}/${watch}/day?api_key=${APIKEY}&language=es-MX`);
    const data = await res.json();
    const containerInfo = document.querySelector(maininfo);
    const movies = data?.results;
    /* console.log({data, movies}); */
    movies.forEach(movie => {
        const cardMovie = document.createElement("movie-card");
        cardMovie.setAttribute("alt", `${movie?.title || movie?.name}`);
        cardMovie.setAttribute("src", `https://image.tmdb.org/t/p/w500${movie?.poster_path}`);
        cardMovie.setAttribute("date", `${movie?.release_date || movie.first_air_date}`)
        containerInfo.insertAdjacentElement("beforeend", cardMovie);
    }); 
}

/* Obtener los 6 items de los generos, para después insertarlos en el HTML: */
async function getCategoryPreviw(watch){
    const res =  await fetch(`${URLAPIBase}/genre/${watch}/list?api_key=${APIKEY}&language=es-MX`);
    const data = await res.json();
    const categoriesItems = [...document.querySelectorAll(".aside__list > .aside__items")];

    const geners = data?.genres;
    const usedGenres = new Set();

    for (let i = 0; i < categoriesItems.length; i++) {
        let categotyRandom;
        do {
            categotyRandom = geners[Math.floor(Math.random() * geners.length)]?.name;
        } while (usedGenres.has(categotyRandom));

        usedGenres.add(categotyRandom);
        categoriesItems[i].textContent = categotyRandom;
    }
    
}

/* Nuevos Trailers: */
async function getNewTrailers(containertrailer, initial, end){
    const res = await fetch(`${URLAPIBase}/movie/upcoming?api_key=${APIKEY}&language=es-MX&page=1`);
    const upcoming = await res.json();

    const container = document.querySelector(containertrailer);
    /* console.log(upcoming.results); */
    for (let i = initial; i < end; i++) {
        const element = upcoming?.results[i];
        const upcomingcontainer = document.createElement("items-new-trailers");
        upcomingcontainer.setAttribute("sourceimg", `https://image.tmdb.org/t/p/w500${element?.backdrop_path}`);
        upcomingcontainer.setAttribute("paragraph", element?.title);
        upcomingcontainer.setAttribute("popularity", Math.floor(element?.popularity));
        container.insertAdjacentElement("beforeend", upcomingcontainer);
    }

}


getTrending("movie", ".main__trendingMovies");
getTrending("tv", ".main__tvShows");
getTrendingAllimg("all", ".main__header > .main__img");
 
getCategoryPreviw("movie");

getNewTrailers(".section__itemsnews-primary", 0, 3);
getNewTrailers(".section__itemsnews-secondary", 3, 6);
