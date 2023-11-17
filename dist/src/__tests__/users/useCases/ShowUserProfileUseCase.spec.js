"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const UsersRepository_1 = require("../../../modules/users/repositories/implementations/UsersRepository");
const ShowUserProfileUseCase_1 = require("../../../modules/users/useCases/showUserProfile/ShowUserProfileUseCase");
describe("ShowUserProfileUseCase", () => {
    let usersRepository;
    let showUserProfileUseCase;
    beforeAll(() => {
        usersRepository = UsersRepository_1.UsersRepository.getInstance();
        showUserProfileUseCase = new ShowUserProfileUseCase_1.ShowUserProfileUseCase(usersRepository);
    });
    it("should be able to get user profile by ID", () => {
        const user = usersRepository.create({
            name: "Danilo Vieira",
            email: "danilo@rocketseat.com",
        });
        const findUser = showUserProfileUseCase.execute({ user_id: user.id });
        expect(findUser).toMatchObject(user);
    });
    it("should not be able to show profile of a non existing user", () => {
        expect(() => {
            showUserProfileUseCase.execute({ user_id: uuid_1.v4() });
        }).toThrow();
    });
});
