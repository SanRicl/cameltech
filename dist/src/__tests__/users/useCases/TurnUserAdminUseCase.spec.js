"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const UsersRepository_1 = require("../../../modules/users/repositories/implementations/UsersRepository");
const TurnUserAdminUseCase_1 = require("../../../modules/users/useCases/turnUserAdmin/TurnUserAdminUseCase");
describe("TurnUserAdminUseCase", () => {
    let usersRepository;
    let turnUserAdminUseCase;
    beforeAll(() => {
        usersRepository = UsersRepository_1.UsersRepository.getInstance();
        turnUserAdminUseCase = new TurnUserAdminUseCase_1.TurnUserAdminUseCase(usersRepository);
    });
    it("should be able to turn an user as admin", () => {
        const user = usersRepository.create({
            name: "Joseph Oliveira",
            email: "dogim@rocketseat.com",
        });
        const updatedUser = turnUserAdminUseCase.execute({ user_id: user.id });
        expect(updatedUser.admin).toBe(true);
        expect(usersRepository.list()).toStrictEqual(expect.arrayContaining([updatedUser]));
    });
    it("should not be able to turn a non existing user as admin", () => {
        expect(() => {
            turnUserAdminUseCase.execute({ user_id: uuid_1.v4() });
        }).toThrow();
    });
});
