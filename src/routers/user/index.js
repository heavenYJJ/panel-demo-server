const Router = require('koa-router');
const controllerUser = require('../../controller/user');
const checkLogin = require('../../middleware/checkLogin');
const user = new Router();

user.get('/list', checkLogin, controllerUser.getUserList);
user.post('/add', checkLogin, controllerUser.addUser);
user.post('/edit', checkLogin, controllerUser.editUser);
user.post('/del', checkLogin, controllerUser.delUser);
user.get('/login', controllerUser.login);

module.exports = user