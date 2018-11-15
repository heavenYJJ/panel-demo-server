const {query} = require('../src/utils/db');
const {sqlContentArr} = require('./util/walk-file.js');


const creatAllTables = async () => {
  sqlContentArr.forEach(async item => {
    item.sqlContent.split(';').forEach(async (sqlItem, index) => {
      console.log('放在前面的' ,index)
      let result
        try {
          result = await query( sqlItem.trim() )
        } catch(e) {
          // console.log(e)
        }
        console.log(`index是：${index}的${sqlItem.trim()}sql语句` ,result);
    })
  })
}

creatAllTables();