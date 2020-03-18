class Person {
    constructor(name='noname', age=20) {
        this.name = name;
        this.age = age;
    }
    toJSON() {
        const obj = {
            name: this.name,
            age: this.age
        };
        return JSON.stringify(obj);
    }
}

let f = a => a * a;

module.exports = { Person,f }; // node 匯出類別 可以匯出物件一次多個
   
// module.exports = {   //  解構和上面相等 
//     Person: Person,
//     f: f
// };