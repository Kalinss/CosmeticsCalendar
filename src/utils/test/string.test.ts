import { getLastStringLocationPath, getUpperFirstCharString } from "../string";

describe("getUpperFirstCharString", () => {
  test("should return new string with first upper char", () => {
    expect(getUpperFirstCharString("asd")).toStrictEqual("Asd");
  });
  test("should return empty string", () => {
    expect(getUpperFirstCharString("")).toStrictEqual("");
  });
});

describe("getLastStringLocationPath", () => {
  test("should return last path domain", () => {
    expect(getLastStringLocationPath("htttp://qasd.ru/asd/dsa")).toStrictEqual(
      "dsa"
    );
  });
  test("should return empty string", () => {
    expect(getLastStringLocationPath("")).toStrictEqual("");
  });
});
