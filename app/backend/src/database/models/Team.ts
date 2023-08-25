import { Model, DataTypes } from 'sequelize';
import db from '.';

export default class Team extends Model {
  declare id: number;
  declare teamName: string;
}

Team.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    teamName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    underscored: true,
    sequelize: db,
    modelName: 'Team',
    timestamps: false,
    tableName: 'teams',
  },
);
