import Match from '../database/models/Match';

const homePoints = (acc: number, curr: Match) => {
  if (curr.homeTeamGoals > curr.awayTeamGoals) {
    return acc + 3;
  } if (curr.homeTeamGoals === curr.awayTeamGoals) {
    return acc + 1;
  }
  return acc;
};

const awayPoints = (acc: number, curr: Match) => {
  if (curr.homeTeamGoals < curr.awayTeamGoals) {
    return acc + 3;
  } if (curr.homeTeamGoals === curr.awayTeamGoals) {
    return acc + 1;
  }
  return acc;
};

const drawPoints = (acc: number, curr: Match) => {
  if (curr.homeTeamGoals === curr.awayTeamGoals) {
    return acc + 1;
  }
  return acc;
};

const homeWins = (acc: number, curr: Match) => {
  if (curr.homeTeamGoals > curr.awayTeamGoals) {
    return acc + 1;
  }
  return acc;
};

const awayWins = (acc: number, curr: Match) => {
  if (curr.homeTeamGoals < curr.awayTeamGoals) {
    return acc + 1;
  }
  return acc;
};

const homeGoals = (acc: number, curr: Match) => acc + curr.homeTeamGoals;

const awayGoals = (acc: number, curr: Match) => acc + curr.awayTeamGoals;

export {
  homePoints,
  awayPoints,
  drawPoints,
  homeWins,
  awayWins,
  homeGoals,
  awayGoals,
};
