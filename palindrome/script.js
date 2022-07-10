function checkPalindrom(str) {
  if (str === str.split("").reverse().join("")) {
    str = `Le mot ${str} est un palindrome`;
  } else {
    str = `Le mot ${str} n'est pas un palindrome`;
  }
  return str;
}
console.log(checkPalindrom("kayak"));
Ï