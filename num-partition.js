function minimizeArraySumDifference(nums) {
//   nums.sort((a, b) => a - b);

//   const n = nums.length;
//   const midIndex = Math.floor(n / 2);

//   // Split the array into two parts
//   console.log(midIndex)
//   const array1 = nums.slice(0, midIndex);
//   const array2 = nums.slice(midIndex);

//   // Reverse the second array to minimize the sum of differences
//   array2.reverse();
//   console.log(array1, array2)
//   const sum1 = array1.reduce((acc, curr) => acc + curr, 0);
//   const sum2 = array2.reduce((acc, curr) => acc + curr, 0);


return Math.abs(sum1 - sum2);
}

// const nums = [2,-1,0,4,-2,-9];
// const minimumDifference = minimizeArraySumDifference(nums);
// console.log(minimumDifference);
function separateArrayWithLeastSumDifference(nums) {
    const n = nums.length;
    let minDiff = Infinity;
    let result = [];
  
    // Calculate the sum of all elements in the array
    const totalSum = nums.reduce((acc, curr) => acc + curr, 0);
  
    function helper(currIndex, array1, sum1, array2, sum2) {
      if (currIndex === n) {
        const diff = Math.abs(sum1 - sum2);
  
        if (diff < minDiff) {
          minDiff = diff;
          result = [array1.slice(), array2.slice()];
        }
  
        return;
      }
  
      // Add the current element to array1
      helper(currIndex + 1, array1.concat(nums[currIndex]), sum1 + nums[currIndex], array2, sum2);
  
      // Add the current element to array2
      helper(currIndex + 1, array1, sum1, array2.concat(nums[currIndex]), sum2 + nums[currIndex]);
    }
  
    helper(0, [], 0, [], 0);
    return result;
  }
  
  // Example usage:
  const nums = [ -9, -2, -1, 0, 2, 4 ];
  const separatedArrays = separateArrayWithLeastSumDifference(nums);
  console.log(separatedArrays[0]); // Output: [ 2, 4, -9 ]
  console.log(separatedArrays[1]); // Output: [ -1, 0, -2 ]