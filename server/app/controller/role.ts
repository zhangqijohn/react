import { Controller } from "egg";

export default class RoleController extends Controller {
    constructor(ctx) {
        super(ctx);
    }

    async list () {
        const { ctx } = this;
        const data = {

        };

        ctx.body = { data };
    }
}