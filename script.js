const btnBuscar = document.getElementById("btnBuscar");
const inputNombrePokemon = document.getElementById("pokemonName");
const sectionInfoPokemon = document.getElementById("infoPokemon");
const body = document.body;
const infoPokemon = document.getElementById("infoPokemon");
btnBuscar.addEventListener("click", () => {
  buscarPokemon(inputNombrePokemon.value.toLowerCase());
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
        <img src="${datos.sprites.other["official-artwork"].front_default}" alt="${datos.name}" />
        <h2>${datos.name.toUpperCase()}</h2>
        <p>${datos.types.map((type) => type.type.name).join(", ")}</p>
        <p>Altura: ${datos.height / 10} m</p>
        <p>Peso: ${datos.weight / 10} kg</p>

    </div>
    `;
}

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

      }else {
        body.style.backgroundColor = "white";
        infoPokemon.style.backgroundColor = "rgba(204, 71, 200, 0.95)";

      }
    }
  }
}
