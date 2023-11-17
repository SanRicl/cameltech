"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const UsersRepository_1 = require("../../../modules/users/repositories/implementations/UsersRepository");
describe("UsersRepository", () => {
    let usersRepository;
    beforeAll(() => {
        usersRepository = UsersRepository_1.UsersRepository.getInstance();
    });
    it("should be able to create new users", () => {
        const user = usersRepository.create({
            name: "Vinicius Fraga",
            email: "vinifraga@rocketseat.com",
        });
        expect(user).toMatchObject({
            name: "Vinicius Fraga",
            email: "vinifraga@rocketseat.com",
            admin: false,
        });
        expect(uuid_1.validate(user.id)).toBe(true);
        expect(user.created_at).toBeInstanceOf(Date);
        expect(user.updated_at).toBeInstanceOf(Date);
    });
    it("should be able to list all users", () => {
        const user = usersRepository.create({
            name: "Danilo Vieira",
            email: "danilo@rocketseat.com",
        });
        const users = usersRepository.list();
        expect(users).toStrictEqual(expect.arrayContaining([user]));
    });
    it("should be able to find user by ID", () => {
        const user = usersRepository.create({
            name: "Vinicius Fraga",
            email: "vinifraga@rocketseat.com",
        });
        const findUser = usersRepository.findById(user.id);
        expect(findUser).toMatchObject({
            name: user.name,
            email: user.email,
            admin: false,
        });
        expect(uuid_1.validate(findUser.id)).toBe(true);
        expect(findUser.created_at).toBeInstanceOf(Date);
        expect(findUser.updated_at).toBeInstanceOf(Date);
    });
    it("should be able to find user by e-mail address", () => {
        const user = usersRepository.create({
            name: "Vinicius Fraga",
            email: "vinifraga@rocketseat.com",
        });
        const findUser = usersRepository.findByEmail(user.email);
        expect(findUser).toMatchObject({
            name: user.name,
            email: user.email,
            admin: false,
        });
        expect(uuid_1.validate(findUser.id)).toBe(true);
        expect(findUser.created_at).toBeInstanceOf(Date);
        expect(findUser.updated_at).toBeInstanceOf(Date);
    });
    it("should be able to turn an user as admin", () => {
        const user = usersRepository.create({
            name: "Vinicius Fraga",
            email: "vinifraga@rocketseat.com",
        });
        const admin = usersRepository.turnAdmin(user);
        expect(admin).toMatchObject({
            name: user.name,
            email: user.email,
            admin: true,
        });
        expect(uuid_1.validate(admin.id)).toBe(true);
        expect(admin.created_at).toBeInstanceOf(Date);
        expect(admin.updated_at).toBeInstanceOf(Date);
    });
});
