import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { CreateTagController } from "./controllers/CreateTagController";
import { CreateUserController } from "./controllers/CreateUserController";
import { ListTagsController } from "./controllers/ListTagsController";
import { ListUserReceiveComplimentsController } from "./controllers/ListUserReceiveComplimentsController";
import { ListUsersController } from "./controllers/ListUsersController";
import { ListUserSendComplimentsController } from "./controllers/ListUserSendComplimentsController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

const router = Router();

const createUserController = new CreateUserController();
const createtagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const complimentController = new CreateComplimentController();
const listUserSendComplimentsController = new ListUserSendComplimentsController();
const listUserReceiveComplimentsController = new ListUserReceiveComplimentsController();
const listTagsController = new ListTagsController();
const listUsersController = new ListUsersController();

router
    .post("/users", createUserController.handle)
    .get("/users", ensureAuthenticated, listUsersController.handle);

router
    .post("/tags", ensureAuthenticated, ensureAdmin, createtagController.handle)
    .get("/tags", ensureAuthenticated, listTagsController.handle);

router.post("/login", authenticateUserController.handle);

router
    .post("/compliments", ensureAuthenticated, complimentController.handle)
    .get("/users/compliments/send", ensureAuthenticated, listUserSendComplimentsController.handle)
    .get("/users/compliments/receive", ensureAuthenticated, listUserReceiveComplimentsController.handle);

export { router }