module.exports = class Vehicle {
  constructor(Brand, Model) {
    this.Brand = Brand;
    this.Model = Model;
  }
  getDetails() {
    console.log(this.Brand + "'s " + this.Model);
  }
};
