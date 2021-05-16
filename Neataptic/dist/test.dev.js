"use strict";

// function getRandom(){
//   var num=Math.random();
//   if(num < 0.25) return 0;  //probability 0.3
//   else return 1;  //probability 0.1
// }
function arrayAlreadyHasArray(arr, subarr) {
  for (var i = 0; i < arr.length; i++) {
    var checker = false;

    for (var j = 0; j < arr[i].length; j++) {
      if (arr[i][j] === subarr[j]) {
        checker = true;
      } else {
        checker = false;
        break;
      }
    }

    if (checker) {
      return true;
    }
  }

  return false;
} // var all_array = [];
// for (let j = 0; j < 50; j++) {
//   var lay1 = 0
//   var lay2 = 0
//   var array = [];
//   console.clear()
//   for (let t = 0; t < j*(100/50); t++) {
//     process.stdout.write("%")
//   }
//   //generate 1 instance 
//   for (let i = 0; i < 74; i++) {
//     var num = getRandom();
//     if (num == 1 && i <= 60) {
//       lay1++;
//     }else if(num == 1 && i > 60){
//       lay2++;
//     }
//     array.push(num);
//   }
//   if (lay1 > 0 && lay2 > 0){
//     if (!arrayAlreadyHasArray(all_array,array)){
//       all_array.push(array)
//     }
//   }
// }


var a = [[1, 3], [1, 2]];
var b = [1, 5];
console.log(arrayAlreadyHasArray(a, b));