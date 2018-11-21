const {encode, decode} = require('./crypto');

console.log(encode('yjj'))
console.log(decode(encode('yjj')))