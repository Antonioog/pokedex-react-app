import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./styles/Pokemon.css"

const Pokemon = () => {
  const [pokemon, setpokemon] = useState();

  const { id } = useParams();

  const getPercentBar = (stat) => {
    const percent = (stat * 100) / 255;
    return `${percent}%`;
  }

  useEffect(() => {
    const URL = `https://pokeapi.co/api/v2/pokemon/${id}`;
    axios
      .get(URL)
      .then((res) => setpokemon(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <main>
      {/*Parte superior*/}
      <section className="pokemon__info">
        <section className="pokemon__sub-info">
          <div className={`pokemonCard__header bg-lg-${pokemon?.types[0].type.name}`}>
            <img className="pokemon__img-card"
              src={pokemon?.sprites.other["official-artwork"].front_default}
              alt=""
            />
          </div>
        </section>
      </section>

      {/*Body*/}
      <section className="pokemon__body">
        <h2 className="pokemon__id">#{pokemon?.id}</h2>
        <h2 className="pokemon__name">{pokemon?.name}</h2>
        <div className="pokemon__section-info">
          <div className="pokemon__info-weight">
            <h5 className="pokemon__weight-text">Weight</h5>
            <h4 className="pokemon__weight-number">{pokemon?.weight}</h4>
          </div>
          <div className="pokemon__info-height">
            <h5 className="pokemon__height-text">Height</h5>
            <h4 className="pokemon__height-number">{pokemon?.height}</h4>
          </div>
        </div>

        <div className="pokemon__type-habilities">
          <div className="pokemon__propierties">
            <h3 className="pokemon__type-name">Type</h3>

            <div className="pokemon__type">
              {pokemon?.types.map((type) => (
                <div className="pokemon__type-type" key={type.type.name }>
                  <span>{type.type.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3>Habilities</h3>
            <div className="pokemon__type">
              {pokemon?.abilities.map((ability) => (
                <div className="pokemon__type-type" key={ability.ability.name}>
                  <span>{ability.ability.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <section className="pokemon__stats">
          <h2 className="pokemon__stats-title">Stats</h2>
          <section className="pokemon__stats-info">
            {pokemon?.stats.map((stat) => (
              <article className="pokemon__stat" key={stat.stat.name}>
                <div className="pokemon__stat-header">
                  <h4 className="pokemon__stat-name">{stat.stat.name}</h4>
                  <h5 className="pokemon__stat-value">{stat.base_stat}/255</h5>
                </div>
                <div className="pokemon__stat-bar">
                  <div className="pokemon__stat-barGray">
                    <div className="pokemon__stat-barProgress" style={{width: getPercentBar(stat.base_stat)}}></div>
                  </div>
                </div>
              </article>
            ))}
          </section>
        </section>
      </section>
    </main>
  );
};

export default Pokemon;
