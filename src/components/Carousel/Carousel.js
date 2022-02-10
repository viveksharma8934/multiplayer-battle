import React from 'react'
import M from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css'
import GameCard from '../GameCard/GameCard.js'
import './Carousel.css'

function Carousel() {
    document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.carousel');
    var instance = M.Carousel.init(elems, {
        fullWidth: false,
        numVisible: 5,
        padding: 20,
        shift: 25,
    });
});
    return (
        <div>
        <div class="carousel " >
        <a class="carousel-item center" href="#one!"><GameCard stake='10'/></a>
        <a class="carousel-item" href="#two!" ><GameCard stake='20'/></a>
        <a class="carousel-item" href="#five!" ><GameCard stake='50'/></a>
        <a class="carousel-item" href="#three!" ><GameCard stake='30'/></a>
        <a class="carousel-item" href="#four!" ><GameCard stake='40'/></a>
      </div>
    </div>
    )
}

export default Carousel



