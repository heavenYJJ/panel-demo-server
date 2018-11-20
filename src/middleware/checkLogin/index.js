const response = require('../../utils/response');

module.exports = async (ctx, next) => {
  const {session} = ctx;
  if (!session.id) {
    ctx.body = response.needLogin;
    return;
  }
  await next()
}