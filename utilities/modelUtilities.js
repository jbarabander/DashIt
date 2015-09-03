function limitText(str, num) {
  if(typeof str !== 'string') throw new TypeError();
  if(str.length > num) return false;
  return true;
}

function shortenText(str, num) {
  if(typeof str !== 'string') throw new TypeError();
  if(str.length > num) return str.slice(0, num - 3) + '...';
  return str;
}


module.exports = {
  limitText: limitText,
  shortenText: shortenText
};
