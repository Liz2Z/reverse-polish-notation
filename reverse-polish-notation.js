const RegExp = /^(\d+|\(|\)|\+|\-|\*|\/)/;

// TODO: trim  剔除模板中的空格换行等
module.exports = function parse(template) {
  let sub = template;
  // 操作符栈
  const operatorStack = [];
  // 数值栈
  const digitStack = [];
  // 操作符栈中存在负号
  let hasMinusSign = false;
  // 操作符栈的权重
  let stackPriority = 0;

  const resetStack = () => {
    operatorStack.reverse();
    digitStack.push(...operatorStack);
    operatorStack.length = 0;
    hasMinusSign = false;
  };

  while (sub) {
    const matches = sub.match(RegExp);

    if (!matches) {
      throw Error(`无效模板，包含了违法的字符串`);
    }

    const match = matches[0];

    switch (match) {
      case "+": {
        if (stackPriority > 0 || hasMinusSign) {
          resetStack();
        }
        stackPriority = 0;
        operatorStack.push("+");
        break;
      }
      case "-": {
        if (stackPriority > 1 || hasMinusSign) {
          resetStack();
        }
        hasMinusSign = true;
        stackPriority = 1;
        operatorStack.push("-");
        break;
      }
      case "*": {
        stackPriority = 2;
        operatorStack.push("*");
        break;
      }
      case "/": {
        stackPriority = 2;
        operatorStack.push("/");
        break;
      }
      case "(": {
        isInMid = true;
        break;
      }
      case ")": {
        isInMid = false;
        break;
      }
      default: {
        // 数值
        digitStack.push(match);
        break;
      }
    }

    sub = sub.slice(match.length);
  }

  resetStack();

  return digitStack;
};
