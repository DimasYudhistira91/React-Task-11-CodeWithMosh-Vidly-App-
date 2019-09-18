const person = {
  name: 'Dimas',
  walk() {
    console.log(this.name);
  }
};

console.log(this.walk);

person.walk();