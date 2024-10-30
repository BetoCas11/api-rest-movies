class ItemsnewTrailers extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
   getItem(){
    return /*html */`
        <figure>
            <img src="https://media.themoviedb.org/t/p/w1920_and_h427_multi_faces/3V4kLQg0kSqPLctI5ziYWabAZYF.jpg" alt="Trailers Nuevos">
            <figcaption>
                <button><div></div></button>
                <p>Venom 2</p>
                <span>3:00</span>
            </figcaption>
        </figure>
        ${this.getStyles()}
    `
  }
  getStyles(){
    return /*css*/ `
    <style>
    :host{
        scrollbar-color: red black;
    }
        figure{
            inline-size: 100%; 
            padding: 0;
            margin: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
            & img{
                inline-size: 310px;
                block-size: 150px;
                object-fit: cover;
                border-radius: 10px;
            }
            & figcaption{
                inline-size: 100%;
                display: flex;
                justify-content: space-around;
                align-items: center;
                background-color: rgba(128, 128, 128, 0.2);
                block-size: 30px;
                border-radius: 10px;
                position: absolute;
                bottom: 0;
                backdrop-filter: blur(10px);
                & button {
                  background: transparent;
                  border: none;
                  cursor: pointer;
                  &:hover{
                    filter: drop-shadow(0 0 30px green);
                    scale: 1.2;
                  }
                  & div{
                    inline-size: 20px;
                    block-size: 20px;
                    background-color: var(--textnav-color);
                    clip-path: polygon(0 0, 100% 50%, 0 100%);

                  }
                }

            }
        }
    </style>
    `
  }
  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = this.getItem()
  }
}

export default ItemsnewTrailers;

