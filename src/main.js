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
            <img src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/8PYqGSd8MOm5ce8io4qNSAiSExW.jpg" alt="Poster película">
            <figcaption>
                <h3>Título de la película: ALIEN</h3>
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
                    block-size: max-content;
                    inline-size: 150px;
                    outline: 1px solid var(--graycontorn);
                    border-radius: 10px;
                    overflow: hidden;
                    background-color: var(--lightblack-color);
                    transition: scale 300ms ease,
                                box-shadow 300ms ease;
                    cursor: pointer;
                    &:hover{
                        scale: 1.1;
                        box-shadow: 0 0 40px var(--textnav-color);
                    }
                    & img{
                        inline-size: 100%;
                        block-size: 160px;
                        object-fit: cover;
                    }
                    & figcaption{
                        block-size: 100%;
                        & h3{
                            color: color-mix(in srgb, var(--textnav-color) 50%, white);
                            text-shadow: 0 0 9px white;
                            font-size: 20px;
                        }
                        & p{
                            color: color-mix(in srgb, var(--textnav-color) 30%, white);
                            font-size: 15px;
                        }
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
