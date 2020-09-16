const { parse } = require("./reverse-polish-notation");

it("无括号", () => {
  expect(parse("1-2-3").join("")).toBe("12-3-");
  expect(parse("1-2+3").join("")).toBe("12-3+");
  expect(parse("1*2/3").join("")).toBe("123/*");
  expect(parse("1-2*3/4").join("")).toBe("1234/*-");
  expect(parse("1-2*3/4+5").join("")).toBe("1234/*-5+");
  expect(parse("1-2*3/4-5").join("")).toBe("1234/*-5-");
  expect(parse("1-2*3/4-5-6").join("")).toBe("1234/*-5-6-");
  expect(parse("1-2*3/4-5-6").join("")).toBe("1234/*-5-6-");
  expect(parse("1*2*3/4-5-6").join("")).toBe("1234/**5-6-");
});

it("单层括号", () => {
  expect(parse("1-(2-3)").join("")).toBe("123--");
  expect(parse("1-(2-3)*4").join("")).toBe("123-4*-");
  expect(parse("1-(2-3)*4/5").join("")).toBe("123-45/*-");
  expect(parse("1-(2-3)*4/5+6").join("")).toBe("123-45/*-6+");
  expect(parse("1-(2-3)+4").join("")).toBe("123--4+");
  expect(parse("1-(2+3*4)").join("")).toBe("1234*+-");
  expect(parse("1-(2/3+4)").join("")).toBe("123/4+-");
  expect(parse("1-(2+3*4)/5").join("")).toBe("1234*+5/-");

  //   expect(parse("1*2/3").join("")).toBe("123/*");
  //   expect(parse("1-2*3/4").join("")).toBe("1234/*-");
  //   expect(parse("1-2*3/4+5").join("")).toBe("1234/*-5+");
  //   expect(parse("1-2*3/4-5").join("")).toBe("1234/*-5-");
  //   expect(parse("1-2*3/4-5-6").join("")).toBe("1234/*-5-6-");
  //   expect(parse("1-2*3/4-5-6").join("")).toBe("1234/*-5-6-");
  //   expect(parse("1*2*3/4-5-6").join("")).toBe("1234/**5-6-");
});

it("括号嵌套", () => {
  expect(parse("1-(2-(3+4))").join("")).toBe("1234+--");
});
