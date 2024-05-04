function convertToPostfix() {
  var infixExpression = document.getElementById("infixInput").value;
  var postfixExpression = infixToPostfix(infixExpression);
  document.getElementById("result").innerText =
    "Postfix Expression: " + postfixExpression;
}

function infixToPostfix(infix) {
  var precedence = {
    "+": 1,
    "-": 1,
    "*": 2,
    "/": 2,
  };
  var output = "";
  var stack = [];

  for (var i = 0; i < infix.length; i++) {
    var token = infix[i];

    if (isOperand(token)) {
      output += token;
    } else if (token === "(") {
      stack.push(token);
    } else if (token === ")") {
      while (stack.length > 0 && stack[stack.length - 1] !== "(") {
        output += stack.pop();
      }
      stack.pop(); // Pop the '('
    } else {
      // Operator
      while (
        stack.length > 0 &&
        precedence[token] <= precedence[stack[stack.length - 1]]
      ) {
        output += stack.pop();
      }
      stack.push(token);
    }
  }

  while (stack.length > 0) {
    output += stack.pop();
  }

  return output;
}

function isOperand(token) {
  return /^[a-zA-Z0-9]+$/.test(token);
}
