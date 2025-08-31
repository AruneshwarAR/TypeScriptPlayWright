let person = {
  firstName: "Aruneshwar",
  lastName: "AR",
  qualification: "BE.EEE",
  fullName: function () {
    return this.firstName + " " + this.lastName;
  },
};

console.log(person.firstName);
console.log(person["lastName"]);

person.gender = "male";
console.log(person);
person.age = "25";
console.log(person);
person.age = 25;
console.log(person);
console.log("age" in person);
delete person.age;
console.log("age" in person);
console.log(person);

for (let key in person) {
  try {
    console.log(person[key]());
  } catch {
    console.log("*********");
    console.log(person[key]);
    console.log("*********");
  }
}
