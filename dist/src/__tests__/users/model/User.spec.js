"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const User_1 = require("../../../modules/users/model/User");
describe("User model", () => {
    it("should be able to create an user with all props", () => {
        const user = new User_1.User();
        Object.assign(user, {
            name: "Atlas",
            email: "atlas@fromspace.com",
            created_at: new Date(),
            updated_at: new Date(),
        });
        expect(user).toMatchObject({
            name: "Atlas",
            email: "atlas@fromspace.com",
            admin: false,
        });
        expect(uuid_1.validate(user.id)).toBe(true);
        expect(user.created_at).toBeInstanceOf(Date);
        expect(user.updated_at).toBeInstanceOf(Date);
    });
});
