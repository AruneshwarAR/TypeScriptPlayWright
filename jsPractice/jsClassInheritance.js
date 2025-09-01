const Person = require("./jsClass.js");
const Vehicle = require("./jsVehicle.js");
class Pet extends Person {
  constructor(firstName, lastName) {
    super(firstName, lastName);
  }
}

let dog = new Pet("german", "sheperd");
dog.fullName();

class Car extends Vehicle {
  constructor(Brand, Model) {
    super(Brand, Model);
  }
  getDetails() {
    console.log("car's Brand is " + this.Brand + " Model is " + this.Model);
  }
}

let appuCar = new Car("Tata", "Curvv");
appuCar.getDetails();
