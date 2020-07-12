const namingDay = (number: string) => {
  if (number === "1") return " - каждый день";
  if (+number[number.length - 1] === 1 && +number !== 11)
    return `${number} день`;
  if (+number > 9 && +number < 20) return `${number} дней`;
  if (+number[number.length - 1] > 1 && +number[number.length - 1] < 5)
    return `${number} дня`;
  return `${number} дней`;
};

const createDays = () => {
  let array = [];
  for (let i = 1; i <= 30; i++) {
    array!.push({
      key: `${i}`,
      value: i,
      text: namingDay(`${i}`),
    });
  }
  array.unshift({
    key:'-1',
    value:-1,
    text: "- не напоминать"
  })
  return array!;

};

export default {
  name: "NIVEA Creme 75 мл",
  description:
    "NIVEA Creme – универсальный увлажняющий крем. Как это работает? Благодаря уникальной формуле с эвцеритом,пантенолом и глицерином, крем прекрасно увлажняет, питает и бережно ухаживает за кожей тела, особенно за ее сухими участками. NIVEA Creme не содержит консервантов ипоэтому подходит даже для нежной детской кожи.",
  days: createDays(),
  dayTime: [
    {
      key: 0,
      value: 0,
      text: "День и вечер",
    },
    {
      key: 1,
      value: 1,
      text: "День",
    },
    {
      key: 2,
      value: 2,
      text: "Вечер",
    },
  ],
  // todo priority constructor
  priority:[
    {
      key:0,
      value:0,
      text:"0"
    }
  ]
};
