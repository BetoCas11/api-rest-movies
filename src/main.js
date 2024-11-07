import { APIKEY } from "./secret.js";
import ItemsnewTrailers from "./components/itemsNewsSection.js";
import MovieCard from "./components/moviecard.js";

customElements.define("movie-card", MovieCard);
customElements.define('items-new-trailers', ItemsnewTrailers);

const URLAPIBase = "https://api.themoviedb.org/3";
const URLAPI = "https://api.themoviedb.org/3/trending";

const sectionMain = document.querySelector(".grid > .section-main");
const mainhome = document.querySelector(".grid > .section-main > main");
const contentarticle = document.querySelector(".section-main > main > .main__article");
const navHomeitems = [...document.querySelectorAll(".header-nav > nav > .nav__list >:not(:nth-child(1), :nth-child(4))")];
const navHomeSelect = document.querySelector(".header-nav > nav > .nav__list > .nav__item > select");
const categorieslist = document.querySelector(".grid > .section-aside > aside > .aside__list");


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
     console.log({data, movies}); 
    movies.forEach(movie => {
        const cardMovie = document.createElement("movie-card");
        cardMovie.setAttribute("alt", `${movie?.title || movie?.name}`);
        cardMovie.setAttribute("src", `https://image.tmdb.org/t/p/w500${movie?.poster_path}`);
        cardMovie.setAttribute("date", `${movie?.release_date || movie.first_air_date}`);
        cardMovie.setAttribute("idmovie", `${movie?.id}`);
        cardMovie.setAttribute("media_type", `${movie?.media_type}`);
        containerInfo.insertAdjacentElement("beforeend", cardMovie);
    }); 
}

/* Obtener los 6 items de los generos, para después insertarlos en el HTML: */
async function getCategoryPreviw(watch){
    const res =  await fetch(`${URLAPIBase}/genre/${watch}/list?api_key=${APIKEY}&language=es-MX`);
    const data = await res.json();
    const categoriesItems = [...document.querySelectorAll(".aside__list > .aside__items")];

    const geners = data?.genres;
    console.log(geners);
    const usedGenres = new Set();

    for (let i = 0; i < categoriesItems.length; i++) {
        let categotyRandom;
        do {
            categotyRandom = geners[Math.floor(Math.random() * geners.length)]?.name;
        } while (usedGenres.has(categotyRandom));

        usedGenres.add(categotyRandom);
        categoriesItems[i].textContent = categotyRandom;
    }
    geners.forEach(genre => {
        const option = document.createElement("option");
        navHomeSelect.insertAdjacentElement("beforeend", option);
        option.insertAdjacentText("beforeend", genre?.name);
        option.setAttribute("idcategory", genre?.id);
    })
}

async function getAllCategories(watch, idgenre, containerCategory){
    const res =  await fetch(`${URLAPIBase}/discover/${watch}?include_adult=true&include_video=false&language=es-MX&page=1&sort_by=popularity.desc&with_genres=${idgenre}&api_key=${APIKEY}`);
    const data = await res.json();
    const resultItems = data?.results;
    console.log(data?.results);
    const container = document.querySelector(containerCategory);
    resultItems.forEach(item => {
        const categoryfilm = document.createElement("movie-card");
        categoryfilm.setAttribute("alt", `${item?.title || item?.name}`);
        categoryfilm.setAttribute("src", `https://image.tmdb.org/t/p/w500${item?.poster_path}`);
        categoryfilm.setAttribute("date", `${item?.release_date || item.first_air_date}`);
        container.insertAdjacentElement("beforeend", categoryfilm);
    })

    
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



/* Capturar un evento delegado para obtener la imagen y título de cada card: */
contentarticle.addEventListener("click", (e) => {
    if (e.target.closest = "movie-card") {
        const pictureUrl = e.target.attributes.src.textContent;
        const pictureText = e.target.attributes.alt.textContent;
        const idwatch = e.target.attributes.idmovie.textContent;
        const mediaTypeFilm = e.target.attributes.media_type.textContent;
        /* Usando sesión Storage para pasar estos valors guardados en el navegador y recuperarlos en el otro archivo */
        sessionStorage.setItem('pictureUrl', pictureUrl); 
        sessionStorage.setItem('pictureText', pictureText);
        sessionStorage.setItem("idwatch", idwatch);
        sessionStorage.setItem("media", mediaTypeFilm);
    }
});


/* Capturar evento para ocultar el main del home por los valores de las categorías y también para mostrar todas las categorías de la API */
navHomeSelect.addEventListener("change", () => {
    
    mainhome.classList.add("notshowmain");
    sectionMain.insertAdjacentHTML("beforeend", /*html*/`<article class="categories">
        <div class="cancelbutton"></div>
        <h2>Resultados de la categoría: <span>${navHomeSelect.value}</span></h2>
        <div class="resultscategory"></div>
    </article>`);
    const filmidCategory = navHomeSelect.selectedOptions[0].attributes[0].textContent;
    console.log(navHomeSelect.selectedOptions[0].attributes[0]);
    navHomeitems.forEach(items => items.style.display = "none");
    navHomeSelect.style.display = "none";
    getAllCategories("movie", filmidCategory, ".categories > .resultscategory"); 
    const categoryid = document.querySelector(".grid > .section-main > .categories");
    categoryid.addEventListener("click", (e) => {
        if(e.target.closest(".cancelbutton")){
            mainhome.classList.remove("notshowmain");
            categoryid.classList.add("notshowmain");
            categoryid.remove();
            navHomeitems.forEach(items => items.style.display = "block");
            navHomeSelect.style.display = "block";
            navHomeSelect.value = "Géneros";
    }
    })
    
});


