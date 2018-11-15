const {query} = require('../src/utils/db');
const {sqlContentArr} = require('./util/walk-file.js');


const creatAllTables = async () => {
  for(let item of sqlContentArr) {
    for(let sqlItem of item.sqlContent.split(';')) {
      if (sqlItem) {
        let result
        try {
          result = await query( sqlItem.trim() )
        } catch(e) {
          console.log(e)
        }
      }
    }
  }
}

creatAllTables();