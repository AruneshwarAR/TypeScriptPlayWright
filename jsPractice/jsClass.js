class Person {
  age = 25;

  getAge() {
    return this.age;
  }
  setAge(age) {
    this.age = age;
  }
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
  fullName() {
    console.log(this.firstName + " " + this.lastName);
  }
}

appu = new Person("Aruneshwar", "AR");
console.log(appu);
console.log(appu.getAge());
console.log(appu.fullName());
appu.fullName();
