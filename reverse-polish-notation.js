const RegExp = /^(\d+|\(|\)|\+|\-|\*|\/)/;

function pop(count) {
  const stack = this;
  const arr = [];
  for (let i = 0; i < count; i += 1) {
    arr.push(stack.pop());
  }
  return arr;
}

/**
 * 将中缀表达式转换成后缀表达式
 *
 * 后缀表达式在计算的时候，是从左到右从栈中取出再压入另一个栈计算，所以
 * 值的权重应该有小到大，操作符的权重应该由大到小
 *
 * @param {string} template
 */
// TODO: trim  剔除模板中的空格换行等
function parse(template) {
  // 操作符栈
  const operatorStack = [];
  // 数值栈
  const digitStack = [];
  // 每个括号就是一个单独的作用域，需要存储自己的状态
  const scopeStack = [
    {
      hasMinusSign: false,
      stackPriority: 0,
      index: 0,
    },
  ];

  const resetStack = () => {
    const scope = scopeStack[scopeStack.length - 1];
    const operators = pop.call(
      operatorStack,
      operatorStack.length - scope.index
    );

    digitStack.push(...operators);

    scope.hasMinusSign = false;
  };

  let sub = template;

  while (sub) {
    const matches = sub.match(RegExp);

    if (!matches) {
      throw Error(`无效模板，包含了违法字符串`)``;
    }

    const match = matches[0];
    const scope = scopeStack[scopeStack.length - 1];

    switch (match) {
      case "+": {
        // 核心就在于当当前的操作符权重小于操作符栈的权重时，将操作符
        // 栈中的数据取出，压入digitStack
        if (scope.stackPriority > 0 || scope.hasMinusSign) {
          resetStack();
        }
        scope.stackPriority = 0;
        operatorStack.push("+");
        break;
      }
      case "-": {
        if (scope.stackPriority > 1 || scope.hasMinusSign) {
          resetStack();
        }
        scope.hasMinusSign = true;
        scope.stackPriority = 1;
        operatorStack.push("-");
        break;
      }
      case "*": {
        scope.stackPriority = 2;
        operatorStack.push("*");
        break;
      }
      case "/": {
        scope.stackPriority = 2;
        operatorStack.push("/");
        break;
      }
      case "(": {
        scopeStack.push({
          index: operatorStack.length,
          stackPriority: 0,
          hasMinusSign: false,
        });
        break;
      }
      case ")": {
        resetStack();
        scopeStack.pop();
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

  if (scopeStack.length > 1) {
    throw Error("存在未闭合的(，计算模板不合法");
  }

  return digitStack;
}

/**
 * 执行后缀表达式
 */
function exec() {}

module.exports = {
  parse,
  exec,
};
