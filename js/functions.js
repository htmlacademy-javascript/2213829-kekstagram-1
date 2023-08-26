function checkPalindrom(str) {
  str = str.toLowerCase();
  return str == str.split("").reverse().join("");
}

if (checkPalindrom("Racecar")) {
  return true;
} else {
  return false;
}
