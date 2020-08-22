import React, { FunctionComponent, useMemo, useState } from "react";
import style from "./style.scss";
import { createArrayObjectDays } from "../../../utils/dates";
import { getUpperFirstCharString } from "../../../utils/string";
import {
  ButtonCalendar,
  CalendarTableHead,
  GenerateTableCalendar,
} from "../../molecules/index";
import moment from "moment";
import "moment/locale/ru";
import { IMainStore } from "stores";
import { chunk } from "../../../utils/other";

//animation constants
const HEIGHT_CALENDAR = 271;
const TRANSITION_SLIDER_DELAY = 0.3;

export const Calendar: FunctionComponent<IMainStore> = ({ stores }) => {
  const [actuallyDate, setActuallyDate] = useState(new Date());
  const [yPosition, setYPosition] = useState(-HEIGHT_CALENDAR);
  const [isTransition, setTransition] = useState(true);
  const [isDisabledButton, setDisabledButton] = useState(false);

  const prevMonth = moment(actuallyDate).subtract(1, "M").toDate();
  const nextMonth = moment(actuallyDate).add(1, "M").toDate();

  const chunkedDateArray = useMemo(
    () => chunk(createArrayObjectDays(actuallyDate), 7),
    [actuallyDate]
  );
  const actuallyDateMonthName = getUpperFirstCharString(
    moment(actuallyDate).locale("ru").format("MMMM")
  );

  const itemsCosmetic = stores!.ItemsCosmetic.items;
  const setting = stores!.Setting.config;

  // animation functions
  const reset = () => {
    setTimeout(() => {
      setTransition(false);
      setYPosition(-HEIGHT_CALENDAR);
      setTimeout(() => {
        setTransition(true);
        setDisabledButton(false);
      }, 100);
    }, TRANSITION_SLIDER_DELAY * 1000);
  };

  const next = () => {
    setDisabledButton(true);
    setYPosition(yPosition - HEIGHT_CALENDAR);
    setActuallyDate(nextMonth);
    reset();
  };

  const prev = () => {
    setDisabledButton(true);
    setYPosition(yPosition + HEIGHT_CALENDAR);
    setActuallyDate(prevMonth);
    reset();
  };
  // style for animation
  const styleSlider = {
    transform: `translateY(${yPosition}px)`,
    transition: isTransition ? `${TRANSITION_SLIDER_DELAY}s ease` : "",
  };

  return (
    <div className={style.calendar}>
      <div className={style.heading}>
        <div className={style.left}>
          <p>
            <span>{actuallyDateMonthName}</span>
            &nbsp;
            <span>{moment(actuallyDate).format("YYYY")}</span>
          </p>
        </div>

        <div className={style.right}>
          <ButtonCalendar clickHandler={prev} disabled={isDisabledButton} />
          <ButtonCalendar
            clickHandler={next}
            disabled={isDisabledButton}
            bottom={true}
          />
        </div>
      </div>
      {/*calendar head*/}
      <CalendarTableHead />
      {/*calendar body*/}
      <div
        className={style.wrapperTable}
        style={{ height: `${HEIGHT_CALENDAR}px` }}
      >
        <div className={style.styleSlider} style={styleSlider}>
          <GenerateTableCalendar // for prev month
            array={chunkedDateArray}
            actuallyDate={prevMonth}
            allDisabled={true}
            itemsCosmetic={itemsCosmetic}
            settings={setting}
          />
          <GenerateTableCalendar // for actually month
            array={chunkedDateArray}
            actuallyDate={actuallyDate}
            allDisabled={false}
            itemsCosmetic={itemsCosmetic}
            settings={setting}
          />

          <GenerateTableCalendar //for next month
            allDisabled={true}
            array={chunkedDateArray}
            actuallyDate={nextMonth}
            itemsCosmetic={itemsCosmetic}
            settings={setting}
          />
        </div>
      </div>
    </div>
  );
};
