/*
 * @Author: yangjiajun@medlinker.com 
 * @Date: 2018-11-09 15:14:00 
 * @Last Modified by: yangjiajun@medlinker.com
 * @Last Modified time: 2018-11-14 17:28:07
 * 遍历sql脚本文件
 */
const fs = require('fs');
const path = require('path');

let sqlContentArr = [];

function getSqlPathList() {
  const fileList = fs.readdirSync(path.resolve(__dirname, '../sql'));
  sqlContentArr = fileList.map(item => {
    const sqlName = item.substring(0, item.length - 4);
    const sqlPath = path.resolve(__dirname, '../', './sql', item);
    const sqlContent = fs.readFileSync(sqlPath, 'binary');
    return {
      sqlName,
      sqlPath,
      sqlContent
    }
  });
}

getSqlPathList()

module.exports = {
  sqlContentArr
}
