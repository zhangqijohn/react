export default ()=> {
    return async function (ctx, next) {
        try {
            await next();
        } catch (err) {
            //TODO 需要与Service层约定好code和命名格式
            const status = err.status || 500;
            const error = err.request && err.request.data && err.request.data.errorMsg || 'Internet Work 500';

            ctx.body = {
                error
            };

            ctx.status = status;
        }
    }
}