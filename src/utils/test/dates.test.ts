import { createArrayObjectDays ,compareDateAfterNDays,isNeededUrlFormatDate, isNotSameMonth,isIdenticalDates } from "../dates";

describe("createArrayObjectDays", () => {
  const input = new Date(2020, 6, 7);
  const output = [
    { date: new Date(2020, 5, 29), number: 29, positionWeak: 1 },
    { date: new Date(2020, 5, 30), number: 30, positionWeak: 2 },
    { date: new Date(2020, 6, 1), number: 1, positionWeak: 3 },
    { date: new Date(2020, 6, 2), number: 2, positionWeak: 4 },
    { date: new Date(2020, 6, 3), number: 3, positionWeak: 5 },
    { date: new Date(2020, 6, 4), number: 4, positionWeak: 6 },
    { date: new Date(2020, 6, 5), number: 5, positionWeak: 7 },
    { date: new Date(2020, 6, 6), number: 6, positionWeak: 1 },
    { date: new Date(2020, 6, 7), number: 7, positionWeak: 2 },
    { date: new Date(2020, 6, 8), number: 8, positionWeak: 3 },
    { date: new Date(2020, 6, 9), number: 9, positionWeak: 4 },
    { date: new Date(2020, 6, 10), number: 10, positionWeak: 5 },
    { date: new Date(2020, 6, 11), number: 11, positionWeak: 6 },
    { date: new Date(2020, 6, 12), number: 12, positionWeak: 7 },
    { date: new Date(2020, 6, 13), number: 13, positionWeak: 1 },
    { date: new Date(2020, 6, 14), number: 14, positionWeak: 2 },
    { date: new Date(2020, 6, 15), number: 15, positionWeak: 3 },
    { date: new Date(2020, 6, 16), number: 16, positionWeak: 4 },
    { date: new Date(2020, 6, 17), number: 17, positionWeak: 5 },
    { date: new Date(2020, 6, 18), number: 18, positionWeak: 6 },
    { date: new Date(2020, 6, 19), number: 19, positionWeak: 7 },
    { date: new Date(2020, 6, 20), number: 20, positionWeak: 1 },
    { date: new Date(2020, 6, 21), number: 21, positionWeak: 2 },
    { date: new Date(2020, 6, 22), number: 22, positionWeak: 3 },
    { date: new Date(2020, 6, 23), number: 23, positionWeak: 4 },
    { date: new Date(2020, 6, 24), number: 24, positionWeak: 5 },
    { date: new Date(2020, 6, 25), number: 25, positionWeak: 6 },
    { date: new Date(2020, 6, 26), number: 26, positionWeak: 7 },
    { date: new Date(2020, 6, 27), number: 27, positionWeak: 1 },
    { date: new Date(2020, 6, 28), number: 28, positionWeak: 2 },
    { date: new Date(2020, 6, 29), number: 29, positionWeak: 3 },
    { date: new Date(2020, 6, 30), number: 30, positionWeak: 4 },
    { date: new Date(2020, 6, 31), number: 31, positionWeak: 5 },
    { date: new Date(2020, 7, 1), number: 1, positionWeak: 6 }, // 31
    { date: new Date(2020, 7, 2), number: 2, positionWeak: 7 },
    { date: new Date(2020, 7, 3), number: 3, positionWeak: 1 },
    { date: new Date(2020, 7, 4), number: 4, positionWeak: 2 },
    { date: new Date(2020, 7, 5), number: 5, positionWeak: 3 },
    { date: new Date(2020, 7, 6), number: 6, positionWeak: 4 },
    { date: new Date(2020, 7, 7), number: 7, positionWeak: 5 },
    { date: new Date(2020, 7, 8), number: 8, positionWeak: 6 },
    { date: new Date(2020, 7, 9), number: 9, positionWeak: 7 },
  ];
  test("should return array object with date", () => {
    expect(createArrayObjectDays(input)).toStrictEqual(output);
  });
  test("should return array haved length == 42", () => {
    expect(createArrayObjectDays(input).length).toBe(42);
  });
});

describe('compareDateAfterNDays',()=>{
  const input = {
    startingPointDate:new Date(2020,7,20),
    endPointDate: new Date(2020,7,22),
    timingDayDelay:2 // day
  }
  test('should return true',()=>{
    expect((compareDateAfterNDays(input.endPointDate,input.startingPointDate,2))).toBe(true);
    expect((compareDateAfterNDays(input.endPointDate,new Date(2020,7,22),2,false))).toBe(true);
  })
  test('should return false',()=>{
    expect((compareDateAfterNDays(input.endPointDate,input.startingPointDate,3))).toBe(false);
    expect((compareDateAfterNDays(input.endPointDate,new Date(2020,7,21),1,false))).toBe(false);
  })
})

describe('isNeededUrlFormatDate',()=>{
  test('should return true',()=>{
    expect(isNeededUrlFormatDate(`22.12.2020`)).toBe(true);
    expect(isNeededUrlFormatDate(`65.44.1922`)).toBe(true);
  })
  test('should return false',()=>{
    expect(isNeededUrlFormatDate(`22.12.200`)).toBe(false);
    expect(isNeededUrlFormatDate(`65.22`)).toBe(false);
    expect(isNeededUrlFormatDate(``)).toBe(false);
    expect(isNeededUrlFormatDate(`0`)).toBe(false);
  })
})

describe('isNotSameMonth',()=>{
  test('should return true',()=>{
    expect(isNotSameMonth(new Date(22,12,1954),new Date(9,11,1944))).toBe(true);
  })
  test('should return false',()=>{
    expect(isNotSameMonth(new Date(22,12,1954),new Date(22,12,1954))).toBe(false);
  });
})

describe('isIdenticalDates',()=>{
  test('should return true',()=>{
    expect(isIdenticalDates(new Date(22,12,1954),new Date(22,12,1954))).toBe(true);
  })
  test('should return false',()=>{
    expect(isIdenticalDates(new Date(22,12,1954),new Date(22,12,1911))).toBe(false);
    expect(isIdenticalDates(new Date(22,12,1954),new Date(9,12,1944))).toBe(false);
  });
})

