import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for client", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });
    it("should create a client", async () => {
        const input = {
            id: '1',
            name: 'My client',
            document: '000000000',
            email: 'test@domain.com',
            street: "16 avenus",
            number: "123",
            complement: "Ap 400",
            city: "My city",
            state: "State",
            zipCode: "89777310",
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const response = await request(app)
            .post("/clients")
            .send(input);

        expect(response.status).toBe(201);
    });
});