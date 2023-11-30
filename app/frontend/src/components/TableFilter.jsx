import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/pages/games.css';

const GamerFilter = ({ currentFilter, setCurrentFilter }) => {
  // Usando estado local para o valor do filtro
  const [filter, setFilter] = useState(currentFilter);

  const handleCurrentFilter = () => {
    setCurrentFilter(filter);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <form>
      <label htmlFor="classification-filter">
        Partidas:
        <select
          id="classification-filter"
          value={filter}
          onChange={handleFilterChange}
          data-testid="score_boarding__classification_filter"
        >
          <option>Classificação Geral</option>
          <option>Classificação Mandantes</option>
          <option>Classificação Visitantes</option>
        </select>
      </label>
      <button
        data-testid="score_boarding__classification_filter_button"
        type="button"
        onClick={handleCurrentFilter}
      >
        Buscar
      </button>
    </form>
  );
};

GamerFilter.propTypes = {
  currentFilter: PropTypes.string.isRequired,
  setCurrentFilter: PropTypes.func.isRequired,
};

export default GamerFilter;

