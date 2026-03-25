import { EjemploGuardar } from './js/Data/EjemploGuardar.js';

const btnBuscar = document.getElementById("btnBuscar");
const btnGuardar = document.getElementById("btnGuardar");
const btnLeer = document.getElementById("btnLeer");
const inputNombrePokemon = document.getElementById("pokemonName");
const sectionInfoPokemon = document.getElementById("infoPokemon");
const body = document.body;
const infoPokemon = document.getElementById("infoPokemon");

btnBuscar.addEventListener("click", () => {
  buscarPokemon(inputNombrePokemon.value.toLowerCase());
});

btnGuardar.addEventListener("click", () => {
  const pokemones=[{nombre:'Pikachu', nivel:10}, {nombre:'Charmander', nivel: 36}];
  EjemploGuardar.guardarPokemones(pokemones);
  alert('Pokemmon guardado');
});

btnLeer.addEventListener("click", () => {
  const pokemones=EjemploGuardar.obtenerPokemones();
  let datosPokemones='';
  pokemones.forEach(p => {
    datosPokemones += `Nombre: ${p.nombre}, Nivel: ${p.nivel}\n`;
  });
  alert(datosPokemones);
});


async function buscarPokemon(nombre) {
  sectionInfoPokemon.innerHTML = "<>Buscando Pokemon...</>";
  try {
    const respuesta = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${inputNombrePokemon.value.toLowerCase()}`,
    );
    if (!respuesta.ok) {
      throw new Error("Pokemon no encontrado");
    }
    const datos = await respuesta.json();
    mostrarInfoPokemon(datos);
    cambiarFondo(datos.types[0].type.name);
  } catch (error) {
    sectionInfoPokemon.innerHTML = "<>Pokemon no encontrado</>";
    return;
  }
}

function mostrarInfoPokemon(datos) {
  sectionInfoPokemon.innerHTML = `
    <div>
        <img src="${datos.sprites.other["official-artwork"].front_default}" alt="${datos.name}" width="300px" height="300px" />
        <h2>${datos.name.toUpperCase()}</h2>
        <p>${datos.types.map((type) => type.type.name).join(", ")}</p>
        <p>Altura: ${datos.height / 10} m</p>
        <p>Peso: ${datos.weight / 10} kg</p>

    </div>
    `;
}//fin funcion mostrar info pokemon

function cambiarFondo(tipo) {
  if (tipo === "fire") {
    body.style.backgroundColor = "red";
    infoPokemon.style.backgroundColor = "rgba(220, 93, 73, 0.8)";
  } else {
    if (tipo === "water") {
      body.style.backgroundColor = "rgba(50, 91, 240, 0.8)";
      infoPokemon.style.backgroundColor = "rgba(148, 167, 236, 0.8)";
    } else {
      if (tipo === "grass") {
        body.style.backgroundColor = "green";
        infoPokemon.style.backgroundColor = "rgba(141, 226, 160, 0.8)";
      } else {
        if (tipo === "electric") {
          body.style.backgroundColor = "yellow";
          infoPokemon.style.backgroundColor = "rgba(213, 213, 140, 0.8)";
        } else {
          body.style.backgroundColor = "white";
          infoPokemon.style.backgroundColor = "rgba(204, 71, 200, 0.95)";
        }
      }
    }
  }
}//fin funcion cambiar fondo
