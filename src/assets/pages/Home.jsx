import React from "react";
import { useDispatch } from "react-redux";
import { setNameTrainerGlobal } from "../../slices/nameTrainer.slice";
import "./styles/home.css"

const Home = () => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const nameTrainer = e.target.nameTrainer.value;
    dispatch(setNameTrainerGlobal(nameTrainer));
  };
  return (
    <main className="home">
      <section className="home__section">
        <div className="home__img">
          <img src="/images/pokedex.png" alt="imagen pokedex" />
        </div>
        <h2 className="home__title">Hi triner!</h2>
        <p className="home__text">Givme your name to start!</p>
        <form className="home__form" onSubmit={handleSubmit}>
          <input
            className="home__input"
            id="nameTrainer"
            type="text"
            placeholder="Your name..."
            required
          />
          <button className="home__button">Start</button>
        </form>
      </section>

      <header className="home-footer">
      <div className="home__red">
      </div>
      <div className="home__black">
        <div className="header__pokeball">
      
        </div>
      </div>
    </header>
    </main>
  );
};

export default Home;
