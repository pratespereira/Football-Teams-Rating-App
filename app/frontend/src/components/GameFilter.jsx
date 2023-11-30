import React, { useState } from 'react';
import PropTypes from 'prop-types';

const GamerFilter = ({ currentFilter, setCurrentFilter }) => {
  // Estado local para gerenciar a seleção atual
  const [selectedFilter, setSelectedFilter] = useState(currentFilter);

  // Atualiza o estado local com a seleção do usuário
  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  // Atualiza o filtro externo quando o botão é clicado
  const handleCurrentFilter = () => {
    setCurrentFilter(selectedFilter);
  };

  return (
    <form>
      <label htmlFor="game-filter">
        Partidas:
        <select
          id="game-filter"
          value={selectedFilter}
          onChange={handleFilterChange}
          data-testid="matches__option_show_finish_matches"
        >
          <option>Todos os Jogos</option>
          <option>Em andamento</option>
          <option>Finalizado</option>
        </select>
      </label>
      <button
        data-testid="matches__search_match_btn"
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
