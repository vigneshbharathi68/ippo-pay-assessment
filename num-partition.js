const arr = [3, 9, 7, 3];

function separateArrleastDiff(arr) {
  arr.sort((a, b) => a - b);
  let meanVal = arr.reduce((a, b) => a + b) / arr.length;
  let arrCopy = [...arr];
  let splitArr1 = [];
  for (let i = 1; i <= arr.length / 2; i++) {
    let meanForSpecificEl = meanVal * i;
    let sumOfArr = splitArr1.length > 0 ? splitArr1.reduce((a, b) => a + b) : 0;
    let lookUpVal = meanForSpecificEl - sumOfArr;
    let nearestMeanEl = arrCopy.reduce((a, b) => {
      return Math.abs(b - lookUpVal) < Math.abs(a - lookUpVal) ? b : a;
    });
    arrCopy.splice(arrCopy.indexOf(nearestMeanEl), 1);
    splitArr1.push(nearestMeanEl);
  }
  let arr1Sum = splitArr1.reduce((a,b) => a + b)
  let arr2Sum = arrCopy.reduce((a,b) => a +b);
  if (arr1Sum > arr2Sum) {
      return  arr1Sum - arr2Sum
  } else {
    return arr2Sum - arr1Sum
  }
}
console.log("Test Case 1 ---------")
console.log("input:", [3,9,7,3])
console.log("The absolute difference between the sums of the arrays is ", separateArrleastDiff([3,9,7,3]))

console.log("Test Case 2 ---------")
console.log("input:", [-36,36])
console.log("The absolute difference between the sums of the arrays is ", separateArrleastDiff([-36,36]))

console.log("Test Case 3 ---------")
console.log("input:", [2,-1,0,4,-2,-9])
console.log("The absolute difference between the sums of the arrays is ", separateArrleastDiff([2,-1,0,4,-2,-9]))
