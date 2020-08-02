export interface IiteratorField {
  key: number;
  value: number;
  text: string;
}
export type IDataFieldsEnum = string | IiteratorField[];
export interface IdataFields {
  name: string;
  description: string;
  days: IiteratorField[];
  dayTime: IiteratorField[];
  priority: IiteratorField[];
}

const namingDay = (number: string) => {
  if (number === "1") return " — каждый день";
  if (+number[number.length - 1] === 1 && +number !== 11)
    return `${number} день`;
  if (+number > 9 && +number < 20) return `${number} дней`;
  if (+number[number.length - 1] > 1 && +number[number.length - 1] < 5)
    return `${number} дня`;
  return `${number} дней`;
};

const createDays = (): IiteratorField[] => {
  let array = [];
  for (let i = 1; i <= 30; i++) {
    array!.push({
      key: i,
      value: i,
      text: namingDay(`${i}`),
    });
  }
  array.unshift({
    key: -1,
    value: -1,
    text: "— не повторять",
  });
  return array!;
};

export const findTextInIteratorField = (
  filed: IiteratorField[],
  text: string
) => filed.find((obj) => obj.text === text);

export type dataItemType = {
  key: number;
  value: number;
  text: string;
};

export const dataFields: IdataFields = {
  name: "NIVEA Creme 75 мл",
  description:
    "Как это работает?",
  days: createDays(),
  dayTime: [
    {
      key: 1,
      value: 1,
      text: "Утро и вечер",
    },
    {
      key: 2,
      value: 2,
      text: "Утро",
    },
    {
      key: 3,
      value: 3,
      text: "Вечер",
    },
  ],
  priority: [
    {
      key: 1,
      value: 10,
      text: "Средство для снятия макияжа",
    },
    {
      key: 2,
      value: 20,
      text: "Средство для умывания",
    },
    {
      key: 3,
      value: 30,
      text: "Тоник / Тонер / Лосьон ",
    },
    {
      key: 4,
      value: 40,
      text: "Эксфолиант",
    },
    {
      key:5,
      value:50,
      text:'Маска'
    },
    {
      key:6,
      value:60,
      text:'Сыворотка'
    },
    {
      key: 7,
      value: 70,
      text: "Крем",
    },
    {
      key: 8,
      value: 80,
      text: "Защита от солнца",
    },
    {
      key: 9,
      value: 99999,
      text: "Другое",
    },

  ],
};
