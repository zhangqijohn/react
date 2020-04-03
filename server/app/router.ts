import { Application } from "egg";

export default (app: Application) => {
    const { router, controller } = app;

    router.get('/user', controller.user.index);
    router.get('/game', controller.game.index);
}