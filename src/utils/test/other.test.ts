import { chunk,toExpandedCosmeticItemType,matchAmountProperty,toPrimitiveCosmeticItemType } from "../../utils/other";

describe("matchAmountProperty", () => {
  const input1 = [
    {
      name: 1,
    },
    {
      name: 2,
    },
    {
      name: 3,
      asd: 444,
    },
  ];
  const input2 = [
    {
      name: 2,
    },
    {
      name: 3,
      asd: 444,
    },
  ];

  const output = [];

  test("should return equal amount", () => {
    expect(matchAmountProperty(input1, input1, "name")).toBe(3);
    expect(matchAmountProperty(input1, input2, "name")).toBe(2);
  });
  test("should return 0", () => {
    expect(matchAmountProperty(input1, [], "name")).toBe(0);
  });
});

describe("chunk", () => {
  const input1 = [0, 123, 12, 31, 254, 124, 12, 41, 24, 123];
  const input2 = [1, 123, 12, 31, 254, 124, 12, 41, 24];
  const output1 = [
    [0, 123],
    [12, 31],
    [254, 124],
    [12, 41],
    [24, 123],
  ];
  const output2 = [[1, 123], [12, 31], [254, 124], [12, 41], [24]];
  test("should get needed array", () => {
    expect(chunk(input1, 2)).toStrictEqual(output1);
    expect(chunk(input2, 2)).toStrictEqual(output2);
    expect(chunk([], 2)).toStrictEqual([]);
    expect(chunk(input1, 0)).toStrictEqual([]);
  });
});

describe('type cosmetic conversion',()=>{
  const expandedType = {
    name: "asd",
    description: "asd",
    timingDelay: {
      value: 123,
      text: "asd",
    },
    dayOrEvening: {
      value: 123,
      text: "412",
    },
    type: {
      value: 123,
      text: "123",
    },
    date: new Date(1, 1, 1999),
  };
  const primitiveType = {
    name: { value: 'asd', error: '', text: '' },
    description: { value: 'asd', error: '', text: '' },
    timingDelay: { value: 123, error: '', text: 'asd' },
    dayOrEvening: { value: 123, error: '', text: '412' },
    type: { value: 123, error: '', text: '123' },
    date: { value: new Date(1, 1, 1999), error: '', text: '' }
  }
  describe("toExpandedCosmeticItemType", () => {
    test("return needed object", () => {
      expect(toExpandedCosmeticItemType(expandedType)).toStrictEqual(primitiveType);
    });
  });

  //toPrimitiveCosmeticItemType
  describe("toPrimitiveCosmeticItemType", () => {
    test("return needed object", () => {
      expect(toPrimitiveCosmeticItemType(primitiveType)).toStrictEqual(expandedType);
    });
  });
})

