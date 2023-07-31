//Declaro las variables globales que puedo necesitar para hacer el proyecto
//Selecciono donde va a ir la lista y el input con querySelector.
//Declaro la cantidad de pokemons que hay en la api para hacer el fetch/llamada

const pokeList$$ = document.querySelector("#pokedex");
const input$$ = document.querySelector("input");
const pokemonNumber = 150;

//Hago una función get con llamada a la api y devuelvo el resultado en formato JSON

const getPokemon = async (num) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${num}`);
  const pokeResponse = await response.json();
  // console.log(pokeResponse)
  return pokeResponse;
};

//Función para mapear del .json los parámetros que necesito.

const mapPokemon = (pokemon) => {
  return pokemon.map((pokemons) => ({
    nombre: pokemons.name,
    imagen: pokemons.sprites["front_default"],
    tipo: pokemons.types.map((type) => type.type.name).join(", "),
    peso: pokemons.weight,
  }));
};

//Para dibujar utilizo innerHTML y así insertar código HTML para cada pokemon mapeado desde el fetch o desde la búsqueda.

const draw = (pokemons) => {
  pokeList$$.innerHTML = "";
  for (const pokemon of pokemons) {
    const div$$ = document.createElement("div");
    div$$.setAttribute("class", "card");
    div$$.innerHTML = `
    <div class="content">
        <div class="imgBx">
            <img src="${pokemon.imagen}">
        </div>
        <div class="contentBx">
            <h3>${pokemon.nombre}</h3>
        </div>
    </div>
    <ul class="sci">
        <li>Type: ${pokemon.tipo}</li>
        <li>Wheight: ${pokemon.peso} kg</li>
    </ul>
</div>`;
    pokeList$$.appendChild(div$$);
  }
};

//Declaro la función que va a manejar el input

const searchInput = (mappedPokemons) => {
  input$$.addEventListener("input", () =>
    searchPokemon(mappedPokemons, input$$.value)
  );
};

//Declaro la función de búsqueda por nombre, que se invoca dentro de la función manejadora del input anterior

const searchPokemon = (mappedPokemons, filter) => {
  let filteredPokemons = mappedPokemons.filter((pokemon) =>
    pokemon.nombre.toLowerCase().includes(filter.toLowerCase())
  );
  console.log(filteredPokemons);
  draw(filteredPokemons);
};

//Declaro la función init que va a empezar a iterar y ejecutar la función de llamada y el resto de funciones consecutivamente.

const init = async () => {
  const pokemonsArray = [];
  for (let i = 1; i <= pokemonNumber; i++) {
    pokemonsArray.push(await getPokemon(i));
  }

  const mapped = mapPokemon(pokemonsArray);
  console.log(mapped);

  draw(mapped);

  searchInput(mapped);
};

//Invoco la función init para ejecutar toda la aplicación

init();
