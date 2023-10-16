import React, { useState } from 'react';
import '../App.css';
import Header from '../components/Header';
import Digimon from '../components/Digimon';
import '../styles/search.css';

function Search() {
  const [searchDigimon, setSearchDigimon] = useState('');
  const [digimon, setDigimon] = useState({});
  const [isFetched, setIsFetched] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const inputValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setSearchDigimon(target.value);
  };

  const requestDigimon = async () => {
    if (searchDigimon) {
      try {
        const URL = 'https://digimon-api.vercel.app/api/digimon/name';
        const result = await fetch(`${URL}/${searchDigimon}`);
        const digimons = await result.json();
        setDigimon(digimons[0]);
        setIsFetched(true);
        setErrorMessage(digimons.ErrorMsg);
      } catch (error) {
        console.log(`Erro ao fazer a requisição: ${error}`);
      }
    }
  };

  return (
    <>
      <Header />
      <h1>Search Digimon</h1>
      <main className="App">
        <label htmlFor="search-input">
          Digimon:
          <input
            id="search-input"
            placeholder="Ex. Greymon"
            value={ searchDigimon }
            onChange={ inputValue }
          />
        </label>
        <button
          onClick={ requestDigimon }
          type="button"
        >
          Search Digimon
        </button>
        {isFetched && <Digimon digimon={ digimon } error={ errorMessage } /> }
      </main>
    </>
  );
}

export default Search;
