// Selecionando elementos do DOM
const pokemonListHtml = document.getElementById("pokemonList");
const searchButton = document.getElementById("searchButton");
const pokemonNameInput = document.getElementById("pokemonName");

// Definindo variáveis
let listStart = 0;
let listEnd = 151;
let nomeOuNum = "";

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

// Renderizando lista de Pokemons no HTML
async function renderPokemonList() {
  const pokemonList = await getPokemonList(nomeOuNum, listStart, listEnd);

  pokemonList.forEach((pokemon) => {
    const { order, name, types, sprites } = pokemon;

    // Criando elementos HTML
    const pokemonCard = document.createElement("li");
    const pokemonCardNumber = document.createElement("span");
    const pokemonCardName = document.createElement("span");
    const pokemonCardDetail = document.createElement("div");
    const pokemonCardTypes = document.createElement("ol");
    const pokemonCardImg = document.createElement("img");

    // Adicionando classes aos elementos HTML
    pokemonCard.classList.add("pokemon");
    pokemonCardNumber.classList.add("pokemon__number");
    pokemonCardName.classList.add("pokemon__name");
    pokemonCardDetail.classList.add("pokemon__detail");
    pokemonCardTypes.classList.add("pokemon__types");

    // Definindo conteúdo dos elementos HTML
    pokemonCardNumber.textContent = `#${String(order).padStart(3, "0")}`;
    pokemonCardName.textContent = name;
    pokemonCardImg.src = sprites.other.dream_world.front_default;

    // Criando elementos HTML para cada tipo de Pokemon
    types.forEach((type) => {
      const pokemonCardType = document.createElement("li");
      pokemonCardType.textContent = type.type.name;
      pokemonCardType.classList.add("pokemon__types__type");
      pokemonCardType.classList.add(type.type.name);
      pokemonCardTypes.appendChild(pokemonCardType);
    });

    // Adicionando elementos HTML ao DOM
    pokemonCard.appendChild(pokemonCardNumber);
    pokemonCard.appendChild(pokemonCardName);
    pokemonCard.appendChild(pokemonCardDetail);
    pokemonCardDetail.appendChild(pokemonCardTypes);
    pokemonCardDetail.appendChild(pokemonCardImg);
    pokemonListHtml.appendChild(pokemonCard);
  });
}

// Renderizando lista de Pokemons assim que a página é carregada
renderPokemonList();

// Adicionando listener ao botão de pesquisa
searchButton.addEventListener("click", async () => {
  nomeOuNum = pokemonNameInput.value.toLowerCase().trim();
  pokemonListHtml.innerHTML = "";
  await renderPokemonList();
});
