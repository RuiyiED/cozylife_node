// src/person_test.js
const { Person, f } = require('./person'); // 引入模組，不需要打副檔名  // 解構 名字要相同
const p1 = new Person('Bill', 56);
const p2 = new Person;
console.log(p1.toJSON());
console.log(p2.toJSON());