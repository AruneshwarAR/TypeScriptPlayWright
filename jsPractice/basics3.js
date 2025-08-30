let marks = [100, 70, 68, 51, 90, 80];

let total = marks.reduce((sum, mark) => sum + mark, 0);

console.log(total);

let scores = [10, 11, 12, 13, 14, 15, 16];
//print only the even numbers

//let evenNums = scores.reduce((check, score) => if(!score % check){return score}, 2); //tried using reduce but it will not work
let evenNums = [];
for (let j = 0; j < scores.length; j++) {
  if (!(scores[j] % 2)) evenNums.push(scores[j]);
}
let evenNums2 = scores.filter((score) => score % 2 == 0);
console.log(evenNums);
console.log("****");
console.log(evenNums2);

let sNew = [11, 12, 13, 14, 15, 1234, 24, 3432, 154456, 7, 63, 445, 44, 5, 7];

//reduce
console.log("****");

let sReduce = sNew.reduce((accu, s) => accu + s, 0);
console.log("reduce by sum ", sReduce);
console.log("****");
console.log("reduce by sum " + sReduce);

let sfilter = sNew.filter((s) => s % 2 != 0);
console.log("odd number ", sfilter);
console.log("****");
console.log("odd number " + sfilter);
console.log("------");
let sMap = sfilter.map((s) => s * 5);
console.log("map multiply by 5", sMap);
