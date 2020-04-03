import { Controller } from "egg";

export default class GameController extends Controller{
    async index() {
        const { ctx } = this;
        const data = await ctx.service.game.list();

        ctx.body = { data }
    }
}