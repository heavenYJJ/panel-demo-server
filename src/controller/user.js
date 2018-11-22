const model = require('../utils/db')
const types = require('../utils/type')
const response = require('../utils/response')
const validator = require('validator')
const {encrypt, decrypt} = require('../utils/crypto');

exports.getUserList = async (ctx) => {
  const {page, limit} = ctx.query;
  const start = (page - 1) * limit;
  if (!limit || !page) {
    ctx.body = response.paramsError
    return
  }
  const userList = await model.findDataByPage('user_info', '*', Number(start), Number(limit));
  const list = userList.map(item => (
    {
      ...item,
      password: ''
    }
  ));
  const total = await model.count('user_info');
  ctx.body = {
    ...response.success,
    data: {
      list,
      total: total.length ? total[0].total_count : 0
    }
  };
}

exports.addUser = async (ctx) => {
  const {email, password, name, nick, detail_info, level } = ctx.request.body;
  if (!email || !password || !name || !nick || !level ) {
    ctx.body = response.paramsError
    return
  };
  if(!validator.isEmail(email)) {
    ctx.body = {
      data: '',
      errcode: 20009,
      errmsg: '邮箱格式错误'
    }
    return
  }
  const values = {
    email,
    password: encrypt(password),
    name,
    nick,
    detail_info,
    create_time: parseInt(new Date().valueOf()/1000, 10),
    modified_time: parseInt(new Date().valueOf()/1000, 10),
    level,
  }
  const searchUserFromName = await model.findDataByKey('user_info', 'name', name)
  console.log(searchUserFromName);
  if (searchUserFromName.length) {
    ctx.body = {
      data: '',
      errcode: 20010,
      errmsg: '该账号已注册'
    }
    return
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
  if(!validator.isEmail(email)) {
    ctx.body = {
      data: '',
      errcode: 20009,
      errmsg: '邮箱格式错误'
    }
    return
  }
  const values = {
    email,
    password: encrypt(password),
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
  const {name, password} = ctx.request.body;
  if (!name || !password) {
    ctx.body = response.paramsError
    return
  };
  const selectUser = await model.findDataByKey('user_info' ,'name', name);
  console.log('selectUser' ,selectUser);
  console.log('password' ,encrypt(password));
  if (selectUser.length && selectUser[0].password === encrypt(password)) {
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

