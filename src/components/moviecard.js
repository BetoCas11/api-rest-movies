class MovieCard extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: "open"})
    }
    getItem(){
        return /*html */`
        <figure>
            <a href="../content-Movie.html">
            <img src="${this.getAttribute("src")}" alt="Poster película ${this.getAttribute("alt")}">
            <figcaption>
                <h3>${this.getAttribute("alt")}</h3>
                <p>${this.getAttribute("date")}</p>
            </figcaption>
            </a>
        </figure>
        ${this.getStyles()}
        `
    }
    getStyles(){
        return /*css*/`
            <style>
                figure{
                    margin: 0;
                    block-size: 370px;
                    inline-size: 150px;
                    aspect-ratio: 15 / 37;
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
                        & figcaption h3{
                                text-shadow: 0 0 4px white;
                        }
                    }
                    & a{list-style: none; text-decoration: none;}
                    & img{
                        inline-size: 100%;
                        block-size: 200px;
                        object-fit: cover;
                        aspect-ratio: 3 / 4;
                    }
                    & figcaption{
                        block-size: 40%;
                        align-content: center;
                        & h3{
                            color: color-mix(in srgb, var(--textnav-color) 45%, white);
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

export default MovieCard;