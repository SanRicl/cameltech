"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UsersRepository_1 = require("../../../modules/users/repositories/implementations/UsersRepository");
const CreateUserUseCase_1 = require("../../../modules/users/useCases/createUser/CreateUserUseCase");
describe("CreateUserUseCase", () => {
    let createUserUseCase;
    let usersRepository;
    beforeAll(() => {
        usersRepository = UsersRepository_1.UsersRepository.getInstance();
        createUserUseCase = new CreateUserUseCase_1.CreateUserUseCase(usersRepository);
    });
    it("should be able to create new users", () => {
        const user = createUserUseCase.execute({
            name: "Danilo Vieira",
            email: "danilo@rocketseat.com",
        });
        expect(usersRepository.list()).toStrictEqual([user]);
    });
    it("should not be able to create new users when email is already taken", () => {
        expect(() => {
            createUserUseCase.execute({
                name: "Danilo Vieira",
                email: "danilo@rocketseat.com",
            });
        }).toThrow();
    });
});
