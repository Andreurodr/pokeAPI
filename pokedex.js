
//Declaro las variables globales que puedo necesitar para hacer el proyecto 
//Selecciono donde va a ir la lista y el input con querySelector.
//Guardo el valor de la api principal en una variable.

const pokeList$$ = document.querySelector("#pokedex");
const input$$ = document.querySelector("input");
const api = "https://pokeapi.co/api/v2/pokemon/";
// const arrayPokemons = [];

//Hago una función mixta get and init. No me retornaba el resultado deseado separando ambas funciones, así que de la misma respuesta que nos retorna el fetch en formato .json empiezo a invocar las funciones que me ejecutan todo el código(mapear y dibujar). De este modo, en cada iteración me mapea y dibuja el código deseado.

const getAndInit = async () => {
    for (let i = 1; i <= 150; i++) {
    const apiUrl = api + i
    const response = await fetch(apiUrl)
    const pokeResponse = await response.json()
    // arrayPokemons.push(pokeResponse)
    
    const mapear = mapPokemon(pokeResponse)
    // console.log(pokeResponse);

    const dibujar = draw(mapear)
    // searchInput(arrayPokemons)
    }
}

//Función para obtener del .json los parámetros que necesito. Intenté usar el .map con un array (pusheando las iteraciones anteriores al array) pero me daba Undefined al trabajar o mostrar por consola valores de ese array. Por ese motivo, no me retornaba el resultado esperado e hice esta función sin map.

const mapPokemon = (pokemons) => ({
        nombre: pokemons.name,
        imagen: pokemons.sprites['front_default'],
        tipo: pokemons.types.map((type) => type.type.name).join(', '),
        peso: pokemons.weight,
    })

//Para dibujar utilizo innerHTML y así insertar código HTML en cada iteración del bucle que saca cada una de las apis correctas.

const draw = (pokemons) => {
    pokeList$$.innerHTML += `<div class="card">
    <div class="content">
        <div class="imgBx">
            <img src="${pokemons.imagen}">
        </div>
        <div class="contentBx">
            <h3>${pokemons.nombre}</h3>
        </div>
    </div>
    <ul class="sci">
        <li>Type: ${pokemons.tipo}</li>
        <li>Wheight: ${pokemons.peso} kg</li>
    </ul>
</div>`
    }

    //CÓDIGO HTML CARTAS ANTERIOR DISEÑO
    // `<li class="card"><h2 class="card_title">${pokemons.nombre}</h2>
    // <img class="card_image" src="${pokemons.imagen}" alt="">
    // <p class="card_subtitle">Type: ${pokemons.tipo}</p><p class="card_subtitle">Wheight: ${pokemons.peso} kg</p></li>`

//No he logrado hacer el buscador por el tipo de dato que me devuelve tanto si hago un array pusheando como si lo mapeo de la forma en la que está(undefined al trabajar con él).

const searchInput = (pokemons) => {
    input$$.addEventListener("input", () => searchPokemon(pokemons, input$$.value))
}

//////////////

const searchPokemon = (pokemons, filtro) => {
//     pokeList$$.innerHTML = "";
    draw(pokemons.filter((pokemon) => pokemon.name.toLowerCase().includes(filtro.toLowerCase())))
}

//Intentos:

// const get = async () => {
//     for (let i = 1; i <= 150; i++) {
//     const apiUrl = api + i
//     const response = await fetch(apiUrl)
//     const pokeResponse = await response.json()
//  }}

// const init = async () => {
//     const obtener = await get()
//     const mapear = mapPokemon(obtener)
//     const dibujar = await draw(mapPokemon)
//     const buscar = searchInput(arrayPokemons)
// }

getAndInit()
