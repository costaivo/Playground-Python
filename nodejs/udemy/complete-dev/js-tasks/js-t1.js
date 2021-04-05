function isPalindrome(str) {
    str = str.toLowerCase();
    if (str === reverseString(str))
        return true;
    else
        return false;
}

/*
    Reverse string function written using custom logic
*/
function reverseStringCustomLogic(str) {
    var reverseStr = "";
    for (var i = str.length - 1; i >= 0; i--) {
        reverseStr = reverseStr + str[i];
    }
    return reverseStr;
}

/*
    Reverse string function written using string & array functions
*/
function reverseStringWithBuildFunctions(str) {
    var splitStr = str.split("");
    var revArray = splitStr.reverse();
    var joinArray = revArray.join("");
    return joinArray;
}

function reverseString(str) {
    return str.split("").reverse().join("");
}


module.exports = isPalindrome;