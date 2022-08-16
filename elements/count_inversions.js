function Count_Inversions(arr) {
    if(arr.length < 2) {
        return [0, arr];
    }
    var mid = Math.floor(arr.length / 2);
    var left = arr.slice(0, mid);
    var right = arr.slice(mid);
    var left_inversions = Count_Inversions(left);
    var right_inversions = Count_Inversions(right);
    var split_inversions = Merge_And_Count_Inversions(left_inversions[1], right_inversions[1]);
    return [left_inversions[0] + right_inversions[0] + split_inversions[0], split_inversions[1]];
}
function Merge_And_Count_Inversions(left, right) {
    var inversions = 0;
    var result = [];
    var index = 0
    while(left.length > 0 && right.length > 0) {
        if ((left[0]) <= (right[0])) {
            result.push(left.shift());
            index++;
        } else {
            inversions += left.length;
            result.push(right.shift());
            index++;
        }
    }
    while(left.length > 0) {
        result.push(left.shift());
    }
    while(right.length > 0) {
        result.push(right.shift());
    }
    return [inversions, result];
}
module.exports = Count_Inversions;