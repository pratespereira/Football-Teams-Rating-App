import * as chai from "chai";
// @ts-ignore
import chaiHttp = require("chai-http");
import { app } from "../app";
import User from "../database/models/User";
import { tokenCreate, checkPassword, checkToken } from "../validations/loginValidations";
import { userHashedPassword, userMock, userMockForPassword, userMockToken } from "./Mocks/userMock";
import IUserXPass from "../interfaces/IUserXPass";

chai.use(chaiHttp);

const { expect } = chai;

describe("Login Validations", () => {
    it("should create a token", () => {
        const token = tokenCreate(userMockForPassword as IUserXPass);
        expect(token).to.be.a("string");
    });
    
    it("should check the password", () => {
        const password = checkPassword("123456", userHashedPassword);
        expect(password).to.be.a("object");
    });
    
    it("should check the token", () => {
        const token = checkToken(userMockToken);
        expect(token).to.be.a("object");
    });
});
