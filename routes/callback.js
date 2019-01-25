var callback = require('callback');

Normal
console.log("user1 requested");
console.log("database takes 5s");
console.log("data delivered");

console.log("user2 requested");
console.log("database takes 5s");
console.log("data delivered");

console.log("user3 requested");
console.log("database takes 5s");
console.log("data delivered");

<br></br>
console.log("user1 requested");
setTimeout(callback, 5000);

console.log("user2 requested");
setTimeout(callback, 5000);

console.log("user3 requested");
setTimeout(callback, 5000);

function callback() {
    console.log("database takes 5s to deliever data")
}