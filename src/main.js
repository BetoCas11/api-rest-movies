import { APIKEY } from "./secret.js";
console.log("Hola " + APIKEY );

class MovieCard extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: "open"})
    }
    getItem(){
        return /*html */`
        <figure>
            <img src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/8PYqGSd8MOm5ce8io4qNSAiSExW.jpg" alt="" width="180" height="280">
            <figcaption>
                <h3>Título de la película sssssssssssssss</h3>
                <p>Fecha de Lanzamiento</p>
            </figcaption>
        </figure>
        ${this.getStyles()}
        `
    }
    getStyles(){
        return /*css*/`
            <style>
                figure{
                    margin: 0;
                    padding-block-start: 10px;
                    block-size: max-content;
                    inline-size: 180px;
                    background: green;
                    display: grid;
                    place-content: center;
                    & img{
                        border-radius: 20px;
                    }
                    & figcaption > *{
                        text-align: center;
                    }
                }

            </style>
        `
    }
    render() {
        this.shadowRoot.innerHTML = this.getItem();
      }

    connectedCallback() {
        this.render();
      }
}

customElements.define("movie-card", MovieCard);
