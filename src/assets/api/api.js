export const fetchPokeData = async (endpoint, offset = 0, limit = 20) => {
  const url = `https://pokeapi.co/api/v2/${endpoint}?offset=${offset}&limit=${limit}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Error al obtener datos");
  }

  const data = await response.json();

  const detailedResults = await Promise.all(
    data.results.map(async (item) => {
      const details = await fetchPokeDetails(item.url);
      let sprites = null;

      switch (endpoint) {
        case "pokemon":
          sprites = details.sprites?.front_default || null;
          return {
            name: item.name,
            height: details.height,
            weight: details.weight,
            types: details.types.map((t) => t.type.name).join(", "),
            abilities: details.abilities.map((a) => a.ability.name).join(", "),
            sprites,
          };
        case "pokemon-species":
          return {
            name: item.name,
            color: details.color.name,
            generation: details.generation.name,
          };
        case "move":
          return {
            name: item.name,
            power: details.power,
            accuracy: details.accuracy,
            type: details.type.name,
          };
        case "ability":
          return {
            name: item.name,
            effect: details.effect_entries.find((e) => e.language.name === "en")?.effect || "No info",
            generation: details.generation.name,
          };
          case "generation":
            return {
              name: item.name,
              main_region: details.main_region.name,
              versions: details.version_groups.map((v) => v.name).join(", "),
            };
        case "region":
          return {
            name: item.name,
            locations: details.locations.map((l) => l.name).join(", "),
          };
        case "location":
          return {
            name: item.name,
            areas: details.areas.map((a) => a.name).join(", "),
          };
        case "item":
          sprites = details.sprites?.default || null;
          return {
            name: item.name,
            category: details.category.name,
            effect: details.effect_entries.find((e) => e.language.name === "en")?.short_effect || "No info",
            sprites,
          };
          case "pokemon-form":
            sprites = details.sprites?.front_default || details.sprites?.front_shiny || null;
            return {
              name: item.name,
              is_mega: details.is_mega ? "Yes" : "No",
              form_name: details.form_name.trim() !== "" ? details.form_name : item.name,
              sprites,
            };
          case "type":
  return {
    name: item.name,
    pokemon: details.pokemon.map((p) => p.pokemon.name).join(", "),
  };
        case "nature":
          return {
            name: item.name,
            increased_stat: details.increased_stat?.name || "None",
            decreased_stat: details.decreased_stat?.name || "None",
          };
        default:
          return { name: item.name };
      }
    })
  );

  return { ...data, results: detailedResults };
};


export const fetchPokeDetails = async (url) => {
  const response = await fetch(url);
  return await response.json();
};

export const fetchSpeciesPokemon = async (name, language = "es") => {
  const url = `https://pokeapi.co/api/v2/pokemon-species/${name}/`;
  const response = await fetch(url);
  const data = await response.json();

  const nameInLanguage = data.names.find((item) => item.language.name === language);
  return nameInLanguage ? nameInLanguage.name : data.name;
};

export const fetchItemDetails = async (name) => {
  const url = `https://pokeapi.co/api/v2/item/${name}/`;
  const response = await fetch(url);
  const data = await response.json();
  return data.sprites?.default || null;
};

export const fetchMoveDetails = async (name) => {
  const url = `https://pokeapi.co/api/v2/move/${name}/`;
  const response = await fetch(url);
  return response.ok ? (await response.json()).sprites?.default || null : null;
};

export const fetchAbilityDetails = async (name) => {
  const url = `https://pokeapi.co/api/v2/ability/${name}/`;
  const response = await fetch(url);
  return response.ok ? (await response.json()).sprites?.default || null : null;
};

export const fetchPokemonFormDetails = async (name) => {
  const url = `https://pokeapi.co/api/v2/pokemon-form/${name}/`;
  const response = await fetch(url);
  const data = await response.json();
  return data.sprites?.front_default || null;
};

export const fetchTranslatedAbility = async (name, language = "es") => {
  const url = `https://pokeapi.co/api/v2/ability/${name}/`;
  const response = await fetch(url);
  const data = await response.json();

  const nameInLanguage = data.names.find((item) => item.language.name === language);
  return nameInLanguage ? nameInLanguage.name : data.name;
};

export const fetchTranslatedItem = async (name, language = "es") => {
  const url = `https://pokeapi.co/api/v2/item/${name}/`;
  const response = await fetch(url);
  const data = await response.json();

  const nameInLanguage = data.names.find((item) => item.language.name === language);
  return nameInLanguage ? nameInLanguage.name : data.name;
};

export const fetchTranslatedMove = async (name, language = "es") => {
  const url = `https://pokeapi.co/api/v2/move/${name}/`;
  const response = await fetch(url);
  const data = await response.json();

  const nameInLanguage = data.names.find((item) => item.language.name === language);
  return nameInLanguage ? nameInLanguage.name : data.name;
};