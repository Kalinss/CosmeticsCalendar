import { comparePrimitive } from "../other";
import { matchAmountProperty } from "../other";

describe("comparePrimitive", () => {
  test("should return true", () => {
    expect(comparePrimitive(1, 1)).toBe(true);
    expect(comparePrimitive(true, true)).toBe(true);
    expect(comparePrimitive("src", "src")).toBe(true);
  });
  test("should return false", () => {
    expect(comparePrimitive(1, 0)).toBe(false);
    expect(comparePrimitive(1, true)).toBe(false);
    expect(comparePrimitive("wqeqw", "src")).toBe(false);
  });
});

describe("matchAmountProperty", () => {
  const input1 = [
    {
      name: 1,
    },
    {
      name: 2,
    },
    {
      name:3,
      asd:444
    }
  ];
  const input2 = [
    {
      name: 2,
    },
    {
      name:3,
      asd:444
    }
  ];

  const output = [];

  test("should return equal amount", () => {
    expect(matchAmountProperty(input1,input1,'name')).toBe(3);
    expect(matchAmountProperty(input1,input2,'name')).toBe(2)
  });
  test("should return 0", () => {
    expect(matchAmountProperty(input1,[],'name')).toBe(0);
  });

});
