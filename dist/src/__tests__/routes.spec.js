"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const uuid_1 = require("uuid");
const index_1 = require("../index");
const UsersRepository_1 = require("../modules/users/repositories/implementations/UsersRepository");
describe("[POST] /users", () => {
    it("should be able to create new users", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest_1.default(index_1.app)
            .post("/users")
            .send({
            name: "John Doe",
            email: "john.doe@example.com",
        })
            .expect(201);
        expect(response.body).toMatchObject({
            name: "John Doe",
            email: "john.doe@example.com",
            admin: false,
        });
    }));
    it("should not be able to create new users when email is already taken", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest_1.default(index_1.app)
            .post("/users")
            .send({
            name: "John Doe",
            email: "john.doe@example.com",
        })
            .expect(400);
        expect(response.body.error).toBeTruthy();
    }));
});
describe("[PATCH] /users/:user_id/admin", () => {
    it("should be able to turn an user as admin", () => __awaiter(void 0, void 0, void 0, function* () {
        const usersRepository = UsersRepository_1.UsersRepository.getInstance();
        const user = usersRepository.create({
            name: String(Math.random()),
            email: String(Math.random()),
        });
        const response = yield supertest_1.default(index_1.app).patch(`/users/${user.id}/admin`);
        expect(response.body).toMatchObject({
            name: user.name,
            email: user.email,
        });
        expect(response.body.admin).toBe(true);
    }));
    it("should not be able to turn a non existing user as admin", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest_1.default(index_1.app)
            .patch(`/users/${uuid_1.v4()}/admin`)
            .expect(404);
        expect(response.body.error).toBeTruthy();
    }));
});
describe("[GET] /users/:user_id", () => {
    it("should be able to get user profile by ID", () => __awaiter(void 0, void 0, void 0, function* () {
        const usersRepository = UsersRepository_1.UsersRepository.getInstance();
        const user = usersRepository.create({
            name: String(Math.random()),
            email: String(Math.random()),
        });
        const response = yield supertest_1.default(index_1.app).get(`/users/${user.id}`);
        const parsedResponse = Object.assign(Object.assign({}, response.body), { created_at: new Date(response.body.created_at), updated_at: new Date(response.body.updated_at) });
        expect(parsedResponse).toMatchObject(Object.assign(Object.assign({}, user), { created_at: user.created_at, updated_at: user.updated_at }));
    }));
    it("should not be able to show profile of a non existing user", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest_1.default(index_1.app).get(`/users/${uuid_1.v4()}`).expect(404);
        expect(response.body.error).toBeTruthy();
    }));
});
describe("[GET] /users", () => {
    it("should be able to list all users", () => __awaiter(void 0, void 0, void 0, function* () {
        const usersRepository = UsersRepository_1.UsersRepository.getInstance();
        const user1 = usersRepository.create({
            name: String(Math.random()),
            email: String(Math.random()),
        });
        usersRepository.turnAdmin(user1);
        const user2 = usersRepository.create({
            name: String(Math.random()),
            email: String(Math.random()),
        });
        const user3 = usersRepository.create({
            name: String(Math.random()),
            email: String(Math.random()),
        });
        const response = yield supertest_1.default(index_1.app).get("/users").set("user_id", user1.id);
        expect(response.body.map((res) => (Object.assign(Object.assign({}, res), { created_at: new Date(res.created_at), updated_at: new Date(res.updated_at) })))).toEqual(expect.arrayContaining([
            expect.objectContaining(Object.assign(Object.assign({}, user1), { admin: true })),
            user2,
            user3,
        ]));
    }));
    it("should not be able to a non admin user get list of all users", () => __awaiter(void 0, void 0, void 0, function* () {
        const usersRepository = UsersRepository_1.UsersRepository.getInstance();
        const user = usersRepository.create({
            name: String(Math.random()),
            email: String(Math.random()),
        });
        const response = yield supertest_1.default(index_1.app)
            .get("/users")
            .set("user_id", user.id)
            .expect(400);
        expect(response.body.error).toBeTruthy();
    }));
    it("should not be able to a non admin user get list of all users", () => __awaiter(void 0, void 0, void 0, function* () {
        const usersRepository = UsersRepository_1.UsersRepository.getInstance();
        const user = usersRepository.create({
            name: String(Math.random()),
            email: String(Math.random()),
        });
        const response = yield supertest_1.default(index_1.app)
            .get("/users")
            .set("user_id", user.id)
            .expect(400);
        expect(response.body.error).toBeTruthy();
    }));
    it("should not be able to a non existing user get list of all users", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest_1.default(index_1.app)
            .get("/users")
            .set("user_id", uuid_1.v4())
            .expect(400);
        expect(response.body.error).toBeTruthy();
    }));
});
