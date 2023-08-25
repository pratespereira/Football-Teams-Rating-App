import { Model, DataTypes } from 'sequelize';
import db from '.';
import Team from './Team';

export default class Match extends Model {
  declare id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Match.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    homeTeamId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Team,
        key: 'id',
      },
    },
    homeTeamGoals: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    awayTeamId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Team,
        key: 'id',
      },
    },
    awayTeamGoals: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    inProgress: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    underscored: true,
    sequelize: db,
    modelName: 'Match',
    timestamps: false,
    tableName: 'matches',
  },
);

Team.hasMany(Match, { foreignKey: 'homeTeamId' });
Team.hasMany(Match, { foreignKey: 'awayTeamId' });
Match.belongsTo(Team, { foreignKey: 'homeTeamId', as: 'homeTeam' });
Match.belongsTo(Team, { foreignKey: 'awayTeamId', as: 'awayTeam' });
