const display = document.getElementById("display");
const numbers = document.querySelectorAll(".numbers>div");
const operators = document.querySelectorAll(".operators>div");
const clear = document.getElementById("clear");
const equal = document.getElementById("equal");

let firstNumberSelected;
let secondNumberSelected;
let operatorSelected;
let equalsClicked = false;
let operatorClicked = false;

display.textContent = 0;

// operations logic
function operate(firstNum, secondNum, operator) {
  const operations = {
    sum: (firstNum, secondNum) =>
      Math.round((firstNum + secondNum) * 1000) / 1000,
    subtract: (firstNum, secondNum) =>
      Math.round((firstNum - secondNum) * 1000) / 1000,
    multiply: (firstNum, secondNum) =>
      Math.round(firstNum * secondNum * 1000) / 1000,
    divide: (firstNum, secondNum) =>
      Math.round((firstNum / secondNum) * 1000) / 1000,
  };

  if (operations[operator]) {
    if (typeof firstNum === "string" || typeof secondNum === "string") {
      return "You messed up somewhere. Start again.";
    } else if (operator === "divide" && secondNum === 0) {
      return "Come on, you cannot divide by 0";
    } else {
      const func = operations[operator];
      return func(firstNum, secondNum);
    }
  } else {
    return "Invalid operation";
  }
}

// user interractions with the calculator
numbers.forEach((number) => {
  number.addEventListener("click", () => {
    if (display.textContent === "0" || equalsClicked) {
      equalsClicked = false;
      display.textContent = number.textContent;
    } else {
      display.textContent += number.textContent;
    }
  });
});

operators.forEach((operator) => {
  operator.addEventListener("click", () => {
    if (operatorClicked) {
      secondNumberSelected = Number(display.textContent);
      firstNumberSelected = operate(
        firstNumberSelected,
        secondNumberSelected,
        operatorSelected
      );
    } else {
      firstNumberSelected = Number(display.textContent);
    }
    operatorSelected = operator.id;
    operatorClicked = true;
    display.textContent = "";
  });
});

clear.addEventListener("click", () => {
  display.textContent = 0;
  operatorClicked = false;
});

equal.addEventListener("click", () => {
  secondNumberSelected = Number(display.textContent);

  const result = operate(
    firstNumberSelected,
    secondNumberSelected,
    operatorSelected
  );
  display.textContent = result;
  equalsClicked = true;
  operatorClicked = false;
});
