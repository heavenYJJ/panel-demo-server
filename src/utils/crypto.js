
const crypto = require('crypto');

/**
 * 加密函数
 * @param text  需要加密的内容
 * @param key   秘钥
 * @returns {Query|*}  密文
 */
function encode(text,key){
	var secret = key || "asdhjwheru*asd123&123";
	var cipher = crypto.createCipheriv('aes-256-cbc',secret);
	var crypted =cipher.update(text,'utf8','hex');
	crypted+=cipher.final('hex');
	console.log(crypted);
	return crypted;
}
 
/**
 * 解密函数
 * @param text  需要解密的内容
 * @param key   秘钥
 * @returns {Query|*}
 */
function decode(text,key){
	var secret = key || "asdhjwheru*asd123&123";
	var decipher = crypto.createDecipheriv('aes-256-cbc',secret);
	var dec=decipher.update(text,'hex','utf8');
	dec+= decipher.final('utf8');//解密之后的值
	console.log(dec);
	return dec;
}

module.exports = {
  decode,
  encode
}