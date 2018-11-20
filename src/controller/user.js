const model = require('../utils/db')
const types = require('../utils/type')
const response = require('../utils/response')

exports.getUserList = async (ctx) => {
  const {page, limit} = ctx.query;
  const start = (page - 1) * limit;
  if (!limit || !page) {
    ctx.body = response.paramsError
    return
  }
  const userList = await model.findDataByPage('user_info', '*', Number(start), Number(limit))
  ctx.body = {
    ...response.success,
    data: {
      list: userList
    }
  };
}

exports.addUser = async (ctx) => {
  const {email, password, name, nick, detail_info, level } = ctx.request.body;
  if (!email || !password || !name || !nick || !level ) {
    ctx.body = response.paramsError
    return
  };
  const values = {
    email,
    password,
    name,
    nick,
    detail_info,
    create_time: parseInt(new Date().valueOf()/1000, 10),
    modified_time: parseInt(new Date().valueOf()/1000, 10),
    level,
  }
  const addUser = await model.insertData('user_info', values);
  ctx.body = response.success
}

exports.editUser = async (ctx) => {
  const { id ,email, password, name, nick, detail_info, level } = ctx.request.body;
  if (!id || !email || !password || !name || !nick || !level ) {
    ctx.body = response.paramsError
    return
  };
  const values = {
    email,
    password,
    name,
    nick,
    detail_info,
    modified_time: parseInt(new Date().valueOf()/1000, 10),
    level,
  };
  await model.updateData('user_info', values, id);
  ctx.body = response.success
}

exports.delUser = async (ctx) => {
  const {id} = ctx.request.body;
  if (!id) {
    ctx.body = response.paramsError
    return
  }
  console.log(id);
  const delUserModel = await model.deleteDataById('user_info', id)
  console.log(delUserModel)
  ctx.body = response.success
}

exports.login = async (ctx) => {
  const {name, password} = ctx.request.query;
  if (!name || !password) {
    ctx.body = response.paramsError
    return
  };
  const sqlUser = `SELECT * FROM user_info WHERE name = '${name}'`;
  const selectUser = await model.query(sqlUser);
  if (selectUser.length && selectUser[0].password === password) {
    ctx.session = {
      name,
      id: selectUser[0].id,
      password
    }
    ctx.body = response.success
  } else {
    ctx.body = {
      data: null,
      errcode: 2,
      errmsg: '用户名或者密码错误'
    };
  }
}

