import * as chai from "chai";
// @ts-ignore
import chaiHttp = require("chai-http");
import { userMockToken } from "./Mocks/userMock";
import { teamMock } from "./Mocks/teamMock";
import { app } from "../app";

chai.use(chaiHttp);

const { expect } = chai;

describe("Team", () => {
  describe("get teams", () => {
    it("should return a list of teams", async () => {
      const getTeams = await chai.request(app).get("/teams");
      expect(getTeams.status).to.equal(200);
      expect(getTeams.body).to.have.property("teams");
      expect(getTeams.body.teams).to.deep.equal(teamMock);
    });
    it("should return a team", async () => {
      const getTeam = await chai.request(app).get("/teams/1");
      expect(getTeam.status).to.equal(200);
      expect(getTeam.body).to.have.property("team");
      expect(getTeam.body.team).to.deep.equal(teamMock[0]);
    });
  });
});
