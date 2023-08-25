import * as chai from "chai";
// @ts-ignore
import chaiHttp = require("chai-http");
import { userMockToken } from "./Mocks/userMock";
import { matchesMock } from "./Mocks/matchesMock";
import { app } from "../app";

chai.use(chaiHttp);

const { expect } = chai;

describe("Matches", () => {
  describe("get matches", () => {
    it("should return a list of matches", async () => {
      const getMatches = await chai.request(app).get("/matches");
      expect(getMatches.status).to.equal(200);
      expect(getMatches.body).to.have.property("matches");
      expect(getMatches.body.matches).to.deep.equal(matchesMock);
    });
    it("should create a match", async () => {
      const createMatch = await chai
        .request(app)
        .post("/matches")
        .set("Authorization", `Bearer ${userMockToken}`)
        .send({
          homeTeamId: 1,
          awayTeamId: 2,
          homeTeamGoals: 1,
          awayTeamGoals: 0,
        });
      expect(createMatch.status).to.equal(201);
      expect(createMatch.body).to.have.property("message");
    });
    it("should finish a match", async () => {
      const finishMatch = await chai
        .request(app)
        .patch("/matches/1/finish")
        .set("Authorization", `Bearer ${userMockToken}`);
      expect(finishMatch.status).to.equal(200);
      expect(finishMatch.body).to.have.property("message");
      expect(finishMatch.body.message).to.equal("Finished");
    });
    it("should update a match", async () => {
      const match = matchesMock.find(match => match.id === 1);
      if (!match) {
        throw new Error("Match with id 1 not found in matchesMock");
      }

      const updateMatch = await chai
        .request(app)
        .patch("/matches/1")
        .set("Authorization", userMockToken)
        .send({
          homeTeamGoals: 2,
          awayTeamGoals: 0,
        });
      expect(updateMatch.status).to.equal(200);
      expect(updateMatch.body).to.have.property("message");
      expect(updateMatch.body.message).to.equal("Updated");
    });
  });
});