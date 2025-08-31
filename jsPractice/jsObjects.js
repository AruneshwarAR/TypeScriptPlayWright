let person = {
  firstName: "Aruneshwar",
  lastName: "AR",
};

console.log(person.firstName);
console.log(person["lastName"]);

person.gender = "male";
console.log(person);
person.age = "25";
console.log(person);
person.age = 25;
console.log(person);
delete person.age;
console.log(person);
