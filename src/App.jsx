import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Flag from "react-world-flags";
import Spinner from "./assets/componentes/spinner";
import {
  fetchPokeData,
  fetchSpeciesPokemon,
  fetchTranslatedItem,
  fetchTranslatedMove,
  fetchTranslatedAbility,
  fetchItemDetails,
  fetchMoveDetails,
  fetchAbilityDetails,
  fetchPokemonFormDetails,
} from "./assets/api/api";
import "./App.css";
import Modal from "./assets/componentes/modal";

function App() {
  const [pokeOption, setPokeOption] = useState("");
  const [language, setLanguage] = useState("es");
  const [offset, setOffset] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ["pokeData", pokeOption, language, offset],
    queryFn: async () => {
      const pokeData = await fetchPokeData(pokeOption, offset);

      const translatedResults = await Promise.all(
        pokeData.results.map(async (item) => {
          let translatedName = item.name;
          let sprites = null;

          if (pokeOption === "pokemon") {
            translatedName = await fetchSpeciesPokemon(item.name, language);
            sprites = item.sprites || null;
          } else if (pokeOption === "pokemon-species") {
            translatedName = await fetchSpeciesPokemon(item.name, language);
          } else if (pokeOption === "item") {
            translatedName = await fetchTranslatedItem(item.name, language);
            sprites = await fetchItemDetails(item.name);
          } else if (pokeOption === "move") {
            translatedName = await fetchTranslatedMove(item.name, language);
            sprites = await fetchMoveDetails(item.name);
          } else if (pokeOption === "ability") {
            translatedName = await fetchTranslatedAbility(item.name, language);
            sprites = await fetchAbilityDetails(item.name);
          } else if (pokeOption === "pokemon-form") {
            sprites = await fetchPokemonFormDetails(item.name);
          } else if (pokeOption === "type") {
            translatedName = item.name;
          }

          return { ...item, name: translatedName, sprites };
        })
      );

      return { ...pokeData, results: translatedResults };
    },
    enabled: !!pokeOption,
  });

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
  };

  const handleLoadMore = () => {
    setOffset((prevOffset) => prevOffset + 20);
  };

  const renderImage = (sprites) => {
    if (typeof sprites === "string") {
      return <img src={sprites} alt="Elemento" />;
    }
    if (sprites?.front_default) {
      return <img src={sprites.front_default} alt="Pokémon" />;
    }
    return null;
  };

  return (
    <>
      <h2>Pokelist</h2>
      <div className="language-buttons">
        <button onClick={() => handleLanguageChange("es")}>
          <Flag code="ES" style={{ width: "30px", height: "20px" }} />
        </button>
        <button onClick={() => handleLanguageChange("en")}>
          <Flag code="US" style={{ width: "30px", height: "20px" }} />
        </button>
        <button onClick={() => handleLanguageChange("fr")}>
          <Flag code="FR" style={{ width: "30px", height: "20px" }} />
        </button>
        <button onClick={() => handleLanguageChange("de")}>
          <Flag code="DE" style={{ width: "30px", height: "20px" }} />
        </button>
      </div>
  
      <select
        className="form-select"
        onChange={(e) => setPokeOption(e.target.value)}
        value={pokeOption}
      >
        <option value="">Selecciona una opción</option>
        <option value="pokemon">Pokémon</option>
        <option value="pokemon-species">Especies de Pokémon</option>
        <option value="type">Tipos de Pokémon</option>
        <option value="ability">Habilidades</option>
        <option value="move">Movimientos</option>
        <option value="generation">Generaciones</option>
        <option value="region">Regiones</option>
        <option value="location">Ubicaciones</option>
        <option value="item">Objetos</option>
        <option value="pokemon-form">Formas y megaevoluciones</option>
        <option value="nature">Naturalezas</option>
      </select>
  
      {error && <p>Error: {error.message}</p>}
  
      {data && (
        <ul className="pokemon-list">
          {data.results.map((item, index) => {
            const hasImage = item.sprites && (typeof item.sprites === "string" || item.sprites.front_default);
            return (
              <li
                key={index}
                className={`pokemon-item ${hasImage ? "with-image" : "without-image"}`}
                onClick={() => handleItemClick(item)}
              >
                {renderImage(item.sprites)}
                <span className="pokemon-name">{item.name}</span>
              </li>
            );
          })}
        </ul>
      )}
  
      {(isLoading || isFetching) && <Spinner />}
  
      {data && data.next && (
        <button onClick={handleLoadMore} disabled={isFetching}>
          {isFetching ? "Cargando..." : "Siguiente página"}
        </button>
      )}
      <Modal isOpen={isModalOpen} onClose={closeModal} item={selectedItem} />
    </>
  );  
}

export default App;
