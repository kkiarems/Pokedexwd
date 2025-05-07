import { setPokemon, setImage } from "./pokedex.js";
import './charts.js'

const $form = document.querySelector('#form')
const $next = document.querySelector('#next-pokemon')
const $prev = document.querySelector('#prev-pokemon')
const $nextImage = document.querySelector('#next-image')
const $prevImage = document.querySelector('#prev-image')
const $pokedex = document.querySelector('#pokedex')
const $idInput = document.querySelector('#idInput')
const $randomPokemon = document.querySelector('#pokemonRandom')
const $description = document.querySelector("#description")

$form.addEventListener('submit', handleSubmit)
$next.addEventListener('click', handleNextPokemon)
$prev.addEventListener('click', handlePrevPokemon)
$nextImage.addEventListener('click', handleNextImage)
$prevImage.addEventListener('click', handlePrevImage)
$randomPokemon.addEventListener('click', pokemonRandom)


 
let activePokemon = null

async function validatePokemon(id) {
    if (id == 0 || id >= 899 ) {
      $idInput.value = "Este Pokemon no existe"
      $description.textContent = "Sin información del pokemon"
    } else {
      activePokemon = await setPokemon(id)
    }
  }


async function handleSubmit(event) {
    event.preventDefault()
    $pokedex.classList.add('is-open')
    const form = new FormData($form)
    const id = form.get('id')
    console.log(id)
    validatePokemon(id)
    //activePokemon = await setPokemon(id)
    
}

async function handleNextPokemon() {
    const id = (activePokemon === null || activePokemon.id === 898) ? 1 : activePokemon.id + 1
    activePokemon = await setPokemon(id)
    $idInput.value = id
}


async function handlePrevPokemon() {
    const id = (activePokemon === null || activePokemon.id === 1) ? 898 : activePokemon.id - 1
    activePokemon = await setPokemon(id)
    $idInput.value = id
}

let activeSprite = 0
function handleNextImage() {
    if (activePokemon === null) return false
    if (activeSprite >= activePokemon.sprites.length -1) {
        activeSprite = 0
       return setImage(activePokemon.sprites[activeSprite])
    }
    activeSprite = activeSprite + 1
    return setImage(activePokemon.sprites[activeSprite])
}

function handlePrevImage() {
    if (activePokemon === null) return false
    if (activeSprite <= 0 ) {
        activeSprite = activePokemon.sprites.length -1
      return  setImage(activePokemon.sprites[activeSprite])
    }
    activeSprite = activeSprite - 1
    setImage(activePokemon.sprites[activeSprite])
}


  function getRandomId(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
  }

async function pokemonRandom() {
    const idRandom = getRandomId(1,898)
    activePokemon = await setPokemon(idRandom)
    $idInput.value = idRandom
}