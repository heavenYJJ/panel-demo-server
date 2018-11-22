const crypto = require('crypto');
const algorithm='aes192';
const defaultKey = 'qwertyuiopasdfghjklzxcvb';
const defaultIv = 'qwertyuiopasdfgh';

function encrypt(text, key=defaultKey, iv=defaultIv) {
	const cipher = crypto.createCipheriv(algorithm, key, iv);
	cipher.update(text);
	return cipher.final('hex');
}

function decrypt(text, key=defaultKey, iv=defaultIv) {
	const decipher = crypto.createDecipheriv(algorithm, key, iv);
	decipher.update(text, 'hex');
	return decipher.final('utf8');
}

module.exports = {
	encrypt,
	decrypt
}