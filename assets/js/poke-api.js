// Consumindo a POKEAPI
async function getPokemonData(id) {
  const response = await fetch(`https://pokeapi.co/api/v2/${id}`);
  const data = await response.json();
  return data;
}

// Gerando lista de Pokemons
async function getPokemonList(nomeOuNum, listStart, listEnd) {
  let pokemonData = [];

  if (nomeOuNum) {
    pokemonData.push(await getPokemonData(`pokemon/${nomeOuNum}`));
  } else {
    for (let i = listStart; i < listEnd; i++) {
      pokemonData.push(await getPokemonData(`pokemon/${i + 1}`));
    }
  }
  return pokemonData;
}
