import React, { useState } from 'react';
import PropTypes from 'prop-types';

import TeamOption from './TeamOption';
import Scoreboard from './Scoreboard';

const NOT_CREATED = 'not-created';
const IN_PROGRESS = 'in-progress';

const CreateNewGame = ({
  teams,
  setTeams,
  getTeam,
  homeTeamScoreboard,
  setHomeTeamScoreboard,
  awayTeamScoreboard,
  setAwayTeamScoreboard,
  createMatch,
  finishMatch,
}) => {
  const [inProgress, setInProgress] = useState(NOT_CREATED);
  const [createdMatch, setCreatedMatch] = useState(null);

  const handleSaveMatch = async () => {
    const body = await createMatch();
    setCreatedMatch(body);
    setInProgress(IN_PROGRESS);
  };

  const handleFinishMatch = () => {
    if (createdMatch && createdMatch.id) {
      finishMatch(createdMatch.id);
    }
  };

  return (
    <section className="match-settings-section">
      <form className="match-settings-form">
        <div className="match-settings-form-options">
          <TeamOption
            testId="insertion_matches__select_home_team"
            teams={teams}
            setTeams={setTeams}
            homeTeam
            getTeam={getTeam}
          />
          <Scoreboard
            testId="insertion_matches__select_quantity_goals_home_team"
            homeTeam
            score={homeTeamScoreboard}
            setScore={setHomeTeamScoreboard}
          />
          <div className="match-settings-form-versus">
            <span />
            <span>X</span>
          </div>
          <Scoreboard
            testId="insertion_matches__select_quantity_goals_away_team"
            homeTeam={false}
            score={awayTeamScoreboard}
            setScore={setAwayTeamScoreboard}
          />
          <TeamOption
            testId="insertion_matches__select_away_team"
            teams={teams}
            setTeams={setTeams}
            homeTeam={false}
            getTeam={getTeam}
          />
        </div>
        <div className="match-settings-form-buttons">
          <button
            data-testid="insertion_matches__save_match_btn"
            onClick={handleSaveMatch}
            type="button"
            disabled={inProgress !== NOT_CREATED}
          >
            Salvar Partida
          </button>
          <button
            data-testid="insertion_matches__finish_match_btn"
            onClick={handleFinishMatch}
            type="button"
            disabled={inProgress === NOT_CREATED}
          >
            Finalizar Partida
          </button>
        </div>
      </form>
    </section>
  );
};

CreateNewGame.propTypes = {
  teams: PropTypes.arrayOf(PropTypes.object).isRequired,
  setTeams: PropTypes.func.isRequired,
  getTeam: PropTypes.func.isRequired,
  homeTeamScoreboard: PropTypes.number.isRequired,
  setHomeTeamScoreboard: PropTypes.func.isRequired,
  awayTeamScoreboard: PropTypes.number.isRequired,
  setAwayTeamScoreboard: PropTypes.func.isRequired,
  createMatch: PropTypes.func.isRequired,
  finishMatch: PropTypes.func.isRequired,
};

export default CreateNewGame;
