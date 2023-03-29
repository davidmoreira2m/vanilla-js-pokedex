// Selecionando elementos do DOM
const pokemonListHtml = document.getElementById("pokemonList");
const searchButton = document.getElementById("searchButton");
const paginationButton = document.getElementById("paginationButton");
const pokemonNameInput = document.getElementById("pokemonName");

// Definindo variáveis
let maxList = 151; // máximo total de pokemons a serem listados
let pokePerPage = 12; // quantos pokemons serão carregados por cada pagina/requisição
let listStart = 0;
let listEnd = pokePerPage;
let nomeOuNum = "";

// Renderizando lista de Pokemons no HTML
async function renderPokemonList() {
  const pokemonList = await getPokemonList(nomeOuNum, listStart, listEnd);

  pokemonList.forEach((pokemon) => {
    const { id, name, types, sprites } = pokemon;

    // Criando elementos HTML
    const pokemonCard = document.createElement("li");
    const pokemonCardNumber = document.createElement("span");
    const pokemonCardName = document.createElement("span");
    const pokemonCardDetail = document.createElement("div");
    const pokemonCardTypes = document.createElement("ol");
    const pokemonCardImg = document.createElement("img");

    // Adicionando classes aos elementos HTML
    pokemonCard.classList.add("pokemon");
    pokemonCard.classList.add(types[0].type.name); // Add class com o nome do tipo principal do pokemon
    pokemonCardNumber.classList.add("pokemon__number");
    pokemonCardName.classList.add("pokemon__name");
    pokemonCardDetail.classList.add("pokemon__detail");
    pokemonCardTypes.classList.add("pokemon__types");

    // Definindo conteúdo dos elementos HTML
    pokemonCardNumber.textContent = `#${String(id).padStart(3, "0")}`;
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
searchButton.addEventListener("click", () => {
  nomeOuNum = pokemonNameInput.value.toLowerCase().trim();
  pokemonListHtml.innerHTML = "";
  renderPokemonList();
});

// Adicionando listener e lógica ao botão de paginação
paginationButton.addEventListener("click", () => {
  if (listEnd < maxList - pokePerPage) {
    listStart = listEnd;
    listEnd += pokePerPage;
    renderPokemonList();
  } else {
    listStart = listEnd;
    listEnd = maxList;
    paginationButton.parentElement.removeChild(paginationButton);
    renderPokemonList();
  }
});
