const {sum} = require('./index')

if (sum(2,3) != 5){
  throw Error("Test Failed!!")
}

console.log("Success")