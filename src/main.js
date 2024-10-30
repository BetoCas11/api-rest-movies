import { APIKEY } from "./secret.js";
import ItemsnewTrailers from "./components/itemsNewsSection.js";
import MovieCard from "./components/moviecard.js";
console.log("Hola " + APIKEY );



customElements.define("movie-card", MovieCard);
customElements.define('items-new-trailers', ItemsnewTrailers);

/* Capturar un evento delegado para obtener la imagen y título de cada card: */
