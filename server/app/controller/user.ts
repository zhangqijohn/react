import { Controller } from "egg";
import { getManager } from "typeorm";
import { User } from "../entity/user";

export default class UserController extends Controller{
    async index() {
        const { ctx } = this;
        const userRepository = getManager().getRepository(User);
        const data = await userRepository.find();

        ctx.body = { data }
    }
}