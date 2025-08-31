let day = "tuesday ";
console.log(day.length);
let subDay = day.slice(0, 4);
console.log(subDay);
let charr = subDay[2];
console.log(charr);
let t = day.split("s");
console.log(t);
let fromDate = "27";
let toDate = "25";

let result = fromDate - toDate;
console.log(result.toString());
console.log(t[1].trim());
console.log("--------");
let Day = "toooday";
let Quote = " is friday";
let DayQuote = Day + Quote + day;
console.log(DayQuote);
console.log(DayQuote.indexOf("day", 6));

//count number of day in string
let val = DayQuote.indexOf("day");
let count = 0;

while (val != -1) {
  count++;
  val = DayQuote.indexOf("day", val + 1);
  console.log("val", val);
}
console.log("count ", count);
