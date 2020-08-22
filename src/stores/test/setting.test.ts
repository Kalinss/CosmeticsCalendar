import { filterExcludingName, toggleValueFieldByKey } from "../Setting";

describe("filterExcludingName", () => {
  const mockInput = [
    {
      name: "aaaa",
      key: "calendar",
      value: true,
      sort: 1,
    },
    {
      name: "bbbb",
      key: "calendar",
      value: true,
      sort: 1,
    },
  ];
  const mockOutput = [
    {
      name: "bbbb",
      key: "calendar",
      value: true,
      sort: 1,
    },
  ];

  test("should return true", () => {
    expect(filterExcludingName(mockInput, "aaaa")).toStrictEqual(mockOutput);
  });
});

describe("toggleValueFieldByKey", () => {
  const input = [
    {
      name: "Показывать календарь на главной странице",
      key: "calendar",
      value: false,
      sort: 1,
    },
    {
      name: "Показывать виджет плана ухода на день на главной странице",
      key: "todoListWidget",
      value: true,
      sort: 2,
    },
  ];
  const otput = [
    {
      name: "Показывать календарь на главной странице",
      key: "calendar",
      value: true,
      sort: 1,
    },
    {
      name: "Показывать виджет плана ухода на день на главной странице",
      key: "todoListWidget",
      value: true,
      sort: 2,
    },
  ];
  test("should return changed value field", () => {
    expect(toggleValueFieldByKey(input, "calendar")).toStrictEqual(otput);
  });
});
