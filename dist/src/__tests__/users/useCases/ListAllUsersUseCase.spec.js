"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const UsersRepository_1 = require("../../../modules/users/repositories/implementations/UsersRepository");
const ListAllUsersUseCase_1 = require("../../../modules/users/useCases/listAllUsers/ListAllUsersUseCase");
describe("ListAllUsersUseCase", () => {
    let usersRepository;
    let listAllUsersUseCase;
    let userId;
    beforeAll(() => {
        usersRepository = UsersRepository_1.UsersRepository.getInstance();
        listAllUsersUseCase = new ListAllUsersUseCase_1.ListAllUsersUseCase(usersRepository);
    });
    it("should be able to list all users", () => {
        const user1 = usersRepository.create({
            name: "Danilo Vieira",
            email: "danilo@rocketseat.com",
        });
        const user2 = usersRepository.create({
            name: "Vinicius Fraga",
            email: "vinifraga@rocketseat.com",
        });
        userId = user2.id;
        const user3 = usersRepository.create({
            name: "Joseph Oliveira",
            email: "dogim@rocketseat.com",
        });
        usersRepository.turnAdmin(user1);
        const users = listAllUsersUseCase.execute({ user_id: user1.id });
        expect(users).toEqual(expect.arrayContaining([
            expect.objectContaining({
                name: "Danilo Vieira",
                email: "danilo@rocketseat.com",
            }),
            user2,
            user3,
        ]));
    });
    it("should not be able to a non admin user get list of all users", () => {
        expect(() => {
            listAllUsersUseCase.execute({ user_id: userId });
        }).toThrow();
    });
    it("should not be able to a non existing user get list of all users", () => {
        expect(() => {
            listAllUsersUseCase.execute({ user_id: uuid_1.v4() });
        }).toThrow();
    });
});
