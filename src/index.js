function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {

    if (!checkBrackets(expr)) {

        throw ("ExpressionError: Brackets must be paired");
    }

    let arr = StringToArray(expr)
    let result = null;
do{
    let firstBracket = -1;
    let lastBracket = -1;

    for (let i = 0; i < arr.length; i++) {

        if (arr[i] == '(') {
            firstBracket = i;
        }
        if (arr[i] == ')') {
            lastBracket = i;
            break;
        }

    }
   
    if(firstBracket == -1){
        result = solveOperatorPriority(arr);
        break;
    } else {
       arr.splice(firstBracket,lastBracket - firstBracket + 1, solveOperatorPriority(arr.slice(firstBracket + 1, lastBracket)));
    }
}while(true);
    return result;


}

module.exports = {
    expressionCalculator
}

function checkBrackets(string) {

    let str = (string.match(/[()]/g) || []).join('');
    let foundIT = true;
    for (; foundIT;) {

        let pos = str.indexOf('()');
        if (pos > -1) {
            str = str.slice(0, pos) + str.slice(pos + 2);

        } else {
            foundIT = false;
        }

    }

    return str.length > 0 ? false : true;
}

function StringToArray(string) {

    let str = string.replace(/ /g, '');
    let count = '';
    let arr = [];
    let flag = false;
    for (let i = 0; i < str.length; i++) {

        if (str[i] == 0 || str[i] == 1 || str[i] == 2 || str[i] == 3 || str[i] == 4 || str[i] == 5 || str[i] == 6 || str[i] == 7 || str[i] == 8 || str[i] == 9) {
            count += str[i];
            flag = true;
            continue;
        }
        if (flag) {
            arr.push(+count);
            count = '';
            flag = false;
        }
        arr.push(str[i]);

    }
    if (flag) {
        arr.push(+count);
        count = '';
        flag = false;
    }
    return arr;
}

function plus(a, b) {

    return a + b;
}


function minus(a, b) {

    return a - b;
}

function multiply(a, b) {

    return a * b;
}

function division(a, b) {
    if (b == 0) {
        throw ("TypeError: Division by zero.");
    }
    return a / b;

}
function pasteOperationResult(array, number, index) {

    array.splice(index - 1, 3, number);

    return array;
}

function solveOperatorPriority(arr) {

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == "*" || arr[i] == "/") {
            let OperationResult = 0;
            if (arr[i] == "*") {
                OperationResult = multiply(arr[i - 1], arr[i + 1]);
            }

            if (arr[i] == "/") {

                OperationResult = division(arr[i - 1], arr[i + 1]);
            }
            pasteOperationResult(arr, OperationResult, i);
            i--;

        }
    }
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == "+" || arr[i] == "-") {
            let OperationResult = 0;
            if (arr[i] == "+") {
                OperationResult = plus(arr[i - 1], arr[i + 1]);
            }
            if (arr[i] == "-") {
                OperationResult = minus(arr[i - 1], arr[i + 1]);
            }
            pasteOperationResult(arr, OperationResult, i);
            i--;
        }
    }
    return arr[0];
}