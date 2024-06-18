import React, { useState } from 'react';
import MenuHeader from './MenuHeader';
import Results from './Results';
import './styles.css';
import pokeLogo from'./pokemon logo.jpg'

function App() {
  const [searchCriteria, setSearchCriteria] = useState({ name: [], type: [], region: '' });
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleSearch = async () => {
    const { name, type } = searchCriteria;
    let apiUrl = `https://pokeapi.co/api/v2`;
    let fetchedResults = [];
    let typeResults = [];

    try {
      // Fetch by name
      if (name.length > 0) {
        for (const pokeName of name) {
          const response = await fetch(`${apiUrl}/pokemon/${pokeName.toLowerCase()}`);
          if (response.ok) {
            const data = await response.json();
            fetchedResults.push(data);
          }
        }
      }

      // Fetch by type
      if (type.length > 0) {
        for (const pokeType of type) {
          const response = await fetch(`${apiUrl}/type/${pokeType.toLowerCase()}`);
          if (response.ok) {
            const data = await response.json();
            const typePokemons = data.pokemon.map(p => p.pokemon);
            for (const typePokemon of typePokemons) {
              const pokemonResponse = await fetch(typePokemon.url);
              if (pokemonResponse.ok) {
                const pokemonData = await pokemonResponse.json();
                typeResults.push(pokemonData);
              }
            }
          }
        }
      }

      // Combine and filter results
      const combinedResults = [...fetchedResults, ...typeResults];
      const uniqueResults = combinedResults.reduce((acc, current) => {
        const x = acc.find(item => item.id === current.id);
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, []);

      setResults(uniqueResults);
      setCurrentPage(1);
    } catch (error) {
      console.error(error);
      setResults([]);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const paginatedResults = results.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <body>
      <header>
          <img src={pokeLogo}></img>
          <p>Powered by <a href="https://pokeapi.co/" target="_blank" rel="noopener noreferrer">pokeapi</a></p>
      </header>
      <div className='container'>
      <MenuHeader setSearchCriteria={setSearchCriteria} searchCriteria={searchCriteria}/>
      <Results 
        results={paginatedResults} 
        onSearch={handleSearch} 
        currentPage={currentPage} 
        totalPages={Math.ceil(results.length / itemsPerPage)} 
        onPageChange={handlePageChange} 
      />
      </div>
      </body>
    </>
  );
}

export default App;
