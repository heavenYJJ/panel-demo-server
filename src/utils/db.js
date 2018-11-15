/*
 * @Author: yangjiajun@medlinker.com 
 * @Date: 2018-11-09 14:06:19 
 * @Last Modified by: yangjiajun@medlinker.com
 * @Last Modified time: 2018-11-14 17:37:23
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

module.exports = {query};