module.exports = {
    request (root, url, opts) {
        url = `${root}${url}`;
        opts = Object.assign({
            dataType: 'json',
        }, opts);

        return this.ctx.curl(url, opts);
    }
};