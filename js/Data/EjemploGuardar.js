export class EjemploGuardar {
  static KEY = "mis_pokemon";
  static guardarPokemones(pokemones) {
    localStorage.setItem(this.KEY, JSON.stringify(pokemones));
  };

  static obtenerPokemones() {
    const datos= localStorage.getItem(this.KEY);
    return datos ? JSON.parse(datos) : [];
    //si los datos existen los parseamos, si no existe devolvemos un array vacio
  };

}//fin clase