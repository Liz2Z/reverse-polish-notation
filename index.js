// 1 - 2 * (3+4) /5

const RegExp = /^(\d+|\(|\)|\+|\-|\*|\/)/;

function x(template) {
  let sub = template;
  const symbolStack = [];
  const numberStack = [];

  let isInMid = false;

  while (sub) {
    const matches = sub.match(RegExp);
    if (!matches) {
      throw Error("");
    }
    const match = matches[0];

    switch (match) {
      case "+": {
      }
      case "-": {
      }
      case "*": {
      }
      case "/": {
      }
      case "(": {
        isInMid = true;
      }
      case ")": {
      }
      // number
      default: {
        numberStack.push(Number(match));
      }
    }
  }
}
