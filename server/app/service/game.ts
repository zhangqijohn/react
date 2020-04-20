const Service = require('egg').Service;

class game extends Service {
    constructor(ctx:any) {
        super(ctx);
        this.root = 'http://advertisement.dev.q1op.com';
    }

    async list (params:any = {}) {
        return await this.ctx.helper.request(this.root,'/api/adbank/game', {
            data: params
        });

    }
}

export default game;
