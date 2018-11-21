/*
 * @Author: yangjiajun@medlinker.com 
 * @Date: 2018-11-09 14:06:19 
 * @Last Modified by: yangjiajun@medlinker.com
 * @Last Modified time: 2018-11-21 17:12:45
 */

const mysql = require('mysql');
const config = require('../../config');

const pool = mysql.createPool({
  host: config.database.HOST,
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE
});

let query = function(sql, values) {
  console.log(sql);
  return new Promise((resolve, reject) => {
    pool.getConnection(function(err, connertion) {
      connertion.query(sql, values, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
        connertion.release();
      })
    })
  })
}

let createTable = function( sql ) {
  return query( sql, [] )
}


let findDataById = function( table,  id, start, end ) {
  let  _sql =  "SELECT * FROM ?? WHERE id = ? "
  return query( _sql, [ table, id, start, end ] )
}

let findDataByKey = function( table, key, val ) {
  let  _sql =  `SELECT * FROM ${table} WHERE ${key} = '${val}'`
  return query( _sql, [ table, key, val ])
}


let findDataByPage = function( table, keys, start, end ) {
  let  _sql =  "SELECT ?? FROM ??  LIMIT ? , ?"
  return query( _sql, [keys,  table,  start, end ] )
}


let insertData = function( table, values ) {
  let _sql = "INSERT INTO ?? SET ?"
  return query( _sql, [ table, values ] )
}


let updateData = function( table, values, id ) {
  let _sql = "UPDATE ?? SET ? WHERE id = ?"
  return query( _sql, [ table, values, id ] )
}


let deleteDataById = function( table, id ) {
  let _sql = "DELETE FROM ?? WHERE id = ?"
  return query( _sql, [ table, id ] )
}


let select = function( table, keys ) {
  let  _sql =  "SELECT ?? FROM ?? "
  return query( _sql, [ keys, table ] )
}

let count = function( table ) {
  let  _sql =  "SELECT COUNT(*) AS total_count FROM ?? "
  return query( _sql, [ table ] )
}

module.exports = {
  query,
  createTable,
  findDataById,
  findDataByPage,
  deleteDataById,
  insertData,
  updateData,
  select,
  count,
  findDataByKey,
}