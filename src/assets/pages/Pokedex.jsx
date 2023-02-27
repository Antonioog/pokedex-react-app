import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PokemonCard from "../../components/pokedex/PokemonCard";
import "./styles/PokedexContent.css"


const Pokedex = () => {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonsFilter, setPokemonsFilter] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectType, setSelectType] = useState("");
  const [pokemonName, setPokemonName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const nameTrainer = useSelector((store) => store.nameTrainer);

  const handleChangeSelect = (e) => {
    setSelectType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPokemonName(e.target.pokemonName.value);
  };

  const paginationLogic = () => {
    //Cantidad de pokemons por pagina
    const pokemonPerPage = 12;

    //Definir los pokemons que se van a mostrar en la  pagina actual
    const sliceStart = (currentPage - 1) * pokemonPerPage;
    const sliceEnd = sliceStart + pokemonPerPage;
    const pokemonsInPage = pokemonsFilter.slice(sliceStart, sliceEnd);

    //Ultima pagina
    const lastPage = Math.ceil(pokemonsFilter.length / pokemonPerPage) || 1;

    //Bloque actual
    const pagesPerBlock = 5;
    const actualBlock = Math.ceil(currentPage / pagesPerBlock);

    //Paginas que se van a mostrar en el bloque actual
    const pageInBlock = [];
    const minPage = actualBlock * pagesPerBlock - pagesPerBlock + 1;
    const maxPage = actualBlock * pagesPerBlock;
    for (let i = minPage; i <= maxPage; i++) {
      if (i <= lastPage) {
        pageInBlock.push(i);
      }
    }
    return { pageInBlock, lastPage, pokemonsInPage };
  };

  const { pageInBlock, lastPage, pokemonsInPage } = paginationLogic();

  const handleNextPage = () => {
    const newPage = currentPage + 1;
    if (newPage > lastPage) {
      setCurrentPage(1);
    } else {
      setCurrentPage(nextPage);
    }
  };

  const handlePreviewPage = () => {
    const newPage = currentPage - 1;
    if (newPage < 1) {
      setCurrentPage(lastPage);
    } else {
      setCurrentPage(newPage);
    }
  };

  useEffect(() => {
    const URL = `https://pokeapi.co/api/v2/${
      selectType ? `type/${selectType}/` : "pokemon/?limit=1279"
    }`;
    axios
      .get(URL)
      .then((res) => {
        if (selectType) {
          const pokemonByType = res.data.pokemon.map((pokemon) => {
            return {
              name: pokemon.pokemon.name,
              url: pokemon.pokemon.url,
            };
          });
          setPokemons(pokemonByType);
        } else {
          setPokemons(res.data.results);
        }
      })
      .catch((err) => console.log(err));
  }, [selectType]);

  useEffect(() => {
    const URL = "https://pokeapi.co/api/v2/type/";
    axios
      .get(URL)
      .then((res) => setTypes(res.data.results))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const pokemonByName = pokemons.filter((pokemon) =>
      pokemon.name.includes(pokemonName.toLowerCase())
    );
    setPokemonsFilter(pokemonByName);
  }, [pokemonName, pokemons]);

  useEffect(() => {
    setCurrentPage(1);
  }, [pokemons]);

  return (
    <main className="pokedex">
       <p className="pokedex__text">
        <span className="pokedex__span">Welcome {nameTrainer}</span>, here you can find information about
        your favorite pokemon
      </p>
      <div className="pokedex__header">
     
      <form className="pokedex__form" onSubmit={handleSubmit}>
        <div>
          <input
            className="pokedex__input"
            id="pokemonName"
            type="text"
            placeholder="Serch your pokemon"
          />
          <button className="pokedex__button">Search</button>
          <select className="pokedex__option" onChange={handleChangeSelect}>
          <option value="">All</option>
          {types.map((type) => (
            <option key={type.url}>{type.name}</option>
          ))}
        </select>
        </div>
       
      </form>
      </div>
      
      <section className="pokedex__content">
        {pokemonsInPage.map((pokemon) => (
          <PokemonCard key={pokemon.url} pokemonUrl={pokemon.url} />
        ))}
      </section>
      <section className="pokedex__pages">
        <ul className="pokedex__page">
          <li className="pokedex__init" onClick={handlePreviewPage}>{"<<"}</li>
          <li  className="pokedex__preview" onClick={() => setCurrentPage(1)}>...</li>
          {pageInBlock.map((page) => (
            <li className="pokedex__current-page" onClick={() => setCurrentPage(page)} key={page}>
              {page}
            </li>
          ))}
          <li className="pokedex__next-page" onClick={() => setCurrentPage(lastPage)}>...</li>
          <li className="pokedex__end" onClick={handleNextPage}>{">>"}</li>
        </ul>
      </section>
    </main>
  );
};

export default Pokedex;
