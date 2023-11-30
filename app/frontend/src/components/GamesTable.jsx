import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { requestData } from '../services/requests';
import Loading from './Loading';
import { check, editIcon } from '../images';

const GameRow = React.memo(({ game, isAdm, onNavigate }) => {
  const { id, homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, inProgress } = game;

  return (
    <tr key={id}>
      <td className="games-table-tbody-home-team" data-testid={`matches__home_team_${id}`}>
        {homeTeam.teamName}
      </td>
      <td className="games-table-tbody-home-team-goals" data-testid={`matches__home_team_goals_${id}`}>
        {homeTeamGoals}
      </td>
      <td className="games-table-tbody-versus"></td>
      <td className="games-table-tbody-away-team-goals" data-testid={`matches__away_team_goals_${id}`}>
        {awayTeamGoals}
      </td>
      <td className="games-table-tbody-away-team" data-testid={`matches__away_team_${id}`}>
        {awayTeam.teamName}
      </td>
      <td className="games-table-tbody-empty-space"></td>
      <td className="games-table-tbody-status">
        <div>
          {
            inProgress ? (
              <p className="game-status in-progress" data-testid={`matches__match_status_${id}`}>
                Em andamento
              </p>
            ) : (
              <p className="game-status finished-game" data-testid={`matches__match_status_${id}`}>
                Finalizado
              </p>
            )
          }
        </div>
        {
          isAdm && (
            <button
              type="button"
              data-testid={`matches__match_status_btn_${id}`}
              disabled={!inProgress}
              onClick={() => onNavigate(game)}
            >
              {inProgress ? <img src={editIcon} alt="Jogo em andamento" /> : <img src={check} alt="Jogo finalizado" />}
            </button>
          )
        }
      </td>
    </tr>
  );
});

const GamesTable = ({ currentFilter, isAdm }) => {
  const [games, setGames] = useState([]);
  const navigate = useNavigate();

  const getGames = async (endpoint) => {
    try {
      const response = await requestData(endpoint);
      setGames(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const endpoint = '/matches';
    const filterEndpoint = `${endpoint}?inProgress=${currentFilter === 'Em andamento'}`;

    getGames(currentFilter !== 'Todos' ? filterEndpoint : endpoint);
  }, [currentFilter]);

  const handleNavigate = (game) => {
    navigate('/matches/settings', { state: game });
    localStorage.setItem('game', 'editar');
  };

  if (!games.length) {
    return <Loading />;
  }

  return (
    <table className="games-table">
      <thead>
        <tr>
          <th className="games-table-thead-home-team">Time Mandante</th>
          <th className="games-table-thead-goals">Gols</th>
          <th className="games-table-thead-versus">{ ' ' }</th>
          <th className="games-table-thead-goals">Gols</th>
          <th className="games-table-thead-away-team">Time Visitante</th>
          <th className="games-table-thead-empty-space">{ ' ' }</th>
          <th className="games-table-thead-status">Status</th>
        </tr>
      </thead>
      <tbody>
        {games.sort((a, b) => b.inProgress - a.inProgress).map((game) => (
          <GameRow key={game.id} game={game} isAdm={isAdm} onNavigate={handleNavigate} />
        ))}
      </tbody>
    </table>
  );
};

GamesTable.propTypes = {
  currentFilter: PropTypes.string.isRequired,
  isAdm: PropTypes.bool.isRequired,
};

export default GamesTable;