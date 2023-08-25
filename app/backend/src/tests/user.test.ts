import * as chai from "chai";
// @ts-ignore
import chaiHttp = require("chai-http");
import { userMock, userMockToken } from "./Mocks/userMock";
import { app } from "../app";
import User from "../database/models/User";

chai.use(chaiHttp);

const { expect } = chai;

describe("User", () => {
  it("should return a token", async () => {
    const user = await User.create(userMock);
    const login = await chai
      .request(app)
      .post("/login")
      .send({ email: user.email, password: user.password });
    expect(login.status).to.equal(200);
    expect(login.body).to.have.property("token");
    it("should return user role", async () => {
      const user = await User.create(userMock);
      const getRole = await chai
        .request(app)
        .get("/login/validate")
        .set("Authorization", userMockToken);
      expect(getRole.status).to.equal(200);
      expect(getRole.body).to.have.property("role");
      expect(getRole.body.role).to.equal(user.role);
    });
  });
});