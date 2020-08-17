// const person = {
//   name: 'Binod',
//   age: 30,
// };

class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greeting() {
    console.log(`Hey ${this.name} ${this.age}`);
  }
}

module.exports = Person;
